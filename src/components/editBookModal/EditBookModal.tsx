import * as React from 'react';
import { useSpring, animated } from 'react-spring';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import EditForm from '../editForm/EditForm';
import classes from './editBookModal.module.css';

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
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

export default function EditBookModal(props) {
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={props.open}
        onClose={props.handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={props.open}>
          <div className={classes.background}>
            <EditForm
              handleCloseModal={props.handleCloseModal}
              book={props.book}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
