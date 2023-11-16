import { User } from "@prisma/client";

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findUnique(id: number): Promise<User>;
  findUserByName(name: string): Promise<User>;
  create(name: string, age: number, isMen: boolean): Promise<User>;
  update(id: number, name: string, age: number, isMen: boolean): Promise<User>;
  delete(id: number): Promise<User>;
}
