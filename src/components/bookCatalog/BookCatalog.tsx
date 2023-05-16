import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { colRef } from '@/firebase/firebase';
import BookCard from '../bookCard/BookCard';
import SortingSelect from '../sortingSelect/SortingSelect';
import NavigateMenu from '../navigateMenu/NavigateMenu';
import SortedBooksTitle from '../sortedBooksTitle/SortedBooksTitle';
import { IBook } from '@/types/IBook';
import { group } from '@/utils/group';
import classes from './bookCatalog.module.css';

export default function BookCatalog() {
  const [books, setBooks] = useState<any>([]);
  const [sortingType, setSortingType] = useState<keyof IBook>('year');

  useEffect(() => {
    const unsubscribe = onSnapshot(colRef, snapshot => {
      const booksData = snapshot.docs.map(doc => doc.data());

      setBooks(booksData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <section>dfs</section>

      <div className={classes.selectsWrapper}>
        <SortingSelect
          sortingType={sortingType}
          setSortingType={setSortingType}
        />
        <NavigateMenu books={books} sortingType={sortingType} />
      </div>

      <section>
        {group(books, sortingType).map((booksGroup: IBook[]) => (
          <div
            id={`navigate-${booksGroup[0][sortingType]}`}
            key={booksGroup[0][sortingType]}>
            <SortedBooksTitle books={booksGroup} sortingType={sortingType} />

            <div className={classes.books}>
              {booksGroup.map((book: IBook) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
