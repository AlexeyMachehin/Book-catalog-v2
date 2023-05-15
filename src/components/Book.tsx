import { IBook } from '@/types/IBook';
import { memo } from 'react';

function Book({ book }): IBook {
  return <div>{`${book.author} ---- ${book.name}`}</div>;
}

function areBookPropsEqual(
  prevProps: { book: IBook },
  nextProps: { book: IBook },
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

export default memo(Book, areBookPropsEqual);
