import { IBook } from '@/types/IBook';
import { SortingType } from '@/types/sortingType';

export function group(books: IBook[], sortingType: SortingType): IBook[][] {
  const groupsSet: Set<string | number> = new Set();
  const result: IBook[][] = [];

  books.forEach(book => {
    const value = book[sortingType]
    if (value != null) {
      groupsSet.add(value);
    }
  });

  const groupsArr = Array.from(groupsSet).sort(
    (a: string | number, b: string | number) => {
      if (typeof a === 'string' && typeof b === 'string') {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      } else {
        return (b as number) - (a as number);
      }
    },
  );

  groupsArr.forEach(booksGroup => {
    const groupedBooks = books.filter(book => book[sortingType] === booksGroup);

    result.push(groupedBooks);
  });

  result.forEach((groupForSort: IBook[]) => {
    groupForSort.sort((a: IBook, b: IBook) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
    );
  });

  return result;
}
