import React from "react";
import css from '../DeleteContactModal/DeleteContactModal.module.css'

export default function DeleteContactModal ({ message, onConfirm, onCancel }) {
  return (
    <div className={css.overlay}>
      <div className={css.window}>
        <p>{message}</p>
        <div className={css.buttons}>
          <button className={css.confirmBtn} onClick={onConfirm}>
            Delete
          </button>
          <button className={css.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

