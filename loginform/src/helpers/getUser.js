import { routes } from "../constants/routes"

export const getUser = () => {
    // const token = Cookies.get("_todo_token");
  
    return fetch(routes.homePage, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) throw new Error("Request failed");
      return response.json();
    });
  };