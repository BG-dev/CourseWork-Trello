import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navbar } from "./components";
import { useAuth } from "./hooks/auth.hook";
import { useRoutes } from "./hooks/routes.hook";

// import "./scss/_colorize.scss";

function App() {
  const { login, storageName } = useAuth();
  const user = useSelector((state) => state.userReducer.user);
  const isAuthenticated = !!user.token;
  const routes = useRoutes(isAuthenticated);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token && data.userId && data.username)
      login(data.token, data.username, data.userId);
  }, [user.token, login, storageName]);

  return (
    <div className="container">
      {isAuthenticated && <Navbar />}
      {routes}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
