import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { AddButton, BoardCard, BoardModal } from "../../components";
import { useDialog } from "../../hooks/dialog.hook";

import "./MyBoards.scss";

function MyBoards() {
  const MODAL_NAME = "new-board-modal";

  const [boards, setBoards] = useState(null);
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();
  const dialog = useDialog();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    request("/boards").then((data) => setBoards(data.boards));
  }, []);

  useEffect(() => {
    dialog(MODAL_NAME);
  });

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="my-boards">
      <div className="my-boards__add-new">
        <AddButton modalName={MODAL_NAME} />
        <h4 className="my-boards__add-text">Add new board</h4>
      </div>
      <BoardModal modalName={MODAL_NAME} />
      <ul className="my-boards__list">
        {!loading &&
          boards &&
          boards.map((board) => (
            <li className="my-boards__list-item" key={board.id}>
              <BoardCard board={board} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default MyBoards;
