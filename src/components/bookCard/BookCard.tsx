import { useInView } from 'react-intersection-observer';
import { deleteBook } from '@/firebase/firebase';
import { memo } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IBook } from '@/types/IBook';
import classes from './BookCard.module.css';

interface IBookCardProps {
  setIsLoaderOn: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenBookModal: (book: IBook) => void;
  book: IBook;
}

function BookCard({
  book,
  handleOpenBookModal,
  setIsLoaderOn,
}: IBookCardProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <Card component="article" ref={ref} className={classes.card}>
      <div className={classes.imgContainer}>
        {inView && book.imageLink ? (
          <img
            src={book.imageLink}
            alt={`book:${book.title}`}
            className={classes.cardImg}
          />
        ) : (
          <div className={classes.cardImg}>No cover</div>
        )}
      </div>
      <CardContent>
        <Typography
          className={classes.bookCardTypography}
          gutterBottom
          variant="h5"
          component="h5">
          Title: {book.title}
        </Typography>
        <Typography
          variant="h6"
          component="h6"
          className={classes.bookCardTypography}
          color="text.secondary">
          Author: {book.author}
        </Typography>
        <Typography
          className={classes.bookCardTypography}
          variant="body2"
          color="text.secondary">
          Publication year: {book.year === 0 ? '' : book.year}
        </Typography>
        <Typography
          className={classes.bookCardTypography}
          variant="body2"
          color="text.secondary">
          Rating: {book.rating}
        </Typography>
        <Typography
          className={classes.bookCardTypography}
          variant="body2"
          color="text.secondary">
          ISBN: {book.isbn}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            handleOpenBookModal(book);
          }}
          size="large">
          Edit
        </Button>

        <Button
          onClick={() => {
            setIsLoaderOn(true);
            deleteBook(book).finally(() => setIsLoaderOn(false));
          }}
          size="large">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

function areBookPropsEqual(
  prevProps: Readonly<{ book: IBook }>,
  nextProps: Readonly<{ book: IBook }>,
) {
  const prevBook = prevProps.book;
  const nextBook = nextProps.book;

  return (
    prevBook.title === nextBook.title &&
    prevBook.author === nextBook.author &&
    prevBook.imageLink === nextBook.imageLink &&
    prevBook.isbn === nextBook.isbn &&
    prevBook.rating === nextBook.rating &&
    prevBook.year === nextBook.year
  );
}

export default memo(BookCard, areBookPropsEqual);
