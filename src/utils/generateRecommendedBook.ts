import { IBook } from '@/types/IBook';

export function generateRecommendedBook(books: IBook[]): IBook | null {
  const currentYear = new Date().getUTCFullYear();

  const sortedByYear = books.filter(
    book => book.year && book.year <= currentYear - 3,
  );

  if (sortedByYear.length === 0) {
    return null;
  }

  const maxRating = Math.max(...sortedByYear.map(book => book.rating ?? 0));

  const sortedByRating = sortedByYear.filter(book => book.rating === maxRating);

  const randomIndex = Math.floor(Math.random() * sortedByRating.length);

  return sortedByRating[randomIndex];
}
