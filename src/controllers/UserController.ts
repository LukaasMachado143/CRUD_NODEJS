import { Request, Response } from "express";
import { prisma } from "../configs/db";
export default {
  async listAll(resquest: Request, response: Response) {
    try {
      const users = await prisma.user.findMany();
      return response.status(200).json({
        error: false,
        users,
      });
    } catch (error) {
      return response
        .status(500)
        .json({ error: true, message: `Erro: ${error.message}` });
    }
  },
  async create(resquest: Request, response: Response) {
    try {
      const { name, age, isMen } = resquest.body;
      const userExist = await prisma.user.findUnique({ where: { name } });
      if (userExist)
        return response.json({ message: "Nome já foi utilizado, tente outro" });

      const user = await prisma.user.create({ data: { name, age, isMen } });
      return response.status(201).json({
        error: false,
        message: "Usuário cadastrado com sucesso !",
        user,
      });
    } catch (error) {
      return response
        .status(500)
        .json({ error: true, message: `Erro: ${error.message}` });
    }
  },
  async update(resquest: Request, response: Response) {
    try {
      const { name, age, isMen } = resquest.body;
      const id = parseInt(resquest.params.id);
      const userExist = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!userExist)
        return response
          .status(404)
          .json({ message: "Usuário não encontrado !" });

      const user = await prisma.user.update({
        where: { id },
        data: { name, age, isMen },
      });
      return response.status(201).json({
        error: false,
        message: "Usuário atualizado com sucesso !",
        user,
      });
    } catch (error) {
      return response
        .status(500)
        .json({ error: true, message: `Erro: ${error.message}` });
    }
  },
  async delete(resquest: Request, response: Response) {
    try {
      const id = parseInt(resquest.params.id);
      const userExist = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!userExist)
        return response
          .status(404)
          .json({ message: "Usuário não encontrado !" });

      const user = await prisma.user.delete({
        where: { id },
      });
      return response.status(201).json({
        error: false,
        message: "Usuário deletado com sucesso !",
        user,
      });
    } catch (error) {
      return response
        .status(500)
        .json({ error: true, message: `Erro: ${error.message}` });
    }
  },
};
