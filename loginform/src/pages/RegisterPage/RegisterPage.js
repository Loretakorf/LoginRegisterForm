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
import { useNavigate } from "react-router-dom";

// const YupValidationResolver = (schema) =>
// useCallback(
//   async data => {
//     try {
//       const values = await schema.validate(data,{
//         abortEarly: false
//       });
//       // const values1 = await schemaB.validate(data,{
//       //   abortEarly: false
//       // });

//       return {
//         values,
//         // values1,
//         errors: {}
//       };
//     } catch (errors) {
//       return {
//         values: {},
//         values1: {},
//         errors: errors.inner.reduce(
//           (allErrors, currentError) => ({
//             ...allErrors,
//             [currentError.path]: {
//               type: currentError.type ?? "validation",
//               message: currentError.message
//             }
//           }),
//           {}
//         )
//       }
//     }
//   },
//   [schema]
// )

const schemaA = yup.object({
  email: yup.string().matches(/^(?!.*@[^,]*,)/,{ message: "Email address is required"}).required(),
  password: yup.string().min(6).max(15).matches(/\d+/, { message: { number: "Password no number" } }).required("Enter password please"),
  passworRepeat: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .min(6)
    .max(15)
    .required({ message: "Repeat password"}),
});
const schemaB = yup
  .object({
    firstName: yup.string().min(2).required({ message:"First name is required"}),
    lastName: yup.string().min(2).required({message: "Last name is required"}),
    checkbox: yup.boolean("I accept terms and conditions"),
  })
  .required();

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
    formState: errors,
  } = useForm(schemaStep(step));

  const [loading, setLoading] = useState(false);
  const [setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (formdata) => {
    if (step === 0 && formdata.email && formdata.password) {
      setStep(step + 1);

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

    try {
      setLoading(true);
      await registerUser({
        email: formdata.email,
        password: formdata.password,
        firstName: formdata.firstName,
        lastName: formdata.lastName,
        checkbox: formdata.checkbox,
      });

      setError("");
      navigate("/login", { replace: true });
      setStep(1);
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
                    errors={errors}
                    register={register}
                  />
                  {errors.email && <p>{errors.email?.message}</p>}
                  <Input
                    required
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    errors={errors}
                    register={register}
                  />
                  {errors.password && <p>{errors.password?.message}</p>}
                  <Input
                    required
                    id="passwordRepeat"
                    name="passwordRepeat"
                    type="password"
                    placeholder="Password(repeat)"
                    errors={errors}
                    register={register}
                  />
                  {errors.passwordRepeat && <p>{errors.passwordRepeat?.message}</p>}
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
                    errors={errors}
                  />
                  {errors.firstName && <p>{errors.firstName?.message}</p>}
                  <Input
                    required
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    type="text"
                    errors={errors}
                    register={register}
                  />
                  {errors.lastName && <p>{errors.lastName?.message}</p>}
                  <Input
                    type="checkbox"
                    name={"checkbox"}
                    errors={errors}
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
