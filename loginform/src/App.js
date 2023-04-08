import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./constants/routes";
import LoginPage from "./pages/Loginpage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/Homepage/Homepage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Layout from "./components/Layout/Layout";
import WelcomePage from "./pages/WelcomePage/WelcomePage"

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
        <Route path={routes.defaultPage} element={<WelcomePage />} />
          <Route path={routes.loginPage} element={<LoginPage />} />
          <Route path={routes.homePage} element={<HomePage />} />
          <Route path={routes.registerPage} element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
