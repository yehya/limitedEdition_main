import { FirebaseBaseRepository } from "./base.repository";
import { IUserRepository } from "../interfaces/user.repository.interface";
import { User, UserRole } from "../../models/user.model";
import { COLLECTIONS } from "../../config/collections";

export class FirebaseUserRepository extends FirebaseBaseRepository<User> implements IUserRepository {
  constructor() {
    super(COLLECTIONS.USERS);
  }

  async findByRole(role: UserRole): Promise<User[]> {
    const query = this.createQuery().where("role", "==", role);
    const snapshot = await query.get();
    return snapshot.docs.map(doc => this.fromFirestore(doc.data()) as User);
  }

  async findByPhone(phone: string): Promise<User | null> {
    const query = this.createQuery().where("phone", "==", phone).limit(1);
    const snapshot = await query.get();
    return snapshot.empty ? null : this.fromFirestore(snapshot.docs[0].data()) as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = this.createQuery().where("email", "==", email).limit(1);
    const snapshot = await query.get();
    return snapshot.empty ? null : this.fromFirestore(snapshot.docs[0].data()) as User;
  }
}
