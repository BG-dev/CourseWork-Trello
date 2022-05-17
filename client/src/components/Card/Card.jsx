import React from "react";

import "./Card.scss";

function Card({ card }) {
  console.log(card);
  return (
    <div className="card">
      <h4 className="card__name">{card.name}</h4>
      <p className="card__content">{card.desc}</p>
    </div>
  );
}

export default Card;
