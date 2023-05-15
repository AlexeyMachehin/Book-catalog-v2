/* eslint-disable jsx-a11y/img-redundant-alt */
import { colRef } from '@/firebase/firebase';
import { sort } from '@/utils/sorting';
import { onSnapshot } from 'firebase/firestore';
import { Suspense, memo, useEffect, useState } from 'react';
import Book from '../Book';
import { IBook } from '@/types/IBook';
import BookCard from '../BookCard/BookCard';
import { FixedSizeList as List } from 'react-window';
import { dividerClasses } from '@mui/material';

function BookCatalog() {
  const [books, setBooks] = useState<any>([]);
  const [sortingType, setSortingType] = useState<'year' | 'rating' | 'author'>(
    'year',
  );

  const renderBookName = ({ index, style }: any) => {
    const book = books[index];
    return <BookCard key={index} style={style} book={book} />;
  };
  function areBookPropsEqual(
    prevProps: Readonly<{ book: IBook }>,
    nextProps: Readonly<{ book: IBook }>,
  ) {
    const prevBook = prevProps.book;
    const nextBook = nextProps.book;

    return (
      prevBook.name === nextBook.name &&
      prevBook.author === nextBook.author &&
      prevBook.imageLink === nextBook.imageLink &&
      prevBook.isbn === nextBook.isbn &&
      prevBook.rating === nextBook.rating &&
      prevBook.year === nextBook.year
    );
  }

  memo(renderBookName, areBookPropsEqual);

  useEffect(() => {
    const unsubscribe = onSnapshot(colRef, snapshot => {
      const bookData = snapshot.docs.map(doc => doc.data());
      setBooks(bookData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {/* {sort(books, sortingType).map((sortedBooks: any) => (
        <div
          key={sortedBooks[0][sortingType]}
          style={{
            margin: '10px 0',
            display: 'flex',
          }}>
          {sortedBooks[0][sortingType]}
          {sortedBooks.map((book: IBook) => (
            // <Book key={book.id} book={book} />
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ))} */}

      <List
        height={500}
        itemCount={books.length}
        itemSize={400}
        layout="horizontal"
        width={700}>
        {renderBookName}
      </List>
    </div>
  );
}

export default BookCatalog;
