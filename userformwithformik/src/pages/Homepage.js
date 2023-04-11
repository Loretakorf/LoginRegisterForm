import { useEffect, useState } from "react";
import Heading from "../components/Heading/Heading";
import { getFormData } from "../servises/getFormData";

const HomePage = () => {
  const [user, setUser] = useState();
  const handleUsersLoad = async () => {
    try {
      const data = await getFormData();
      setUser(data);
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

      
        <div className="flex" >
          <h2>Email: {user.email}</h2>
          <h2>First Name: {user.firstName}</h2>
          <h2>Last Name: {user.lastName}</h2>
        </div>
     
    </section>
  );
};
export default HomePage;
