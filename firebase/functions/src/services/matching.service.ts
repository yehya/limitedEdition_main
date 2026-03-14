// CONTEXT: Provider matching service. Uses geolocation service for
// database-agnostic distance filtering. No database-specific logic here.

import { IProviderRepository } from "../db/interfaces/provider.repository.interface";
import { Provider, ServiceType, Location } from "../models/provider.model";
import { HttpsError } from "firebase-functions/v2/https";
import { GeolocationService } from "./geolocation.service";

export class MatchingService {
  private geoService: GeolocationService;

  constructor(private providerRepo: IProviderRepository) {
    this.geoService = new GeolocationService();
  }

  async findBestProvider(
    service: ServiceType,
    location: Location,
    radiusKm: number = 10
  ): Promise<Provider> {
    // Get all providers with the required service
    const allProviders = await this.providerRepo.findByService(service);
    
    // Filter by distance using database-agnostic geolocation service
    const nearbyProviders = this.geoService.filterByProximity(
      allProviders,
      location,
      radiusKm,
      (provider) => provider.location
    );
    
    // Filter by availability and verification
    const qualified = nearbyProviders.filter(p => p.available && p.verified);

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
    // Get all providers with the required service
    const allProviders = await this.providerRepo.findByService(service);
    
    // Filter by distance using database-agnostic geolocation service
    const nearbyProviders = this.geoService.filterByProximity(
      allProviders,
      location,
      radiusKm,
      (provider) => provider.location
    );
    
    // Filter by availability and verification
    const qualified = nearbyProviders.filter(p => p.available && p.verified);

    // Sort by rating, then by total jobs
    qualified.sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.totalJobs - a.totalJobs;
    });

    return qualified.slice(0, limit);
  }
}
