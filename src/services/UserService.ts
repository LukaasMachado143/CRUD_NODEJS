import { IUserRepository } from "../interfaces/IUserRepository";
import { IUserService } from "../interfaces/IUserService";
import { User } from "@prisma/client";
import { UserRepository } from "../repositories/UserRepository";

type errorMessage = {
  erro: boolean;
  message: string;
};

export class UserService implements IUserService {
  private _repository: IUserRepository
  constructor() {
    this._repository = new UserRepository();
  }
  public async findAll(): Promise<User[]> {
    const users = await this._repository.findAll();
    return users;
  }
  public async findUnique(id: number): Promise<User> {
    const user = await this._repository.findUnique(id);
    return user;
  }
  public async create(
    name: string,
    age: number,
    isMen: boolean
  ): Promise<User | errorMessage> {
    const isExistentUser = await this._repository.findUserByName(name);
    if (isExistentUser) {
      const errorMessage: errorMessage = {
        erro: true,
        message: "Nome já está em uso, tente outro",
      };
      return errorMessage;
    }
    const createdUser = await this._repository.create(name, age, isMen);
    return createdUser;
  }
  public async update(
    id: number,
    name: string,
    age: number,
    isMen: boolean
  ): Promise<User | errorMessage> {
    const isExistentUser = await this._repository.findUnique(id);
    if (!isExistentUser) {
      const errorMessage: errorMessage = {
        erro: true,
        message: "Usuário não encontrado !",
      };
      return errorMessage;
    }
    const updatedUser = await this._repository.update(id, name, age, isMen);
    return updatedUser;
  }
  public async delete(id: number): Promise<User | errorMessage> {
    const isExistentUser = await this._repository.findUnique(id);
    if (!isExistentUser) {
      const errorMessage: errorMessage = {
        erro: true,
        message: "Usuário não encontrado !",
      };
      return errorMessage;
    }
    const deletedUser = await this._repository.delete(id);
    return deletedUser;
  }
}
