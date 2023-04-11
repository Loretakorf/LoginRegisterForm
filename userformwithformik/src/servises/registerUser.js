import { REGISTER } from "../constants/apiUrls";

export const registerUser = (user) => {
  return fetch(REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  }).then((res) => {
    if (!res.ok) throw new Error("Request failed");
    return res.json();
  });
};
