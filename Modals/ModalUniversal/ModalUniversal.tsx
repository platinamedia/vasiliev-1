import React, { useEffect, useState } from "react";

import Modal from "@mui/material/Modal";
import classNames from "classnames";
import styles from "./ModalUniversal.module.scss";

type ModalUniversalProps = {
  stateWindow?: boolean;
  className?: string;
  children?: any;
};

const ModalUniversal: React.FC<ModalUniversalProps> = ({
  children,
  stateWindow = false,
  className,
}) => {
  const [open, setOpen] = useState<boolean>(stateWindow);

  useEffect(() => {
    setOpen(stateWindow);
  }, [stateWindow]);
  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <>
      <div onClick={handleOpen}></div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={classNames(styles["ModalUniversal"], className)}>
          {children}
        </div>
      </Modal>
    </>
  );
};

export default ModalUniversal;
