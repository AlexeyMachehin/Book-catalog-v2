import { memo } from 'react';
import { IBook } from '@/types/IBook';
import { SortingType } from '@/types/sortingType';
import { Typography } from '@mui/material';
import classes from './sortedBooksTitle.module.css';

interface ISortedBooksTitleProps {
  books: IBook[];
  sortingType: SortingType;
}

function SortedBooksTitle({ books, sortingType }: ISortedBooksTitleProps) {
  return (
    <Typography className={classes.title} variant="h4" component="h4">
      {`${sortingType.charAt(0).toUpperCase() + sortingType.slice(1)}: ${
        books[0][sortingType] ? books[0][sortingType] : 'no info'
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
