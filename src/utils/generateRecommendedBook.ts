import { IBook } from '@/types/IBook';

export function generateRecommendedBook(allBooks: IBook[]): IBook {
  const currentDate = new Date();

  const currentYear = currentDate.getUTCFullYear();

  let index = 0;

  const sortedByYear: IBook[] = [];

  allBooks.forEach(book => {
    if (book.year <= currentYear - 2) {
      sortedByYear.push(book);
    }
  });

  let maxRating = 0;

  sortedByYear.forEach(book => {
    if (book.rating > maxRating) {
      maxRating = book.rating;
    }
  });

  const sortedByRating: IBook[] = [];

  sortedByYear.filter(book => {
    if (book.rating === maxRating) {
      sortedByRating.push(book);
    }
  });

  if (sortedByRating.length > 1) {
    index = Math.floor(Math.random() * sortedByRating.length);

    return sortedByRating[index];
  } else {
    return sortedByRating[index];
  }
}
