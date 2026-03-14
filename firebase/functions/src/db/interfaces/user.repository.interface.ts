import { IBaseRepository } from "./base.repository.interface";
import { User, UserRole } from "../../models/user.model";

export interface IUserRepository extends IBaseRepository<User> {
  findByRole(role: UserRole): Promise<User[]>;
  findByPhone(phone: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
