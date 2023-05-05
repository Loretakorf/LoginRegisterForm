import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginUser } from "../../helpers/loginUser";
import { routes } from "../../constants/routes";
import { Box, CircularProgress } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button";

import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().required({ message: "Email address is required" }),
  password: yup
    .string()
    .min(6)
    .max(15)
    .required({ message: "Enter password please" }),
});

const LoginPage = ({ onLogin }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const onSubmit = async (formdata) => {
    console.log(formdata);

    try {
      setLoading(true);
      const response = await loginUser({
        email: formdata.email,
        password: formdata.password,
      });
      onLogin(response.token);
      setError(null);
      navigate(routes.homePage);
    } catch (error) {
      setError("Failed to register user");
    }

    setLoading(false);
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={3} marginTop={18}>
          {error && <p className="red">{error}</p>}
          <Input
            required
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            register={register}
            errors={errors}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p>{message}</p>}
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
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <p>{message}</p>}
          />
          {loading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" label={"Login"} />
          )}
        </Box>
      </form>

      <Box display="flex" gap={2} marginTop={2} justifyContent={"center"} alignItems={"center"}>
        <p>Haven't account?</p>
        <Link to={routes.registerPage}>Register</Link>
      </Box>
    </section>
  );
};
export default LoginPage;
