import { IProviderRepository } from "../db/interfaces/provider.repository.interface";
import { Provider, ServiceType, Location } from "../models/provider.model";
import { HttpsError } from "firebase-functions/v2/https";

export class MatchingService {
  constructor(private providerRepo: IProviderRepository) {}

  async findBestProvider(
    service: ServiceType,
    location: Location,
    radiusKm: number = 10
  ): Promise<Provider> {
    const providers = await this.providerRepo.findNearby(location, radiusKm);
    
    const qualified = providers.filter(p => 
      p.services.includes(service) &&
      p.available &&
      p.verified
    );

    if (qualified.length === 0) {
      throw new HttpsError("not-found", "No available providers found");
    }

    // Sort by rating, then by total jobs
    qualified.sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.totalJobs - a.totalJobs;
    });

    return qualified[0];
  }

  async findAvailableProviders(
    service: ServiceType,
    location: Location,
    radiusKm: number = 10,
    limit: number = 5
  ): Promise<Provider[]> {
    const providers = await this.providerRepo.findNearby(location, radiusKm);
    
    const qualified = providers.filter(p => 
      p.services.includes(service) &&
      p.available &&
      p.verified
    );

    qualified.sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.totalJobs - a.totalJobs;
    });

    return qualified.slice(0, limit);
  }
}
