import express from "express";
import cors from "cors";
import dotenv from "dotenv"


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
app.get("/home",listController)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });