import { DocumentData } from 'firebase/firestore';
import { IBook } from './IBook';

export function fromDto(value: DocumentData, id: string): IBook {
  return {
    name: value.name,
    year: value.year,
    author: value.author,
    rating: value.rating,
    imageLink: value.imageLink,
    isbn: value.isbn,
    id: id,
  };
}

export function toDto(value: IBook): DocumentData {
  return {
    name: value.name,
    year: value.year,
    author: value.author,
    rating: value.rating,
    imageLink: value.imageLink,
    isbn: value.isbn,
  };
}
