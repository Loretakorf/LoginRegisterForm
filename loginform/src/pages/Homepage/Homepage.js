import { useEffect, useState } from "react";
import Heading from "../../components/Heading/Heading";
import { Box, CircularProgress } from "@mui/material";
import Button from "../../components/Button";
import { getUser } from "../../helpers/getUser";
import { useNavigate, Navigate } from "react-router-dom";

const HomePage = ({ onLogout, token }) => {
  const [user, setUser] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const getUserInfo = async () => {
    if (!token) {
      return <Navigate to="/login" />;
    }

    try {
      setLoading(true);
      const response = await getUser();
      setUser(response.user);
      setError(null);
    } catch (error) {
      setError("Failed to get userinfo");
      setUser("");
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserInfo();
  });

  return (
    <div>
      <Heading title={"Your acccount information"} />
      {loading && <CircularProgress />}
      <Box display="flex" flexDirection="column" gap={3} marginTop={10}>
        <p label="Your Email: " user={user.email} />
        <p label="Your Name: " user={user.firstName} />
        <p label="Your LastName: " user={user.lastName} />
        {error && <p>{error}</p>}
      </Box>

      <Button label="Log out" onClick={handleLogout} />
    </div>
  );
};

export default HomePage;
