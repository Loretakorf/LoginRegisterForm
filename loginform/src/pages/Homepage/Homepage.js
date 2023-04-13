import { useEffect, useState } from "react";
import Heading from "../../components/Heading/Heading";
import { Box, CircularProgress } from "@mui/material";
import Button from "../../components/Button";
import { getUser } from "../../helpers/getUser";
import { useNavigate, Navigate } from "react-router-dom";

const HomePage = ({ onLogout, token }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const getUserInfo = async () => {
    // if (!token) {
    //   return <Navigate to="/login" />;
    // }

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
    if (!token) {
      navigate("/login");
    }
    getUserInfo();
  }, [token]);

  return (
    <div>
      <Heading title={"Your acccount information"} />
      {loading && <CircularProgress />}
      {user && (
        <Box display="flex" flexDirection="column" gap={3} marginTop={10}>
          <p>Your Email: {user.email}</p>
          <p>Your Name: {user.firstName}</p>
          <p>Your LastName: {user.lastName}</p>
          {error && <p>{error}</p>}
        </Box>
      )}

      <Button label="Log out" onClick={handleLogout} />
    </div>
  );
};

export default HomePage;
