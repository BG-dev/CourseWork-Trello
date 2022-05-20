import React from "react";

import "./AddButton.scss";

function AddButton({ modalName, buttonText }) {
  return (
    <a className="modal-trigger" href={`#${modalName}`}>
      <div className="add-button btn-floating btn-large waves-effect waves-light red">
        <i className="material-icons blue-grey lighten-1">add</i>
      </div>
      <span className="modal-trigger__text blue-grey-text text-lighten-1">
        {buttonText}
      </span>
    </a>
  );
}

export default AddButton;
