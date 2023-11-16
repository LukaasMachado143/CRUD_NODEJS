import { Router, Request, Response } from "express";
import { IUserService } from "../interfaces/IUserService";

export class UserController {
  constructor(private service: IUserService) {}

  public configureRoutes(): Router {
    const router = Router();

    router.get("/", async (request: Request, response: Response) => {
      try {
        const users = await this.service.findAll();
        return response.json(users);
      } catch (error) {
        console.error(error);
        response
          .status(500)
          .json({ error: true, message: "Erro ao buscar usuários" });
      }
    });

    router.post("/", async (request: Request, response: Response) => {
      try {
        const { name, age, isMen } = request.body;
        const createdUser = await this.service.create(name, age, isMen);
        const statusCode = "erro" in createdUser ? 200 : 201;
        return response.status(statusCode).json(createdUser);
      } catch (error) {
        console.error(error);
        response
          .status(500)
          .json({ error: true, message: "Erro ao cadastrar usuário" });
      }
    });

    router.put("/:id", async (request: Request, response: Response) => {
      try {
        const { name, age, isMen } = request.body;
        const id = parseInt(request.params.id);
        const updatedUser = await this.service.update(id, name, age, isMen);
        return response.json(updatedUser);
      } catch (error) {
        console.error(error);
        response
          .status(500)
          .json({ error: true, message: "Erro ao atualizar usuário" });
      }
    });

    router.delete("/:id", async (request: Request, response: Response) => {
      try {
        const id = parseInt(request.params.id);
        const deletedUser = await this.service.delete(id);
        return response.json(deletedUser);
      } catch (error) {
        console.error(error);
        response
          .status(500)
          .json({ error: true, message: "Erro ao atualizar usuário" });
      }
    });

    return router;
  }
}
