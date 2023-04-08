import { routes } from "../../constants/routes";
import Heading from "../../components/Heading/Heading";
import { Link } from "react-router-dom";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import AssistWalkerIcon from "@mui/icons-material/AssistWalker";
import Box from "@mui/material/Box";

const WelcomePage = () => {
  return (
    <div>
      <Heading title={"Welcome to our small ecosystem"} font-size="large"/>
      <Box display={"flex"} justifyContent={"center"} gap={10} paddingTop={5}>
      <Box display="flex" gap={3}>
        <AccessibilityNewIcon fontSize="large" />
        <Link to={routes.loginPage}>Login</Link>
      </Box>
      <Box display="flex" gap={3}>
        <AssistWalkerIcon fontSize="large" />
        <Link to={routes.registerPage}>Register</Link>
      </Box>
      </Box>
    
    </div>
  );
};
export default WelcomePage;
