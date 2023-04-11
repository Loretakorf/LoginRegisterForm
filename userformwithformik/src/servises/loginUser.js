import { LOGIN } from "../constants/apiUrls";

export const loginUser = (user) => {
  return fetch(LOGIN, {
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
