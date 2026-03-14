import { IUserRepository } from "../db/interfaces/user.repository.interface";
import { User, UserRole } from "../models/user.model";
import { HttpsError } from "firebase-functions/v2/https";

export class UserService {
  constructor(private userRepo: IUserRepository) {}

  async createUser(data: {
    id: string;
    role: UserRole;
    name: string;
    phone: string;
    email?: string;
  }): Promise<User> {
    const existing = await this.userRepo.findById(data.id);
    if (existing) {
      throw new HttpsError("already-exists", "User already exists");
    }

    return this.userRepo.create({
      ...data,
      isAdmin: false,
    }, data.id);
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new HttpsError("not-found", "User not found");
    }
    return user;
  }

  async getUserByPhone(phone: string): Promise<User | null> {
    return this.userRepo.findByPhone(phone);
  }

  async updateUser(userId: string, data: Partial<User>): Promise<User> {
    const user = await this.getUserById(userId);
    return this.userRepo.update(user.id, data);
  }
}
