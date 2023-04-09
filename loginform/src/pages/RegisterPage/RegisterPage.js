import { Box, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import Heading from "../../components/Heading/Heading";
import { useState } from "react";
import LoginPage from "../Loginpage/LoginPage";
import { registerUser } from "../../helpers/registerUser";
import Input from "../../components/Input/Input";
import Button from "../../components/Button";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    isValid,
    formState: errors,
  } = useForm({
    email: "",
    password: "",
    passwordRepeat: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(0);

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
                    {...register("email", {
                      required: "Required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address",
                      },
                    })}
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
                    {...register("password", {
                      required: "Required",
                      pattern: {
                        value:
                          /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                        message:
                          "Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol.",
                      },
                    })}
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

                  <Button type="submit" label={"Submit"}>
                    {loading ? <CircularProgress /> : "Submit"}
                  </Button>
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
