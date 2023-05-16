import { IBook } from '@/types/IBook';

export function group(catalog: IBook[], sortingType: string): IBook[][] {
  let sortBy = '';
  const listData: Set<string | number> = new Set();
  const sortedArr: IBook[][] = [];

  if (sortingType === 'author') {
    sortBy = 'year';
  } else {
    sortBy = 'author';
  }

  catalog.forEach(book => {
    listData.add(book[sortingType]);
  });

  const listDataArr = Array.from(listData).sort((a, b) => {
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    }
    if (a > b) return -1;
    if (a < b) return 1;
  });

  for (let i = 0; i < listDataArr.length; i++) {
    const arrayBooks = catalog.filter(
      book => book[sortingType] === listDataArr[i],
    );
    sortedArr.push(arrayBooks);
  }

  sortedArr.forEach(v => {
    if (v.length > 1) {
      v.sort((a, b) => {
        if (sortBy === 'author') {
          if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) return 1;
          if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) return -1;
        } else {
          if (a[sortBy] > b[sortBy]) return -1;
          if (a[sortBy] < b[sortBy]) return 1;
        }
      });
    }
  });

  return sortedArr;
}
