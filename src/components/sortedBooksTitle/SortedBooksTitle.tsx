import { memo } from 'react';
import { Typography } from '@mui/material';
import { IBook } from '@/types/IBook';
import { SortingType } from '@/types/sortingType';
import classes from './sortedBooksTitle.module.css';

interface ISortedBooksTitleProps {
  booksGroup: IBook[];
  sortingType: SortingType;
}

function SortedBooksTitle({ booksGroup, sortingType }: ISortedBooksTitleProps) {
  const sortingTypeNameWithCapitalLetter =
    sortingType.charAt(0).toUpperCase() + sortingType.slice(1);

  const sortingTypeValue = booksGroup[0][sortingType]
    ? booksGroup[0][sortingType]
    : 'no info';

  return (
    <Typography className={classes.title} variant="h4" component="h4">
      {`${sortingTypeNameWithCapitalLetter}: ${sortingTypeValue}`}
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
