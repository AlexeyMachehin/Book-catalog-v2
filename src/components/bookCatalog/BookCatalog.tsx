import { colRef } from '@/firebase/firebase';
import { sort } from '@/utils/sorting';
import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { IBook } from '@/types/IBook';
import BookCard from '../BookCard/BookCard';

export default function BookCatalog() {
  const [books, setBooks] = useState<any>([]);
  const [sortingType, setSortingType] = useState<'year' | 'rating' | 'author'>(
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
    <div>
      {sort(books, sortingType).map((sortedBooks: any) => (
        <div
          key={sortedBooks[0][sortingType]}
          style={{
            margin: '10px 0',
            display: 'flex',
          }}>
          {sortedBooks[0][sortingType]}
          {sortedBooks.map((book: IBook) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ))}
    </div>
  );
}
