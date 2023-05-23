import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-scroll';
import { SortingType } from '@/types/sortingType';
import { IBook } from '@/types/IBook';
import classes from './navigate.module.css';

interface ISelectsProps {
  sortingType: SortingType;
  books: IBook[][];
}

export default function Navigate({ sortingType, books }: ISelectsProps) {
  const [anchorMenu, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorMenu);

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
        aria-controls={isMenuOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? 'true' : undefined}
        onClick={handleClick}>
        Navigate
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorMenu}
        open={isMenuOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        {books.length !== 0 &&
          books.map(booksGroup => {
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
