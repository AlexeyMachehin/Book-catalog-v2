import * as React from 'react';
import { useSpring, animated } from 'react-spring';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import EditForm from '../editBookForm/EditBookForm';
import { IBook } from '@/types/IBook';
import classes from './editBookModal.module.css';

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => void;
  onExited?: () => void;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref,
) {
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
  editBook: IBook | null;
  isEditBookModalOpen: boolean;
  setIsEditBookModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoaderOn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditBookModal({
  editBook,
  isEditBookModalOpen,
  setIsEditBookModalOpen,
  setIsLoaderOn,
}: IEditBookModalProps) {
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={isEditBookModalOpen}
        onClose={() => setIsEditBookModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={isEditBookModalOpen}>
          <div className={classes.background}>
            <EditForm
              setIsLoaderOn={setIsLoaderOn}
              setIsEditBookModalOpen={setIsEditBookModalOpen}
              editBook={editBook}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
