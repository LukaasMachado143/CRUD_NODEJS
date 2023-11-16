import Express from "express";
import { UserController } from "./controllers/UserController";
import { UserService } from "./services/UserService";
import { UserRepository } from "./repositories/UserRepository";

const app = Express();
app.use(Express.json());

const PORT = 8000;

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const userRouter = userController.configureRoutes();

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
