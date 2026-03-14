import { BaseModel } from "./base.model";

export type ServiceType = "plumbing" | "electrical" | "cleaning" | "ac_hvac" | "painting" | "handyman" | "pest_control" | "carpentry";

export interface Location {
  lat: number;
  lng: number;
}

export interface Provider extends BaseModel {
  userId: string;
  services: ServiceType[];
  rating: number;
  totalJobs: number;
  available: boolean;
  location: Location;
  verified: boolean;
}
