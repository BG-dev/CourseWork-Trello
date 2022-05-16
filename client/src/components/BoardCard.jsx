import React from "react";

function BoardCard({ board }) {
  return (
    <li>
      <div className="card">
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">
            {board.name}
            <i className="material-icons right">more_vert</i>
          </span>
          <p>{board.desc}</p>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            {board.name}
            <i className="material-icons right">close</i>
          </span>
        </div>
      </div>
    </li>
  );
}

export default BoardCard;
