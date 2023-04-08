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
  } = useForm({ email: "", password: "", passwordRepeat: "", firstName: "", lastName: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (formdata) => {
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
      setSuccess(true); //not sure
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
                    message="Password must have minimum six letters"
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
                    disable={isValid}
                  />
                  {error && "Password must mutch"}
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
