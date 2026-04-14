export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  latitude: number;
  longitude: number;
  distanceMeters: number;
  address: string;
  isOpenLabel: string;
  phone?: string;
  website?: string;
};
