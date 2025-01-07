export interface ProviderData {
  bathrooms: number;
  bedrooms: number;
  lastSalePrice: number;
  lotSize: number;
  propertyType: string;
  roomCount: number;
  septicSystem: boolean;
  squareFootage: number;
  yearBuilt: number;
  [key: string]: string | number | boolean;
}
