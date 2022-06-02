import React, { useRef, useEffect } from "react";
import { useFormik } from "formik";
import { useHttp } from "../../hooks/http.hook";
import { useAuth } from "../../hooks/auth.hook.js";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/user";
import { NavLink, useNavigate } from "react-router-dom";

import './LoginForm.scss'

function LoginForm() {
  const navigate = useNavigate();
  const { loading, request, error, clearError } = useHttp();
  const { login } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    clearError();
  }, [error, clearError]);

  const form = useRef();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      loginHandler(values);
      formik.resetForm({
        values: {
          password: ""
        }
      });
    },
  });

  const loginHandler = async (values) => {
    try {
      if (!values.username || !values.password)
        throw new Error("Username or password is empty");
      const data = await request("/api/auth/login", "POST", { ...values });
      login(data.token, data.login, data.userId);
      dispatch(
        setUser({
          token: data.token,
          userId: data.userId,
          login: data.login,
        })
      );

      navigate("/profile");
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <>
      <h2 className="auth__title">Sign In</h2>
      <form
        className="auth__form"
        ref={form}
        onSubmit={formik.handleSubmit}
      >
        <div className="auth__form-container">
          <label htmlFor="login">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </div>
        <div className="auth__form-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <div className="auth__form-control">
          <button
              className="btn"
              type="submit"
              disabled={loading}
              name="action"
          >
            Sign In
          </button>
          <NavLink
            to="/register"
            className="btn"
          >
            Create new account
          </NavLink>
          <NavLink
            to="/register"
            className="auth__form-link"
          >
            Forgot password?
        </NavLink>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
