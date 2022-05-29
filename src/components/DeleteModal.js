import React from "react";

function DeleteModal({ confirmDelete, handleCancel }) {
  return (
    <div>
      <h2>Confirm Delete?</h2>
      <button
        style={{ width: "40%", marginRight: "10px" }}
        onClick={confirmDelete}
      >
        Yes
      </button>
      <button style={{ width: "40%" }} onClick={handleCancel}>
        No
      </button>
    </div>
  );
}

export default DeleteModal;
