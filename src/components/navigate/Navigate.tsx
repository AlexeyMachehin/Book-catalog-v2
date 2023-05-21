import { useState } from 'react';
import { group } from '@/utils/group';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IBook } from '@/types/IBook';
import { Link } from 'react-scroll';
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
                key={booksGroup[0][sortingType]}>
                {
                  <Link
                    to={`navigate-${booksGroup[0][sortingType]}`}
                    spy={true}
                    smooth={true}
                    onClick={handleClose}
                    duration={500}
                    className={classes.navigateLink}>
                    {booksGroup[0][sortingType]
                      ? booksGroup[0][sortingType]
                      : 'no grouped'}
                  </Link>
                }
              </MenuItem>
            );
          })}
      </Menu>
    </div>
  );
}
