import CircularProgress from '@mui/material/CircularProgress';
import classes from './loader.module.css';

export default function Loader({ isFirstLoad }: { isFirstLoad: boolean }) {
  return (
    <div
      className={`${classes.loaderWrapper} ${
        isFirstLoad && classes.firstLoad
      }`}>
      <CircularProgress />
    </div>
  );
}
