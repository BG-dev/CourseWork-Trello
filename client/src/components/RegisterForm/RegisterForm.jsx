import React, { useRef, useEffect } from "react";
import { useFormik } from "formik";
import { useHttp } from "../../hooks/http.hook";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from 'yup';

import './RegisterForm.scss'

function RegisterForm() {
  const { loading, request, error, clearError } = useHttp();
  const navigate = useNavigate();

  const signUpSchema = Yup.object().shape({
    username: Yup.string().min(3, 'Username is too short').required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password is too short').required('Password is required'),
    repeatedPassword: Yup.string().min(8, 'Password confirmation is too short').required('Password confirmation is required').oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  useEffect(() => {
    clearError();
  }, [error, clearError]);

  const form = useRef();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      registerHandler(values);
      formik.resetForm({
        values: {
          password: '',
          passwordRepeat: ''
        }
      })
    },
  });

  const registerHandler = async (values) => {
    try {
      console.log(formik);
      await request("/api/auth/register", "POST", { ...values });
      navigate("/");
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <>
      <h2 className="auth__title">Sign Up</h2>
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
          <label htmlFor="login">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
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
        <div className="auth__form-container">
          <label htmlFor="login">Repeat password</label>
          <input
            type="password"
            id="passwordRepeat"
            name="passwordRepeat"
            placeholder="Repeat password"
            onChange={formik.handleChange}
            value={formik.values.passwordRepeat}
          />
        </div>
        <div className="auth__form-control">
          <button
              className="btn"
              type="submit"
              disabled={loading}
              name="action"
          >
            Sign Up
          </button>
          <span className="auth__form-text">
            Already have an account?
          </span>
          <NavLink
              to="/"
              className="auth__form-link"
            >
              Sign In
          </NavLink>
          
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
