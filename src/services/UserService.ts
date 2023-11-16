import { IUserRepository } from "../interfaces/IUserRepository";
import { IUserService } from "../interfaces/IUserService";
import { User } from "@prisma/client";

type errorMessage = {
  erro: boolean;
  message: string;
};

export class UserService implements IUserService {
  constructor(private repository: IUserRepository) {}
  public async findAll(): Promise<User[]> {
    const users = await this.repository.findAll();
    return users;
  }
  public async findUnique(id: number): Promise<User> {
    const user = await this.repository.findUnique(id);
    return user;
  }
  public async create(
    name: string,
    age: number,
    isMen: boolean
  ): Promise<User | errorMessage> {
    const isExistentUser = await this.repository.findUserByName(name);
    if (isExistentUser) {
      const errorMessage: errorMessage = {
        erro: true,
        message: "Nome já está em uso, tente outro",
      };
      return errorMessage;
    }
    const createdUser = await this.repository.create(name, age, isMen);
    return createdUser;
  }
  public async update(
    id: number,
    name: string,
    age: number,
    isMen: boolean
  ): Promise<User | errorMessage> {
    const isExistentUser = await this.repository.findUnique(id);
    if (!isExistentUser) {
      const errorMessage: errorMessage = {
        erro: true,
        message: "Usuário não encontrado !",
      };
      return errorMessage;
    }
    const updatedUser = await this.repository.update(id, name, age, isMen);
    return updatedUser;
  }
  public async delete(id: number): Promise<User | errorMessage> {
    const isExistentUser = await this.repository.findUnique(id);
    if (!isExistentUser) {
      const errorMessage: errorMessage = {
        erro: true,
        message: "Usuário não encontrado !",
      };
      return errorMessage;
    }
    const deletedUser = await this.repository.delete(id);
    return deletedUser;
  }
}
