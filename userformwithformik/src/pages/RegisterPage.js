import SignUpInfo from "../components/SignUpInfo/SignUpInfo"
import PersonalInfo from "../components/PersonalInfo/PersonalInfo"
import { useFormik } from "formik";
import Heading from "../components/Heading/Heading";
import { useState } from "react";
import LoginPage from "../pages/LoginPage/LoginPage";
import { registerUser } from "../servises/registerUser";
// import Button from "../../components/Button";

import * as Yup from "yup";


const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);

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
      if (step === 0 && formdata.email && formdata.password && formdata.passworRepeat) {
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
    }
  });


  // const onSubmit = async (formdata) => {
  //   if (step === 0 && formdata.email && formdata.password && formdata.passworRepeat) {
  //     setStep(1);

  //     setLoading(false);
  //   }
  //   if (
  //     step === 1 &&
  //     formdata.firstName &&
  //     formdata.lastName &&
  //     formdata.checkbox
  //   ) {
  //     setLoading(true);
  //   }
  //   if (formdata.password !== formdata.passwordRepeat) {
  //     setError(error);
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     await registerUser({
  //       email: formdata.email,
  //       password: formdata.password,
  //       firstName: formdata.firstName,
  //       lastName: formdata.lastName,
  //       checkbox: formdata.checkbox,
  //     });

  //     setError(null);
  //     setSuccess(true);
  //   } catch (error) {
  //     setError("Failed to register user");
  //   }
  //   setLoading(false);
  // };
  return (
    <div className="main">
      {success ? (
        <LoginPage />
      ) : (
        <section>
          <Heading title="Register form" />
          <div className="container">
            <form className="form" onSubmit={formik.handleSubmit}>
             { step === 0 ? <SignUpInfo formik={formik}/> : <PersonalInfo formik={formik}/>}
            
            
            </form>
            {loading && <p>...loading</p>}
          </div>
        </section>
      )}
    </div>
  );
};
export default RegisterPage;
