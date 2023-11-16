import { User } from "@prisma/client";
type errorMessage = {
  erro: boolean;
  message: string;
};
export interface IUserService {
  findAll(): Promise<User[]>;
  findUnique(id: number): Promise<User>;
  create(
    name: string,
    age: number,
    isMen: boolean
  ): Promise<User | errorMessage>;
  update(
    id: number,
    name: string,
    age: number,
    isMen: boolean
  ): Promise<User | errorMessage>;
  delete(id: number): Promise<User | errorMessage>;
}
