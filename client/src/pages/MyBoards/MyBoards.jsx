import React from "react";
// import { useHttp } from "../../hooks/http.hook";
// import { AddButton, BoardCard, BoardModal } from "../../components";
// import { useDialog } from "../../hooks/dialog.hook";

import "./MyBoards.scss";

function MyBoards() {
  // const MODAL_NAME = "new-board-modal";

  // const [boards, setBoards] = useState(null);
  // const { loading, request, error, clearError } = useHttp();
  // const dialog = useDialog();

  // useEffect(() => {
  //   clearError();
  // }, [error, clearError]);

  // useEffect(() => {
  //   request("/boards").then((data) => setBoards(data.boards));
  // }, []);

  // useEffect(() => {
  //   dialog(MODAL_NAME);
  // });

  // if (loading) return <h1>Loading...</h1>;

  return (
    <div className="boards">
      <h2>Boards</h2>
      {/* <div className="my-boards__add-new">
        <AddButton modalName={MODAL_NAME} buttonText={"Add New Board"} />
      </div>
      <BoardModal modalName={MODAL_NAME} /> */}
      {/* <ul className="my-boards__list">
        {!loading &&
          boards &&
          boards.map((board) => (
            <li className="my-boards__list-item" key={board.id}>
              <BoardCard board={board} />
            </li>
          ))}
      </ul> */}
    </div>
  );
}

export default MyBoards;
