import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./constants/routes";
import LoginPage from "./pages/Loginpage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/Homepage/Homepage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Layout from "./components/Layout/Layout";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import Cookies from "js-cookie"
import { useState } from "react";

const defaultToken = Cookies.get("_todo_token");

function App() {
  const [token, setToken] = useState(defaultToken);

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path={routes.defaultPage} element={<WelcomePage />} />
          <Route
            path={routes.loginPage}
            element={<LoginPage />}
            token={token}
            onLogin={(token) => {
              Cookies.set("_todo_token", token, { sameSite: true });
              setToken(token);
            }}
          />
          <Route
            path={routes.homePage}
            element={<HomePage />}
            token={token}
            onLogout={() => {
              Cookies.remove("_todo_token");
              setToken();
            }}
          />
          <Route path={routes.registerPage} element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
