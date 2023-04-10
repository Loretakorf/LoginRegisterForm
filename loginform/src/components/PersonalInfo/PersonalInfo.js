// import { Button } from "@mui/material";
// import Input from "../Input/Input";
// const PersonalInfo = ({ formik, step, setStep }) => {
//   return (
//     <div>
//       <Input
//         id="personalInfo.firstName"
//         name="personalInfo.firstName"
//         placeholder={"First Name"}
//         value={formik.values.personalInfo.firstName}
//         onBlur={formik.handleBlur}
//         onChange={formik.handleChange}
//       />
//       {formik.errors.personalInfo && (
//         <div style={{ color: "red" }}>
//           <small>{formik.errors.personalInfo.firstName}</small>
//         </div>
//       )}
//       <Input
//         id="personalInfo.lastName"
//         name="personalInfo.lastName"
//         placeholder={"Last Name"}
//         value={formik.values.personalInfo.lastName}
//         onBlur={formik.handleBlur}
//         onChange={formik.handleChange}
//       />
//       {formik.errors.personalInfo && (
//         <div style={{ color: "red" }}>
//           <small>{formik.errors.personalInfo.lastName}</small>
//         </div>
//       )}
//       <Input
//         type="checkbox"
//         id="personalInfo.checkbox"
//         name="personalInfo.checkbox"
//         value={formik.values.personalInfo.checkbox}
//         label="I accept terms and conditions"
//       />
//       <div><Button label="Back" onClick={() => setStep(step - 1)}/></div>
//     </div>
//   );
// };
// export default PersonalInfo;
