import React from "react";

import "./BoardCard.scss";

function BoardCard({ board }) {
  return (
    <div className="board-card">
      <div className="board-card__image">
        {/* <div className={`color-image color-${board.color}`}></div> */}
      </div>
      <div className="board-card__content">
        <span className="board-card__title">{board.name}</span>
        <p className="board-card__desc">{board.desc}</p>
        <div className="board-card__info">
          <div className="board-card__author">
            <div className="board-card__avatar"></div>
            <p>Nikita Azizov</p>
          </div>
          <p className="board-card__date">23 September 2021</p>
        </div>
      </div>
    </div>
  );
}

export default BoardCard;
