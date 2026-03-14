import { FirebaseBaseRepository } from "./base.repository";
import { IProviderRepository } from "../interfaces/provider.repository.interface";
import { Provider, ServiceType, Location } from "../../models/provider.model";
import { COLLECTIONS } from "../../config/collections";
import { geohashForLocation, geohashQueryBounds, distanceBetween } from "geofire-common";

export class FirebaseProviderRepository extends FirebaseBaseRepository<Provider> implements IProviderRepository {
  constructor() {
    super(COLLECTIONS.PROVIDERS);
  }

  async findByUserId(userId: string): Promise<Provider | null> {
    const query = this.createQuery().where("userId", "==", userId).limit(1);
    const snapshot = await query.get();
    return snapshot.empty ? null : this.fromFirestore(snapshot.docs[0].data()) as Provider;
  }

  async findByService(service: ServiceType): Promise<Provider[]> {
    const query = this.createQuery().where("services", "array-contains", service);
    const snapshot = await query.get();
    return snapshot.docs.map(doc => this.fromFirestore(doc.data()) as Provider);
  }

  async findAvailable(): Promise<Provider[]> {
    const query = this.createQuery().where("available", "==", true);
    const snapshot = await query.get();
    return snapshot.docs.map(doc => this.fromFirestore(doc.data()) as Provider);
  }

  async findNearby(location: Location, radiusKm: number): Promise<Provider[]> {
    const bounds = geohashQueryBounds([location.lat, location.lng], radiusKm * 1000);
    const queries = bounds.map(([startHash, endHash]) => {
      return this.createQuery()
        .orderBy("geohash")
        .startAt(startHash)
        .endAt(endHash)
        .get();
    });

    const snapshots = await Promise.all(queries);
    const providers: Provider[] = [];

    for (const snap of snapshots) {
      for (const doc of snap.docs) {
        const provider = this.fromFirestore(doc.data()) as Provider;
        const distanceInKm = distanceBetween(
          [location.lat, location.lng],
          [provider.location.lat, provider.location.lng]
        );

        if (distanceInKm <= radiusKm) {
          providers.push(provider);
        }
      }
    }

    return providers.sort((a, b) => {
      const distA = distanceBetween([location.lat, location.lng], [a.location.lat, a.location.lng]);
      const distB = distanceBetween([location.lat, location.lng], [b.location.lat, b.location.lng]);
      return distA - distB;
    });
  }

  async findVerified(): Promise<Provider[]> {
    const query = this.createQuery().where("verified", "==", true);
    const snapshot = await query.get();
    return snapshot.docs.map(doc => this.fromFirestore(doc.data()) as Provider);
  }
}
