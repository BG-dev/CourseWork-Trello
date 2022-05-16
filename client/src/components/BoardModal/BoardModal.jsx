import React, { useRef, useEffect } from "react";
import { useFormik } from "formik";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";

import "./BoardModal.scss";

function BoardModal({ modalName }) {
  const { request, error, clearError } = useHttp();
  const message = useMessage();
  const form = useRef();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      color: "red",
    },
    onSubmit: (values) => {
      addBoardHandler(values);
      formik.resetForm();
    },
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const addBoardHandler = async (values) => {
    if (!values.title || !values.description)
      throw new Error("Title or description is empty");

    const data = await request("/boards", "POST", {
      user: {
        name: "Nikita",
        role: "admin",
      },
      board: {
        name: values.title,
        desc: values.description,
        color: values.color,
      },
    });
    console.log(data);
    message(data.message);
  };

  return (
    <div id={modalName} className="modal">
      <div className="modal-content">
        <h4>Add new board</h4>
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
          <div className="row">
            <button
              className="btn waves-effect waves-light col"
              type="submit"
              name="action"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BoardModal;
