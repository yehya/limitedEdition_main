// CONTEXT: Firebase implementation of job repository. Uses query builder
// for database-agnostic queries. No Firestore types exposed.

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
    return this.query()
      .where("customerId", "==", customerId)
      .execute();
  }

  async findByProviderId(providerId: string): Promise<Job[]> {
    return this.query()
      .where("providerId", "==", providerId)
      .execute();
  }

  async findByStatus(status: JobStatus): Promise<Job[]> {
    return this.query()
      .where("status", "==", status)
      .execute();
  }

  async findByService(service: ServiceType): Promise<Job[]> {
    return this.query()
      .where("service", "==", service)
      .execute();
  }

  async findPendingJobs(): Promise<Job[]> {
    return this.query()
      .where("status", "in", ["pending", "matching"])
      .orderBy("createdAt", "desc")
      .execute();
  }
}
