
import Input from "../Input/Input";
const PersonalInfo = ({ userData, setuserData, error }) => {
  return (
    <div>
      
        <Input
          required
          id="firstName"
          name="firstName"
          value={userData.firstName}
          placeholder="First name"
          type="text"
          error="First name is required"
          onChange={(event) => {
            setuserData({ ...userData, firstName: event.target.value });
          }}
        />
        {error.firstName && <p>{error.firstName}</p>}
        <Input
          required
          id="lastName"
          name="lastName"
          value={userData.lastName}
          placeholder="Last name"
          type="text"
          error="Last name is required"
          onChange={(event) => {
            setuserData({ ...userData, lastName: event.target.value });
          }}
        />
        {error.lastName && <p>{error.lastName}</p>}
        <Input
          type="checkbox"
          value={userData.checkbox}
          name={"checkbox"}
          label="I accept terms and conditions"
          onChange={(event) => {
            setuserData({ ...userData, checkbox: event.target.value });
          }}
        />
     
    </div>
  );
};
export default PersonalInfo;
