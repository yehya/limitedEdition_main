import { FirebaseBaseRepository } from "./base.repository";
import { IJobRepository } from "../interfaces/job.repository.interface";
import { Job, JobStatus } from "../../models/job.model";
import { ServiceType } from "../../models/provider.model";
import { COLLECTIONS } from "../../config/collections";

export class FirebaseJobRepository extends FirebaseBaseRepository<Job> implements IJobRepository {
  constructor() {
    super(COLLECTIONS.JOBS);
  }

  async findByCustomerId(customerId: string): Promise<Job[]> {
    const query = this.createQuery().where("customerId", "==", customerId);
    const snapshot = await query.get();
    return snapshot.docs.map(doc => this.fromFirestore(doc.data()) as Job);
  }

  async findByProviderId(providerId: string): Promise<Job[]> {
    const query = this.createQuery().where("providerId", "==", providerId);
    const snapshot = await query.get();
    return snapshot.docs.map(doc => this.fromFirestore(doc.data()) as Job);
  }

  async findByStatus(status: JobStatus): Promise<Job[]> {
    const query = this.createQuery().where("status", "==", status);
    const snapshot = await query.get();
    return snapshot.docs.map(doc => this.fromFirestore(doc.data()) as Job);
  }

  async findByService(service: ServiceType): Promise<Job[]> {
    const query = this.createQuery().where("service", "==", service);
    const snapshot = await query.get();
    return snapshot.docs.map(doc => this.fromFirestore(doc.data()) as Job);
  }

  async findPendingJobs(): Promise<Job[]> {
    const query = this.createQuery()
      .where("status", "in", ["pending", "matching"])
      .orderBy("createdAt", "desc");
    const snapshot = await query.get();
    return snapshot.docs.map(doc => this.fromFirestore(doc.data()) as Job);
  }
}
