import { User } from '@/models/user.model';
import { IBaseRepository } from '@/db/interfaces/base.repository.interface';

export class UserService {
  constructor(private userRepo: IBaseRepository<User>) {}

  async findById(id: string): Promise<User | null> {
    return await this.userRepo.findById(id);
  }

  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return await this.userRepo.create(userData);
  }

  async update(id: string, updates: Partial<User>): Promise<User> {
    return await this.userRepo.update(id, updates);
  }

  async delete(id: string): Promise<void> {
    return await this.userRepo.delete(id);
  }
}
