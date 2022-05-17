import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { Board } from "../../components";

function BoardPage() {
  const boardId = useParams().id;
  const { loading, request } = useHttp();
  const [board, setBoard] = useState(null);

  const getBoard = useCallback(async () => {
    try {
      const fetched = await request(`/boards/${boardId}`);
      setBoard(fetched.board);
    } catch (error) {
      console.log(error);
    }
  }, [boardId]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  if (loading) return <h1>Loading...</h1>;

  return <div>{!loading && board && <Board board={board} />}</div>;
}

export default BoardPage;
