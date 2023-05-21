export interface IBook {
  author: string;
  title: string;
  year: number | null;
  rating: number | null;
  isbn: string;
  imageLink: string | null;
  id: string;
}

export type FormikValues = Omit<IBook, 'id' | 'imageLink'>;

export type NewBook = Omit<IBook, 'id'>;
