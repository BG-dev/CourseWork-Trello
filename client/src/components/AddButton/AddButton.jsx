import React from "react";

import "./AddButton.scss";

function AddButton({ modalName }) {
  return (
    <a
      href={`#${modalName}`}
      className="add-button modal-trigger btn-floating btn-large waves-effect waves-light red"
    >
      <i className="material-icons">add</i>
    </a>
  );
}

export default AddButton;
