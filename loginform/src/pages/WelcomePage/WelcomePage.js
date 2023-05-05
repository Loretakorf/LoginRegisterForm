import { routes } from "../../constants/routes";
import Heading from "../../components/Heading/Heading";
import { Link } from "react-router-dom";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import BeachAccess from "@mui/icons-material/BeachAccess";
import Box from "@mui/material/Box";

const WelcomePage = () => {
  return (
    <div className="welcome">
      <Heading title={"Welcome to our world"}/>
      <Box display={"flex"} justifyContent={"center"} gap={14} paddingTop={2}>
      <Box display="flex" gap={1} justifyContent={"center"} alignItems={"center"}>
        <AccessibilityNewIcon fontSize="large" />
        <Link to={routes.loginPage}>Login</Link>
      </Box>
      <Box display="flex" gap={1} justifyContent={"center"} alignItems={"center"}>
        <BeachAccess fontSize="large" />
        <Link to={routes.registerPage}>Register</Link>
      </Box>
      </Box>
    
    </div>
  );
};
export default WelcomePage;
