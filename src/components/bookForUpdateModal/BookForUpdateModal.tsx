import { memo, forwardRef } from 'react';
import { useSpring, animated } from 'react-spring';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import UpdateBook from '../updateBook/UpdateBook';
import { IBook } from '@/types/IBook';
import classes from './bookForUpdateModal.module.css';

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => void;
  onExited?: () => void;
}

const Fade = forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;

  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

interface IEditBookModalProps {
  bookForUpdate: IBook | null;
  setBookForUpdate: React.Dispatch<React.SetStateAction<IBook | null>>;
  setIsLoaderOn: React.Dispatch<React.SetStateAction<boolean>>;
}

function BookForUpdateModal({
  bookForUpdate,
  setIsLoaderOn,
  setBookForUpdate,
}: IEditBookModalProps) {
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={!!bookForUpdate}
        onClose={() => setBookForUpdate(null)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={!!bookForUpdate}>
          <div className={classes.background}>
            <UpdateBook
              setBookForUpdate={setBookForUpdate}
              setIsLoaderOn={setIsLoaderOn}
              bookForUpdate={bookForUpdate}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default memo(BookForUpdateModal);
