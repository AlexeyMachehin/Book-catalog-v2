import { memo } from 'react';
import { useInView } from 'react-intersection-observer';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IBook } from '@/types/IBook';
import classes from './BookCard.module.css';

function BookCard({ book }: { book: IBook }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <Card component="article" ref={ref} className={classes.card}>
      <div className={classes.imgContainer}>
        {inView ? (
          <img
            src={book.imageLink}
            alt={`book:${book.name}`}
            className={classes.cardImg}
          />
        ) : (
          <div className={classes.cardImg}>Loading img...</div>
        )}
      </div>
      <CardContent>
        <Typography
          className={classes.bookCardTypography}
          gutterBottom
          variant="h5"
          component="h5">
          Title: {book.name}
        </Typography>
        <Typography
          className={classes.bookCardTypography}
          variant="body2"
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
            // props.handleOpenModal(props.book);
          }}
          size="large">
          Edit
        </Button>

        <Button
          onClick={() => {
            console.log(1);
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
    prevBook.name === nextBook.name &&
    prevBook.author === nextBook.author &&
    prevBook.imageLink === nextBook.imageLink &&
    prevBook.isbn === nextBook.isbn &&
    prevBook.rating === nextBook.rating &&
    prevBook.year === nextBook.year
  );
}

export default memo(BookCard, areBookPropsEqual);
