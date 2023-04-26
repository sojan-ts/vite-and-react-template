import React from "react";
import Styles from "../styles/Modal.module.css";

const Modal = ({ message, onClose }) => {
  return (
    <div className={Styles.modalOverlay}>
      <div className={Styles.modalContent}>
        <p dangerouslySetInnerHTML={{ __html: message }}></p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
