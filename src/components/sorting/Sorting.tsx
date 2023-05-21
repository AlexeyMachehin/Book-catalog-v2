import { memo } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SortingType } from '@/types/sortingType';

interface ISelectsProps {
  setSortingType: React.Dispatch<React.SetStateAction<SortingType>>;
  sortingType: SortingType;
}

function Sorting({ setSortingType, sortingType }: ISelectsProps) {
  return (
    <FormControl>
      <InputLabel id="sorting-label">Sorting</InputLabel>
      <Select
        labelId="sorting-label"
        value={sortingType}
        label="Sorting"
        onChange={e => {
          setSortingType(e.target.value as SortingType);
        }}>
        <MenuItem value="year">Year</MenuItem>
        <MenuItem value="rating">Rating</MenuItem>
        <MenuItem value="author">Author</MenuItem>
      </Select>
    </FormControl>
  );
}

export default memo(Sorting);
