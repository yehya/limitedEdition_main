import { IBaseRepository } from "./base.repository.interface";
import { Provider, ServiceType, Location } from "../../models/provider.model";

export interface IProviderRepository extends IBaseRepository<Provider> {
  findByUserId(userId: string): Promise<Provider | null>;
  findByService(service: ServiceType): Promise<Provider[]>;
  findAvailable(): Promise<Provider[]>;
  findNearby(location: Location, radiusKm: number): Promise<Provider[]>;
  findVerified(): Promise<Provider[]>;
}
