import Express from "express";

const app = Express();
app.use(Express.json());

const PORT = 8000;
app.get("/", (req, res) => {
  return res.send({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
