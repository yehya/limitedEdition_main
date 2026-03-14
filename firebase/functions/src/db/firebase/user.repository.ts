// CONTEXT: Firebase implementation of user repository. Uses query builder
// for database-agnostic queries. No Firestore types exposed.

import { FirebaseBaseRepository } from "./base.repository";
import { IUserRepository } from "../interfaces/user.repository.interface";
import { User, UserRole } from "../../models/user.model";
import { COLLECTIONS } from "../../config/collections";

export class FirebaseUserRepository extends FirebaseBaseRepository<User> implements IUserRepository {
  constructor() {
    super(COLLECTIONS.USERS);
  }

  async findByRole(role: UserRole): Promise<User[]> {
    return this.query()
      .where("role", "==", role)
      .execute();
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.query()
      .where("phone", "==", phone)
      .executeOne();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.query()
      .where("email", "==", email)
      .executeOne();
  }
}
