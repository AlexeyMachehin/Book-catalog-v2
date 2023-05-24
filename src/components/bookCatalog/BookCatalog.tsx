import { useEffect, useMemo, useState } from 'react';
import { group } from '@/utils/group';
import { generateRecommendedBook } from '@/utils/generateRecommendedBook';
import { onSnapshot } from 'firebase/firestore';
import { colRef } from '@/firebase/firebase';
import Loader from '../loader/Loader';
import BookForUpdateModal from '../bookForUpdateModal/BookForUpdateModal';
import { toast } from 'react-hot-toast';
import SortedBooksTitle from '../sortedBooksTitle/SortedBooksTitle';
import BookCard from '../bookCard/BookCard';
import { Typography } from '@mui/material';
import Navigate from '../navigate/Navigate';
import Sorting from '../sorting/Sorting';
import AddBook from '../addBook/AddBook';
import { IBook } from '@/types/IBook';
import { SortingType } from '@/types/sortingType';
import classes from './bookCatalog.module.css';

export default function BookCatalog() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [sortingType, setSortingType] = useState<SortingType>(SortingType.Year);
  const [bookForUpdate, setBookForUpdate] = useState<IBook | null>(null);
  const [isLoaderOn, setIsLoaderOn] = useState(false);

  const sortedBooks = useMemo(
    () => group(books, sortingType),
    [books, sortingType],
  );

  const recommendedBook = useMemo(
    () => generateRecommendedBook(books),
    [books],
  );

  useEffect(() => {
    const booksSnapshotSubscription = onSnapshot(
      colRef,
      snapshot => {
        const booksData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as IBook[];

        if (booksData) {
          setBooks(booksData);
        }
      },
      error => {
        console.log(error.message);
        toast.error('Error while loading books');
      },
    );

    return () => booksSnapshotSubscription();
  }, []);

  return (
    <>
      {!sortedBooks.length || isLoaderOn ? (
        <Loader isFirstLoad={!sortedBooks.length} />
      ) : null}

      {bookForUpdate && (
        <BookForUpdateModal
          setBookForUpdate={setBookForUpdate}
          bookForUpdate={bookForUpdate}
          setIsLoaderOn={setIsLoaderOn}
        />
      )}

      <section className={classes.header}>
        {recommendedBook && (
          <div className={classes.recommendedBookWrapper}>
            <Typography gutterBottom variant="h4" component="h4">
              Recommended book
            </Typography>

            <BookCard
              setIsLoaderOn={setIsLoaderOn}
              setBookForUpdate={setBookForUpdate}
              book={recommendedBook}
            />
          </div>
        )}

        <AddBook setIsLoaderOn={setIsLoaderOn} />
      </section>

      <section className={classes.filters}>
        <Sorting sortingType={sortingType} setSortingType={setSortingType} />
        <Navigate books={sortedBooks} sortingType={sortingType} />
      </section>

      <section>
        {sortedBooks.length &&
          sortedBooks.map(booksGroup => (
            <div
              id={`navigate-${booksGroup[0][sortingType]}`}
              key={booksGroup[0][sortingType]}>
              <SortedBooksTitle
                booksGroup={booksGroup}
                sortingType={sortingType}
              />

              <div className={classes.books}>
                {booksGroup.map(book => (
                  <BookCard
                    setIsLoaderOn={setIsLoaderOn}
                    setBookForUpdate={setBookForUpdate}
                    key={book.id}
                    book={book}
                  />
                ))}
              </div>
            </div>
          ))}
      </section>
    </>
  );
}
