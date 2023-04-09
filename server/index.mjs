import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { registerController } from "./controller/registerController.mjs";
import { loginController } from "./controller/loginController.mjs";
import { userController } from "./controller/userCotroller.mjs"
import { decodeToken } from "./utils/token.mjs";
import { usersList } from "./data/usersList.mjs";

dotenv.config();
const app = express();
const port = process.env.PORT;

const bodyParser = express.json();
const corsMiddleware = cors();

app.use(bodyParser);
app.use(corsMiddleware);
app.use((req, _, next) => {
  if (req.headers.token) {
    const authId = decodeToken(req.headers.token)?.id;
    const user = usersList.find(({ _id }) => _id === authId);
    if (user) req.user = user;
  }
  next();
});

app.post("/login", loginController);
app.post("/register", registerController);
app.get("/home", userController)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });