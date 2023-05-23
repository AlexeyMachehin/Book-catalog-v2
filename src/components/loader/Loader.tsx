import { memo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import classes from './loader.module.css';

function Loader({ isFirstLoad }: { isFirstLoad: boolean }) {
  return (
    <div
      className={`${classes.loaderWrapper} ${
        isFirstLoad && classes.firstLoad
      }`}>
      <CircularProgress />
    </div>
  );
}

export default memo(Loader);
