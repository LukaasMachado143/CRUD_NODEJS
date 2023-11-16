import { prisma } from "../configs/db";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "@prisma/client";
export class UserRepository implements IUserRepository {
  public async findUserByName(name: string): Promise<User> {
    const user = prisma.user.findUnique({ where: { name } });
    return user;
  }
  public async findAll(): Promise<User[]> {
    const users = prisma.user.findMany();
    return users;
  }
  public async findUnique(id: number): Promise<User> {
    const user = prisma.user.findUnique({ where: { id } });
    return user;
  }
  public async update(
    id: number,
    name: string,
    age: number,
    isMen: boolean
  ): Promise<User> {
    const updatedUser = prisma.user.update({
      where: { id },
      data: {
        name,
        age,
        isMen,
      },
    });
    return updatedUser;
  }
  public async delete(id: number): Promise<User> {
    const deletedUser = prisma.user.delete({ where: { id } });
    return deletedUser;
  }
  public async create(
    name: string,
    age: number,
    isMen: boolean
  ): Promise<User> {
    const user = await prisma.user.create({ data: { name, age, isMen } });
    return user;
  }
}
