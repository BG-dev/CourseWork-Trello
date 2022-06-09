import React, { useState, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { BoardCard } from "../../components";

import "./MyBoards.scss";

function MyBoards() {
  const [boards, setBoards] = useState(null);
  const { loading, request, error, clearError } = useHttp();

  useEffect(() => {
    clearError();
  }, [error, clearError]);

  useEffect(() => {
    request("/boards").then((data) => setBoards(data.boards));
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="boards">
      <ul className="boards__list">
        {!loading &&
          boards &&
          boards.map((board) => (
            <li className="boards__list-item" key={board.id}>
              <BoardCard board={board} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default MyBoards;
