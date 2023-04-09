import Input from "../Input/Input";
const SignUpInfo = ({ userData, setuserData, error }) => {
  return (
    <div>
      <Input
        required
        id="email"
        name="email"
        type="email"
       
        value={userData.email}
        placeholder="Email"
        onChange={(event) => {
          setuserData({ ...userData, email: event.target.value });
        }}
      />
      {error && "Email must be valid"}
      <Input
        required
        id="password"
        name="password"
        type="password"
        value={userData.password}
        placeholder="Password"
        onChange={(event) => {
          setuserData({
            ...userData,
            password: event.target.value,
          });
        }}
      />
      {error && "Password must have 6 letters"}
      <Input
        required
        id="passwordRepeat"
        name="passwordRepeat"
        type="password"
        value={userData.passwordRepeat}
        placeholder="Password(repeat)"
        onChange={(event) => {
          setuserData({
            ...userData,
            passwordRepeat: event.target.value,
          });
        }}
      />
      {error && "Password must mutch"}
    </div>
  );
};
export default SignUpInfo;
