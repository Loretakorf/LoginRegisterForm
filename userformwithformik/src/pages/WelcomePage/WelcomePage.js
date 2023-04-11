import Link from "react-router-dom";
import Main from "../../components/Main/Main";
import Heading from "../../components/Heading/Heading";
import { routes } from "../../constants/routes";

const WelcomePage = () => {
  return (
    <div>
      <Main>
        <Heading />

        <Link to={routes.loginPage}>Login</Link>
        <Link to={routes.registerPage}>Register</Link>
      </Main>
    </div>
  );
};
export default WelcomePage;
