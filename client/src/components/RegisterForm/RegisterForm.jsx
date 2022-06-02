import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
    passwordRepeat: Yup.string().min(8, 'Password confirmation is too short').required('Password confirmation is required').oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  useEffect(() => {
    clearError();
  }, [error, clearError]);

  const registerHandler = async (values) => {
    try {
      await request("/api/auth/register", "POST", { ...values });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="auth__title">Sign Up</h2>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          passwordRepeat: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          registerHandler(values);
          actions.resetForm({
            values: {
              password: '',
              passwordRepeat: ''
            }
          })
        }}
      >
        {() => (
          <Form className="auth__form">
            <div className="auth__form-container">
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Username"
              />
              <ErrorMessage className="auth__form-error" component="span" name="username"/>
            </div>
            <div className="auth__form-container">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              />
              <ErrorMessage className="auth__form-error" component="span" name="email"/>
            </div>
            <div className="auth__form-container">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage className="auth__form-error" component="span" name="password"/>
            </div>
            <div className="auth__form-container">
              <label htmlFor="passwordRepeat">Repeat password</label>
              <Field
                type="password"
                id="passwordRepeat"
                name="passwordRepeat"
                placeholder="Repeat password"
              />
              <ErrorMessage className="auth__form-error" component="span" name="passwordRepeat"/>
            </div>
            <div className="auth__form-control">
              <button
                  className="btn"
                  type="submit"
                  disabled={loading}
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
          </Form>
        )}
      </Formik>
    </>
  );
}

export default RegisterForm;
