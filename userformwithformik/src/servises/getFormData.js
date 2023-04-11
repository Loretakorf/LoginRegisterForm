// import Cookies from "js-cookie";
import { HOME } from "../constants/apiUrls";

export const getFormData = () => {
    // const token = Cookies.get("_todo_token");
  
    return fetch(HOME, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) throw new Error("Request failed");
      return response.json();
    });
  };