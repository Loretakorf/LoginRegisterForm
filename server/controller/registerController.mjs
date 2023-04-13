import { v4 as createId } from "uuid";
import { hashPassword } from "../utils/hashing.mjs";
import { usersList } from "../data/usersList.mjs";

export const registerController = async (req, res) => {
  const { email, password, firstName, lastName, checkbox } = req.body;
  const isEmail = typeof email === "string" && email.length > 3
  const isPassword = typeof password === "string" && password.length > 6;
  const isFirstName = typeof firstName === "string" && firstName.length > 2;
  const IsLastName = typeof lastName === "string" && lastName.length > 2;
  const IsCheckBox = typeof checkbox === "boolean"

  if (!isEmail || !isPassword || !isFirstName || !IsLastName || !IsCheckBox) {
    res.status(400).json({ message: "Bad register data" });
    return;
  }

  const hasUser = usersList.some((user) => user.email === email);

  if (hasUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  }
  const user = {
    _id: createId(),
    email,
    password: await hashPassword(password),
    firstName,
    lastName,
    checkbox,
  };

  usersList.push(user);

  res.json({ message: "ok" })
}