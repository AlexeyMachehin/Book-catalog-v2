import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import classes from './BookCard.module.css';
import { memo } from 'react';
import { IBook } from '@/types/IBook';

function BookCard(props: any) {
  return (
    <div style={props.style}>
      <Card sx={{ p: 2, width: 300, minHeight: 400 }}>
        <div className={classes.cardMediaContainer}>
          <CardMedia
            component="img"
            image={props.book.imageLink}
            alt="book image"
            sx={{ height: 190, width: 128 }}
          />
        </div>

        <CardContent>
          <Typography
            className={classes.bookCardTypography}
            gutterBottom
            variant="h5"
            component="div">
            Title: {props.book.name}
          </Typography>
          <Typography
            className={classes.bookCardTypography}
            variant="body2"
            color="text.secondary">
            Author: {props.book.author}
          </Typography>
          <Typography
            className={classes.bookCardTypography}
            variant="body2"
            color="text.secondary">
            Publication year: {props.book.year === 0 ? '' : props.book.year}
          </Typography>
          <Typography
            className={classes.bookCardTypography}
            variant="body2"
            color="text.secondary">
            Rating: {props.book.rating}
          </Typography>
          <Typography
            className={classes.bookCardTypography}
            variant="body2"
            color="text.secondary">
            ISBN: {props.book.isbn}
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
    </div>
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
