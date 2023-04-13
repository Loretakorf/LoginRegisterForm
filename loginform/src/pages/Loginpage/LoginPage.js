import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginUser } from "../../helpers/loginUser";
import { routes } from "../../constants/routes";
import { Box, CircularProgress } from "@mui/material";
import AssistWalkerIcon from "@mui/icons-material/AssistWalker";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button";
import HomePage from "../Homepage/Homepage";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().required("Email address is required"),
  password: yup.string().min(6).max(15).required("Enter password please"),
});

const LoginPage = ({ onLogin, token }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formdata) => {
    if (formdata.password !== formdata.passwordRepeat) {
      setError(error);
      return;
    }
    try {
      setLoading(true);
      const response = await loginUser({
        email: formdata.email,
        password: formdata.password,
      });
      onLogin(response.token);
      setError(null);
    } catch (error) {
      setError("Failed to register user");
    }
    setLoading(false);
  };

  return (
    <div>
      {token ? (
        <HomePage />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={3} marginTop={18}>
            <Input
              required
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              register={register}
              errors={errors}
            />

            <Input
              required
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              register={register}
              errors={errors}
            />
            {loading ? (
              <CircularProgress />
            ) : (
              <Button type="submit" label={"Login"} />
            )}
          </Box>
        </form>
      )}
       <Box display="flex" gap={3} marginTop={14}>
        <AssistWalkerIcon fontSize="large" />
        <Link to={routes.registerPage}>Register</Link>
      </Box>
    </div>
  );
};
export default LoginPage;
