import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IBook } from '@/types/IBook';
import { group } from '@/utils/group';
import { SortingType } from '@/types/sortingType';
import classes from './navigate.module.css';

interface ISelectsProps {
  sortingType: SortingType;
  books: IBook[];
}

export default function Navigate({ sortingType, books }: ISelectsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="outlined"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        Navigate
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        {books.length !== 0 &&
          group(books, sortingType).map((booksGroup: IBook[]) => {
            return (
              <MenuItem
                className={classes.navigateItem}
                onClick={handleClose}
                key={booksGroup[0][sortingType]}
                value={booksGroup[0][sortingType]}>
                {
                  <a
                    href={`#navigate-${booksGroup[0][sortingType]}`}
                    className={classes.navigateLink}>
                    {booksGroup[0][sortingType]
                      ? booksGroup[0][sortingType]
                      : 'no grouped'}
                  </a>
                }
              </MenuItem>
            );
          })}
      </Menu>
    </div>
  );
}
