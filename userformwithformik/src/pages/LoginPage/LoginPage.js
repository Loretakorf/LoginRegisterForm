import { loginUser } from "../../servises/loginUser";
import { useState } from "react";
import { Box, Button, ButtonGroup } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Heading from "../../components/Heading/Heading"
import Input from "../../components/Input/Input";
const LoginPage = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      formA: {
        email: "",
        password: "",
        passworRepeat: "",
      },
      formB: {
        firstName: "",
        lastName: "",
        checkbox: Yup.boolean,
      },
    },
    validationSchema: Yup.object({
      sighUpInfo: Yup.object({
        name: Yup.string().required("This field is required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
      }),
      personalInfo: Yup.object({
        phone: Yup.string()
          .required("This field is required")
          .min(6, "At least 06 characters"),
      }),
    }),
    onSubmit: async (formdata) => {
      if (formdata.password !== formdata.passwordRepeat) {
        setError(error);

        return;
      }

      try {
        setLoading(true);
        await loginUser({
          email: formdata.email,
          password: formdata.password,
          firstName: formdata.firstName,
          lastName: formdata.lastName,
          checkbox: formdata.checkbox,
        });

        setError(null);
      } catch (error) {
        setError("Failed to register user");
      }
      setLoading(false);
    },
  });

  // const onSubmit = async (formdata) => {
  //   if (formdata.password !== formdata.passwordRepeat) {
  //     setError(error);
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     await loginUser({
  //       email: formdata.email,
  //       password: formdata.password,
  //     });

  //     setError(null);
  //   } catch (error) {
  //     setError("Failed to register user");
  //   }
  //   setLoading(false);
  // };

  return (
    <div className="main">
      <Heading title="Welcome" />

      <div className="wrapper">
        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" gap={3}>
            {error && (
              <span className="span">"Email or password doesn't match"</span>
            )}
            <Input
              id="signUpInfo.email"
              name="signUpInfo.email"
              placeholder={"Email"}
              value={formik.values.sighUpInfo.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.errors.sighUpInfo && (
              <div style={{ color: "red" }}>
                <small>{formik.errors.sighUpInfo.email}</small>
              </div>
            )}
            <Input
              id="signUpInfo.password"
              name="signUpInfo.password"
              placeholder={"Password"}
              value={formik.values.sighUpInfo.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.errors.sighUpInfo && (
              <div style={{ color: "red" }}>
                <small>{formik.errors.sighUpInfo.password}</small>
              </div>
            )}
          </Box>
        </form>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button type="submit">Login</Button>
          {loading && <p>..loading</p>}
        </ButtonGroup>
      </div>
    </div>
  );
};
export default LoginPage;
