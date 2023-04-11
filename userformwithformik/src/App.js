import LoginPage from "./pages/LoginPage/LoginPage";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import Main from "./components/Main/Main";
import NotFoundPage from "./pages/NotFoundPage";
import { routes } from "./constants/routes";
import "./App.css";
import HomePage from "./pages/Homepage";
import Cookies from "js-cookie";
import { useState } from "react";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
const defaultToken = Cookies.get("_todo_token");

function App() {
  const [token, setToken] = useState(defaultToken);
  return (
    <div className="App">
      <Main>
        <Routes>
          <Route path={routes.defaultPage} element={<WelcomePage/>}/>
          <Route path={routes.loginPage} element={<LoginPage 
          token={token}
            onLogin={(token) => {
              Cookies.set("_todo_token", token, { sameSite: true });
              setToken(token);
            }}/>} />
          <Route path={routes.registerPage} element={<RegisterPage />} />
          <Route path={routes.homePage} element={<HomePage 
          token={token}
            onLogout={() => {
              Cookies.remove("_todo_token");
              setToken();
            }}/>} />
          <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
      </Main>
    </div>
  );
}

export default App;
