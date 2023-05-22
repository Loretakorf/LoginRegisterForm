import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { loginUser } from "../../helpers/loginUser";
import { routes } from "../../constants/routes";
import { Box, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button";
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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  useEffect(() => {
    if (!error) {
      return;
    }
    const clearError = () => {
      setError("");
    };
    setTimeout(clearError, 10 * 1000);
  }, [error]);

  const onSubmit = async (formdata) => {
    setLoading(true);
    try {
      const response = await loginUser({
        email: formdata.email,
        password: formdata.password,
      });
      onLogin(response.token);
      setError(null);
      navigate(routes.homePage);
    } catch (error) {
      setError("Failed to login user");
    }
    console.log(formdata);
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
            disabled={loading ? true : false}
          />

          <Input
            required
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            errors={errors}
            disabled={loading ? true : false}
          />

          {loading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" label={"Login"} />
          )}
        </Box>
      </form>

      <Box
        display="flex"
        gap={2}
        marginTop={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <p>Haven't account?</p>
        <Link to={routes.registerPage}>Register</Link>
      </Box>
    </section>
  );
};
export default LoginPage;
