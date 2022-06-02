import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginForm, RegisterForm } from "../../components"


import './AuthPage.scss'

function AuthPage() {
  

  return (
    <div className="auth">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </div>
  );
}

export default AuthPage;
