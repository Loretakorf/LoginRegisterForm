import { Box, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import Heading from "../../components/Heading/Heading";
import { useState } from "react";
import { registerUser } from "../../helpers/registerUser";
import Input from "../../components/Input/Input";
import Button from "../../components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

const schemaA = yup.object().shape({
  email: yup
    .string()
    .email()
    // .matches(/^(?!.*@[^,]*,)/, "Email address is required")
    .required("Email address is required"),
  password: yup
    .string()
    .min(6)
    .max(15)
    // .matches(/\d+/)
    .required("Enter password please"),
  passworRepeat: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .min(6)
    .max(15)
    .required("Repeat password"),
});
const schemaB = yup.object().shape({
  firstName: yup.string().min(2).required("First name is required"),
  lastName: yup.string().min(2).required("Last name is required"),
  checkbox: yup.boolean().required(),
});

const schemaStep = (step) => {
  if (step === 0) {
    return schemaA;
  }
  if (step === 1) {
    return schemaB;
  }
};

const RegisterPage = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schemaStep(step)),
    mode: "all",
  });

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!error) {
  //     return;
  //   }
  //   const clearError = () => {
  //     setError("");
  //   };
  //   setTimeout(clearError, 10 * 1000);
  // }, [error]);

  const onSubmit = async (formData) => {
    // try {
    //   setLoading(true);

    if (step === 0 && formData.email && formData.password) {
      setStep(1);
      setLoading(false);
      // return;
    }
    if (
      step === 1 &&
      formData.firstName &&
      formData.lastName &&
      formData.checkbox
    ) {
      try {
        await registerUser({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          checkbox: formData.checkbox,
        });

        setError("");
        navigate(routes.loginPage, { replace: true });
      } catch (error) {
        setError("Failed to register user");
        setTimeout(() => {
          setError(null);
        }, 1000);
      }
      console.log(formData);
      setLoading(false);
    }
  };
  return (
    <div className="main">
      <section>
        <Heading title="Register form" />
        <div className="container">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            {step === 0 && (
              <Box display="flex" flexDirection="column" gap={2}>
                {error && <p className="red">{error}</p>}
                <Input
                  required
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  errors={errors}
                  register={register}
                  disabled={loading ? true : false}
                />

                <Input
                  required
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  errors={errors}
                  register={register}
                  disabled={loading ? true : false}
                />

                <Input
                  required
                  id="passwordRepeat"
                  name="passwordRepeat"
                  type="password"
                  placeholder="Password(repeat)"
                  errors={errors}
                  register={register}
                  disabled={loading ? true : false}
                />

                <Button
                  onClick={() => setStep(step + 1)}
                  label="Next"
                  disabled={!isValid}
                />
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
                  errors={errors}
                  disabled={loading ? true : false}
                />

                <Input
                  required
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  type="text"
                  errors={errors}
                  register={register}
                  disabled={loading ? true : false}
                />

                <Input
                  required
                  type="checkbox"
                  name={"checkbox"}
                  errors={errors}
                  register={register}
                />
                <label>I accept terms and conditions</label>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Button onClick={() => setStep(step - 1)} label={"Back"} />

                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Button type="submit" label={"Submit"}></Button>
                  )}
                </Box>
              </Box>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};
export default RegisterPage;
