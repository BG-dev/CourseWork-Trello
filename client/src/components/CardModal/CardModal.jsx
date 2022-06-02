import React, { useRef, useEffect } from "react";
import { useFormik } from "formik";
import { useHttp } from "../../hooks/http.hook";

import "./CardModal.scss";

function CardModal({ modalName, boardId, list }) {
  const { request, error, clearError } = useHttp();
  const form = useRef();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      addBoardHandler(values);
      formik.resetForm();
    },
  });

  useEffect(() => {
    clearError();
  }, [error, clearError]);

  const addBoardHandler = async (values) => {
    if (!values.title || !values.description)
      throw new Error("Title or description is empty");

    const data = await request("/cards", "POST", {
      user: {
        name: "Nikita",
        role: "admin",
      },
      card: {
        name: values.title,
        desc: values.description,
        boardId: boardId,
        status: list.name,
      },
    });
    console.log(data);
  };

  return (
    <div id={modalName} className="modal">
      <div className="modal-content">
        <h4>New card</h4>
        <form
          className="feedback__form"
          ref={form}
          onSubmit={formik.handleSubmit}
        >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          <button
            className="btn waves-effect waves-light col"
            type="submit"
            name="action"
          >
            Add new card
          </button>
        </form>
      </div>
    </div>
  );
}

export default CardModal;
