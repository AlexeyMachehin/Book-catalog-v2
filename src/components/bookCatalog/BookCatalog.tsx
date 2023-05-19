import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { colRef } from '@/firebase/firebase';
import Loader from '../loader/Loader';
import EditBookModal from '../editBookModal/EditBookModal';
import { Toaster, toast } from 'react-hot-toast';
import { IBook } from '@/types/IBook';
import { group } from '@/utils/group';
import { generateRecommendedBook } from '@/utils/generateRecommendedBook';
import { SortingType } from '@/types/sortingType';
import SortedBooksTitle from '../sortedBooksTitle/SortedBooksTitle';
import BookCard from '../bookCard/BookCard';
import Navigate from '../navigate/Navigate';
import Sorting from '../sorting/Sorting';
import AddBook from '../addBook/AddBook';
import classes from './bookCatalog.module.css';

export default function BookCatalog() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [sortingType, setSortingType] = useState<SortingType>('year');
  const [recommendedBook, setRecommendedBook] = useState<IBook | null>(null);
  const [isEditBookModalOpen, setIsEditBookModalOpen] = useState(false);
  const [editBook, setEditBook] = useState<IBook | null>(null);
  const [isLoaderOn, setIsLoaderOn] = useState(false);

  function handleOpenBookModal(book: IBook) {
    setIsEditBookModalOpen(true);
    setEditBook(book);
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      colRef,
      snapshot => {
        const booksData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as IBook[];

        if (booksData) {
          setBooks(booksData);
          setRecommendedBook(generateRecommendedBook(booksData));
        }
      },
      error => {
        console.log(error.message);
        toast.error('Error while loading books');
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <>
      {books.length === 0 || isLoaderOn ? <Loader books={books} /> : null}

      <Toaster toastOptions={{ duration: 4000 }} />

      {editBook && (
        <EditBookModal
          setIsEditBookModalOpen={setIsEditBookModalOpen}
          isEditBookModalOpen={isEditBookModalOpen}
          editBook={editBook}
          setIsLoaderOn={setIsLoaderOn}
        />
      )}

      <section className={classes.header}>
        {recommendedBook && (
          <div className={classes.recommendedBookWrapper}>
            <h4 className={classes.recommendedBookTitle}>Recommended book</h4>

            <BookCard
              setIsLoaderOn={setIsLoaderOn}
              handleOpenBookModal={handleOpenBookModal}
              book={recommendedBook}
            />
          </div>
        )}

        <AddBook setIsLoaderOn={setIsLoaderOn} />
      </section>

      <section className={classes.filters}>
        <Sorting sortingType={sortingType} setSortingType={setSortingType} />

        <Navigate books={books} sortingType={sortingType} />
      </section>

      <section>
        {group(books, sortingType).map((booksGroup: IBook[]) => (
          <div
            id={`navigate-${booksGroup[0][sortingType]}`}
            key={booksGroup[0][sortingType]}>
            <SortedBooksTitle books={booksGroup} sortingType={sortingType} />

            <div className={classes.books}>
              {booksGroup.map((book: IBook) => (
                <BookCard
                  setIsLoaderOn={setIsLoaderOn}
                  handleOpenBookModal={handleOpenBookModal}
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
