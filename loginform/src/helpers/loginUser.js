import { routes } from "../constants/routes";

export const loginUser = (user) => {
    return fetch(routes.loginPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      if (!res.ok) throw new Error("Request failed");
      return res.json();
    });
  };