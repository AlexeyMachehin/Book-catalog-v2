import { OrderByDirection } from "firebase/firestore";

export interface IBook {
  author: string;
  name: string;
  year: number;
  rating: number;
  isbn: string;
  imageLink: string;
  id: string;
}

export interface BookState {
  books: IBook[];
  sortingType: SortingType;
  recommendedBook: IBook | number;
  directionSort: OrderByDirection;
  loaderOn: boolean;
  errorAlert: boolean;
  successAlert: boolean;
}

export type SortingType = "year" | "rating" | "author";
