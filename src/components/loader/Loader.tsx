import CircularProgress from '@mui/material/CircularProgress';
import { IBook } from '@/types/IBook';
import classes from './loader.module.css';

export default function Loader({ books }: { books: IBook[] }) {
  return (
    <div
      className={`${classes.loaderWrapper} ${
        books.length === 0 && classes.firstLoad
      }`}>
      <CircularProgress />
    </div>
  );
}
