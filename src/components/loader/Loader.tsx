import CircularProgress from '@mui/material/CircularProgress';
import classes from './loader.module.css';

export default function Loader() {
  return (
    <div className={classes.loaderWrapper}>
      <CircularProgress />
    </div>
  );
}
