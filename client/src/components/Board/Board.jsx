import React, { useState, useCallback, useEffect } from "react";
import CardsList from "../CardsList/CardsList";
import { useHttp } from "../../hooks/http.hook";

import "./Board.scss";

function Board({ board }) {
  const { loading, request } = useHttp();
  const [boardLists, setBoardLists] = useState(null);

  const getBoard = useCallback(async () => {
    try {
      const fetched = await request(`/boards/${board.id}/lists`);
      setBoardLists(fetched.boardLists);
    } catch (error) {
      console.log(error);
    }
  }, [board.id]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="board">
      <h1 className="board__name">{board && board.name}</h1>
      {boardLists && (
        <ul className="board__lists">
          <li id="to-do-list" className="board__list">
            <CardsList list={boardLists[0]} boardId={board.id} />
          </li>
          <li id="doing-list" className="board__list">
            <CardsList list={boardLists[1]} boardId={board.id} />
          </li>
          <li id="done-list" className="board__list">
            <CardsList list={boardLists[2]} boardId={board.id} />
          </li>
        </ul>
      )}
    </div>
  );
}

export default Board;
