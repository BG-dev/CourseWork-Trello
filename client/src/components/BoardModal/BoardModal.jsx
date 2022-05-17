import React, { useRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { Badge } from "../../components";

import "./BoardModal.scss";

function BoardModal({ modalName }) {
  const colors = [
    "blue",
    "orange",
    "green",
    "red",
    "purple",
    "pink",
    "lime",
    "sky",
    "grey",
  ];

  const { request, error, clearError } = useHttp();
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const message = useMessage();
  const form = useRef();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      addBoardHandler(values, selectedColor);
      formik.resetForm();
    },
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const addBoardHandler = async (values, color) => {
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
        color: color,
      },
    });
    console.log(data);
    message(data.message);
  };

  return (
    <div id={modalName} className="modal">
      <div className="modal-content">
        <h4>New board</h4>
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
          <label>Select board color</label>
          <div className="select-color">
            <ul className="select-color__list">
              {colors.map((color, index) => (
                <li key={index} className="select-color__list-item">
                  <Badge
                    onClick={() => setSelectedColor(color)}
                    color={color}
                    isActive={selectedColor === color}
                  />
                </li>
              ))}
            </ul>
          </div>
          <button
            className="btn waves-effect waves-light col"
            type="submit"
            name="action"
          >
            Add new board
          </button>
        </form>
      </div>
    </div>
  );
}

export default BoardModal;
