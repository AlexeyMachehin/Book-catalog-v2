import { memo } from 'react';
import { Typography } from '@mui/material';
import { IBook } from '@/types/IBook';
import classes from './sortedBooksTitle.module.css';

interface ISortedBooksTitleProps {
  sortedBooks: IBook[];
  sortingType: keyof IBook;
}

function SortedBooksTitle({
  sortedBooks,
  sortingType,
}: ISortedBooksTitleProps) {
  return (
    <Typography className={classes.title} variant="h4" component="h4">
      {`${sortingType.charAt(0).toUpperCase() + sortingType.slice(1)}: ${
        sortedBooks[0][sortingType] ? sortedBooks[0][sortingType] : 'no info'
      }`}
    </Typography>
  );
}

function areSortedBooksTitlePropsEqual(
  prevProps: ISortedBooksTitleProps,
  nextProps: ISortedBooksTitleProps,
) {
  return prevProps.sortingType === nextProps.sortingType;
}

export default memo(SortedBooksTitle, areSortedBooksTitlePropsEqual);
