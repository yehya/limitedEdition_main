// CONTEXT: Firebase implementation of provider repository. Uses query builder
// for database-agnostic queries. Geolocation filtering moved to service layer
// to avoid Firestore-specific geohash coupling.

import { FirebaseBaseRepository } from "./base.repository";
import { IProviderRepository } from "../interfaces/provider.repository.interface";
import { Provider, ServiceType, Location } from "../../models/provider.model";
import { COLLECTIONS } from "../../config/collections";

export class FirebaseProviderRepository extends FirebaseBaseRepository<Provider> implements IProviderRepository {
  constructor() {
    super(COLLECTIONS.PROVIDERS);
  }

  async findByUserId(userId: string): Promise<Provider | null> {
    return this.query()
      .where("userId", "==", userId)
      .executeOne();
  }

  async findByService(service: ServiceType): Promise<Provider[]> {
    return this.query()
      .where("services", "array-contains", service)
      .execute();
  }

  async findAvailable(): Promise<Provider[]> {
    return this.query()
      .where("available", "==", true)
      .execute();
  }

  async findNearby(location: Location, radiusKm: number): Promise<Provider[]> {
    // CONTEXT: Fetch all available providers, then filter by distance in service layer.
    // This is database-agnostic. For optimization with large datasets, implement
    // database-specific geospatial queries in separate repository implementations.
    // Firestore: use geohash queries
    // Supabase: use PostGIS ST_DWithin
    const allProviders = await this.findAvailable();
    
    // Return all providers - service layer will filter by distance
    // This keeps repository database-agnostic
    return allProviders;
  }

  async findVerified(): Promise<Provider[]> {
    return this.query()
      .where("verified", "==", true)
      .execute();
  }
}
