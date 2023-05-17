import { IBook } from '@/types/IBook';

export function group(books: IBook[], sortingType: keyof IBook): IBook[][] {
  let sortBy = '';
  const groupsSet: Set<string | number> = new Set();
  const result: IBook[][] = [];

  if (sortingType === 'author') {
    sortBy = 'year';
  } else {
    sortBy = 'author';
  }

  books.forEach(book => {
    groupsSet.add(book[sortingType]);
  });

  const groupsArr = Array.from(groupsSet).sort(
    (a: string | number, b: string | number) => {
      if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b);
      } else {
        return (b as number) - (a as number);
      }
    },
  );

  groupsArr.forEach(booksGroup => {
    const groupedBooks = books.filter(book => book[sortingType] === booksGroup);

    result.push(groupedBooks);
  });

  result.forEach((v: IBook[]) => {
    if (v.length > 1) {
      v.sort((a: IBook, b: IBook) => {
        if (sortBy === 'author') {
          return a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase());
        } else {
          return (
            (a[sortBy as keyof IBook] as number) -
            (b[sortBy as keyof IBook] as number)
          );
        }
      });
    }
  });

  return result;
}
