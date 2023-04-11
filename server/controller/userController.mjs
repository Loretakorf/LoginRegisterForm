import { usersList } from "../data/usersList.mjs";

export const userController = (req, res) => {
  if (!req.user) {
    res.status(403).json({ message: "User not logged in" });
    return;
  }
  if (!usersList[req.user._id]) {
    usersList[req.user._id] = [];
  }

  res.json({
    user: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    checkbox: req.user.checkbox
  });
};
