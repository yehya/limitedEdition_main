import { BaseModel } from "./base.model";

export interface Address {
  label: string;
  lat: number;
  lng: number;
  formatted: string;
}

export interface Customer extends BaseModel {
  userId: string;
  addresses: Address[];
  defaultAddress?: string;
  abTestGroup: "A" | "B";
}
