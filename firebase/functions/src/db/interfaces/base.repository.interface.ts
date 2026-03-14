import { BaseModel } from "../../models/base.model";

export interface IBaseRepository<T extends BaseModel> {
  create(data: Omit<T, keyof BaseModel>, id?: string): Promise<T>;
  update(id: string, data: Partial<Omit<T, keyof BaseModel>>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findMany(filters: Partial<T>): Promise<T[]>;
  delete(id: string): Promise<void>;
}
