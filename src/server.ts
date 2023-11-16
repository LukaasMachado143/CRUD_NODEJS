import Express from "express";
import UserController from "./controllers/UserController";

const app = Express();
app.use(Express.json());

const PORT = 8000;
app.get("/", (req, res) => {
  return res.send({ message: "Hello World" });
});

app.get("/listAllUser", UserController.listAll);
app.post("/createUser", UserController.create);
app.put("/updateUser/:id", UserController.update);
app.delete("/deleteUser/:id", UserController.delete);

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
