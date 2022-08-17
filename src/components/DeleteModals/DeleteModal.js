import React from "react";
import "./DeleteModal.css";

function DeleteModal({ confirmDelete, handleCancel }) {
  return (
    <div className="delete-modal-container">
      <h5 className="delete-modal-message">Confirm Delete?</h5>
      <div className="delete-modal-buttons-container">
        <button className="delete-modal-button" onClick={confirmDelete}>
          Yes
        </button>
        <button className="delete-modal-button" onClick={handleCancel}>
          No
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
