import { useEffect, useState } from "react";
import Heading from "../components/Heading/Heading";
import { getFormData } from "../servises/getFormData";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const handleUsersLoad = async () => {
    try {
      const data = await getFormData();
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleUsersLoad();
  }, []);

  return (
    <section>
      <Heading title="User information" />

      {users.map(({ _id, email, firstName, lastName }) => (
        <div className="flex" key={_id}>
          <h2>Email: {email}</h2>
          <h2>First Name: {firstName}</h2>
          <h2>Last Name: {lastName}</h2>
        </div>
      ))}
    </section>
  );
};
export default HomePage;
