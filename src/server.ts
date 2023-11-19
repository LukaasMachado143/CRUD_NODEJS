import Express from "express";
import { UserController } from "./controllers/UserController";

const app = Express();
app.use(Express.json());

const PORT = 8000;

const userRouter = new UserController().Routes();
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
