import { v4 as createId } from "uuid";
import { hashPassword } from "../utils/hashing.mjs";
import { usersList } from "../data/users.mjs";

export const registerController = async (req, res) => {
  const { email, password } = req.body;
  const isEmail = typeof email === "string";
  const isPassword = typeof password === "string";

  if (!isEmail || !isPassword) {
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
  };

  usersList.push(user);

  res.json({ message: "ok" })
}