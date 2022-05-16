import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navbar } from "./components";
import { useAuth } from "./hooks/auth.hook";
import { useRoutes } from "./hooks/routes.hook";

function App() {
  const { login, storageName } = useAuth();
  const user = useSelector((state) => state.userReducer.user);
  const isAuthenticated = !!user.token;
  const routes = useRoutes(isAuthenticated);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token && data.userId && data.login)
      login(data.token, data.login, data.userId);
  }, [user.token, login, storageName]);

  return (
    <>
      {isAuthenticated && <Navbar />}
      <div className="container">{routes}</div>
    </>
  );
}

export default App;
