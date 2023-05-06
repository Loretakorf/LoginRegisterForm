import { HOME } from "../constants/routes";
import Cookies from "js-cookie";

export const getUser = () => {
  const token = Cookies.get("_todo_token");

  return fetch(HOME, {
    headers: {
      token,
    },
  }).then((response) => {
    if (!response.ok) throw new Error("Request failed");
    return response.json();
  });
};
