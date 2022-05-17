import React, { useState, useEffect, useCallback } from "react";
import { useHttp } from "../../hooks/http.hook";
import { AddButton } from "../../components";
import { useDialog } from "../../hooks/dialog.hook";

import "./CardsList.scss";
import CardModal from "../CardModal/CardModal";
import Card from "../Card/Card";

function CardsList({ list, boardId }) {
  const MODAL_NAME = "new-card-modal";

  const { loading, request } = useHttp();
  const [cards, setCards] = useState(null);
  const dialog = useDialog();

  const getCards = useCallback(async () => {
    try {
      const fetched = await request(`/cards/${list.id}`);
      setCards(fetched.cards);
    } catch (error) {
      console.log(error);
    }
  }, [list.id]);
  console.log(list);

  useEffect(() => {
    getCards();
  }, [getCards]);

  useEffect(() => {
    dialog(MODAL_NAME);
  });

  console.log(Array.isArray(cards));

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h3>{list && list.name}</h3>
      <ul className="cards__list">
        {cards &&
          cards.map((card) => (
            <li key={card.id}>
              <Card card={card} />
            </li>
          ))}
        <AddButton modalName={MODAL_NAME} />
        <CardModal modalName={MODAL_NAME} boardId={boardId} list={list} />
      </ul>
    </div>
  );
}

export default CardsList;
