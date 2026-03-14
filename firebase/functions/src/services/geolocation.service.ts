// CONTEXT: Database-agnostic geolocation service. Abstracts location-based
// queries so they work with any database (Firestore geohash, PostGIS, etc.).
// Services use this instead of calling repository geolocation methods directly.

import { Location } from "../models/provider.model";

export interface IGeolocationService {
  /**
   * Filter items by proximity to a location.
   * Works with any database - implementation handles the specifics.
   */
  filterByProximity<T>(
    items: T[],
    targetLocation: Location,
    radiusKm: number,
    getLocation: (item: T) => Location
  ): T[];

  /**
   * Calculate distance between two locations in kilometers.
   */
  calculateDistance(loc1: Location, loc2: Location): number;
}

export class GeolocationService implements IGeolocationService {
  filterByProximity<T>(
    items: T[],
    targetLocation: Location,
    radiusKm: number,
    getLocation: (item: T) => Location
  ): T[] {
    return items
      .map(item => ({
        item,
        distance: this.calculateDistance(targetLocation, getLocation(item))
      }))
      .filter(({ distance }) => distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance)
      .map(({ item }) => item);
  }

  calculateDistance(loc1: Location, loc2: Location): number {
    // Haversine formula - works with any database
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(loc2.lat - loc1.lat);
    const dLng = this.toRad(loc2.lng - loc1.lng);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(loc1.lat)) * Math.cos(this.toRad(loc2.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
