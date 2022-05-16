import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AddButton, BoardCard, BoardModal } from "../components";
import { useDialog } from "../hooks/dialog.hook";

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
    <div>
      <AddButton modalName={MODAL_NAME} />
      <BoardModal modalName={MODAL_NAME} />
      <ul>
        {!loading &&
          boards &&
          boards.map((board) => <BoardCard key={board.id} board={board} />)}
      </ul>
    </div>
  );
}

export default MyBoards;
