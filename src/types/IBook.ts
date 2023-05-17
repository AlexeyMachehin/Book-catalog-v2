export interface IBook {
  author: string;
  name: string;
  year: number;
  rating: number;
  isbn: string;
  imageLink: string;
  id: string;
}

export type BookOmitId = Omit<IBook, 'id'>;
