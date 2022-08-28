import React from "react";
import "./DeleteModal.css";

function DeleteModal({ confirmDelete, handleCancel, deleteString }) {
  return (
    <div className="delete-modal-container">
      <div className="delete-modal-internal-container">
        <div className="delete-modal-message">
          Deleting {deleteString}. Confirm?
        </div>
        <div className="delete-modal-buttons-container">
          <button className="delete-modal-button" onClick={confirmDelete}>
            Yes
          </button>
          <button className="delete-modal-button" onClick={handleCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
