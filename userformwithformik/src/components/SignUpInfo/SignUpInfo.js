import { Button } from "@mui/material";
import Input from "../Input/Input";
const SignUpInfo = ({ formik, step, setStep }) => {
  return (
    <div>
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
      <Input
         id="signUpInfo.passwordRepeat"
         name="signUpInfo.passwordRepeat"
         placeholder={"Password(repeat)"}
         value={formik.values.sighUpInfo.passwordRepeat}
         onBlur={formik.handleBlur}
         onChange={formik.handleChange}
      
      />
        {formik.errors.sighUpInfo && (
          <div style={{ color: "red" }}>
            <small>{formik.errors.sighUpInfo.passwordRepeat}</small>
          </div>
        )}
        <Button label="Next" onClick={() => setStep(step + 1)}/>
    </div>
  );
};
export default SignUpInfo;