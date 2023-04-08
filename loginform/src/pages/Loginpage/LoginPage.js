import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginUser } from "../../helpers/loginUser";
import { Box, CircularProgress } from "@mui/material";
import Input from "../../components/Input/Input";
import Button from "../../components/Button";
const LoginPage = () => {
  const {
    register,
    isValid,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formdata) => {
    if (formdata.password !== formdata.passwordRepeat) {
      setError(error);
      return;
    }
    try {
      setLoading(true);
      await loginUser({
        email: formdata.email,
        password: formdata.password,
      });

      setError(null);
    } catch (error) {
      setError("Failed to register user");
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={3} marginTop={18}>
          <Input
            required
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            register={register}
            message="Email is required"
            disable={isValid}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <Input
            required
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            message="Password must have minimum six letters"
            disable={isValid}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <Button type="submit" label={"Login"}/>
          {loading && <CircularProgress />}
        </Box>
      </form>
    </div>
  );
};
export default LoginPage;
