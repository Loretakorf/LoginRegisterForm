import { Box, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import Heading from "../../components/Heading/Heading";
import { useState } from "react";
import LoginPage from "../Loginpage/LoginPage";
import { registerUser } from "../../helpers/registerUser";
import Input from "../../components/Input/Input";
import Button from "../../components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schemaA = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  passworRepeat: yup.string().required("Repeat password pleace"),
});
const schemaB = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  checkbox: yup.boolean,
});

const schemaStep = (step) => {
  if (step === 0) {
    return {
      resolver: yupResolver(schemaA),
    };
  }
  if (step === 1) {
    return {
      resolver: yupResolver(schemaB),
    };
  }
};

const RegisterPage = () => {
  const [step, setStep] = useState(0);
  const {
    register,
    handleSubmit,
    isValid,
    formState: errors,
  } = useForm({
    resolver: yupResolver(schemaStep(step)),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(false);

  const onSubmit = async (formdata) => {
    if (step === 0 && formdata.email && formdata.password) {
      setStep(1);

      setLoading(false);
    }
    if (
      step === 1 &&
      formdata.firstName &&
      formdata.lastName &&
      formdata.checkbox
    ) {
      setLoading(true);
    }
    if (formdata.password !== formdata.passwordRepeat) {
      setError(error);
      return;
    }
    try {
      setLoading(true);
      await registerUser({
        email: formdata.email,
        password: formdata.password,
        firstName: formdata.firstName,
        lastName: formdata.lastName,
        checkbox: formdata.checkbox,
      });

      setError(null);
      setSuccess(true);
    } catch (error) {
      setError("Failed to register user");
    }
    setLoading(false);
  };
  return (
    <div className="main">
      {success ? (
        <LoginPage />
      ) : (
        <section>
          <Heading title="Register form" />
          <div className="container">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              {step === 0 && (
                <Box display="flex" flexDirection="column" gap={3}>
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
                    disable={isValid}
                  />
                  {errors.password && <p>{errors.password.message}</p>}
                  <Input
                    required
                    id="passwordRepeat"
                    name="passwordRepeat"
                    type="password"
                    placeholder="Password(repeat)"
                    register={register}
                    message="Password must mutch"
                    disable={isValid}
                  />
                  {errors.passwordRepeat && (
                    <p>{errors.passwordRepeat.message}</p>
                  )}
                  <Button onClick={() => setStep(step + 1)} label="Next" />
                </Box>
              )}

              {step === 1 && (
                <Box display="flex" flexDirection="column" gap={3}>
                  <Input
                    required
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    type="text"
                    register={register}
                    message="First name is required"
                    disable={isValid}
                  />
                  {errors.firstName && <p>{errors.firstName.message}</p>}
                  <Input
                    required
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    type="text"
                    register={register}
                    message="Last name is required"
                    disable={isValid}
                  />
                  {errors.lastName && <p>{errors.lastName.message}</p>}
                  <Input
                    type="checkbox"
                    name={"checkbox"}
                    register={register}
                    label="I accept terms and conditions"
                  />

                  <Button onClick={() => setStep(step - 1)} label={"Back"} />

                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Button type="submit" label={"Submit"}></Button>
                  )}
                </Box>
              )}
            </form>
          </div>
        </section>
      )}
    </div>
  );
};
export default RegisterPage;
