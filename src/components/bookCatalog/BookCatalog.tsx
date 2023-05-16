import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { colRef } from '@/firebase/firebase';
import BookCard from '../BookCard/BookCard';
import SortedBooksTitle from '../sortedBooksTitle/SortedBooksTitle';
import { sort } from '@/utils/sorting';
import { IBook } from '@/types/IBook';
import classes from './bookCatalog.module.css';

export default function BookCatalog() {
  const [books, setBooks] = useState<any>([]);
  const [sortingType, setSortingType] = useState<keyof IBook>(
    'year',
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(colRef, snapshot => {
      const bookData = snapshot.docs.map(doc => doc.data());
      setBooks(bookData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section>
      {sort(books, sortingType).map((sortedBooks: IBook[]) => (
        <div key={sortedBooks[0][sortingType]}>
          <SortedBooksTitle
            sortedBooks={sortedBooks}
            sortingType={sortingType}
          />

          <div className={classes.sortedBooks}>
            {sortedBooks.map((book: IBook) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
