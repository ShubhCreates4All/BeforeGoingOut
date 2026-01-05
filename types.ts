export interface WeatherData {
  temp: number;
  condition: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  isDay: boolean;
}

export interface OutfitItem {
  category: string;
  item: string;
  reason: string;
  iconType: 'head' | 'body' | 'outer' | 'legs' | 'feet' | 'accessory';
}

export interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
}

export interface DashboardData {
  weather: WeatherData;
  outfit: OutfitItem[];
  shop: Product[];
}

export type Timeframe = 'Today' | 'Tomorrow';
export type LocationMode = 'GPS' | 'Travel';
export type UnitSystem = 'imperial' | 'metric';

export type Gender = 'Male' | 'Female' | 'Unisex';
export type AgeGroup = 'Teen' | 'Young Adult (20s)' | 'Adult (30s-40s)' | 'Senior (50+)';
export type FashionStyle = 'Casual' | 'Smart Casual' | 'Streetwear' | 'Sporty' | 'Minimalist' | 'Formal';

export interface UserProfile {
  gender: Gender;
  ageGroup: AgeGroup;
  style: FashionStyle;
  unitSystem: UnitSystem;
}

export interface LocationState {
  mode: LocationMode;
  city: string;
  coords: { lat: number; lng: number } | null;
}