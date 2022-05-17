import React, { useRef } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

import "./BoardCard.scss";

function BoardCard({ board }) {
  const form = useRef();
  const { request } = useHttp();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: () => {
      deleteBoardHandler();
    },
  });

  const deleteBoardHandler = async () => {
    const data = await request(`/boards/${board.id}`, "DELETE", {
      user: {
        name: "Nikita",
        role: "admin",
      },
    });
    console.log(data);
  };

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
        <Link to={`/boards/${board.id}`}>Open a board</Link>
        <form
          className="feedback__form"
          ref={form}
          onSubmit={formik.handleSubmit}
        >
          <button
            className="btn waves-effect waves-light col"
            type="submit"
            name="action"
          >
            Delete board
          </button>
        </form>
      </div>
    </div>
  );
}

export default BoardCard;
