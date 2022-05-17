import React from "react";

import "./BoardCard.scss";

function BoardCard({ board }) {
  return (
    <div className="card">
      <div className="card-image">
        <div className={`color-image color-${board.color}`}></div>
        <span className="card-title">{board.name}</span>
      </div>
      <div className="card-content">
        <p>{board.desc}</p>
      </div>
      <div className="card-action">
        <a href="#">Open a board</a>
      </div>
    </div>
  );
}

export default BoardCard;
