export type GeoLocationCoords = {
  latitude: number;
  longitude: number;
};

export interface LocationAddressType {
  full: string;
  main?: string;
  city?: string;
  state_id?: string;
  zip?: string;
  coords?: GeoLocationCoords;
}

export interface State {
  id: string;
  name: string;
  abbr: string;
  file_name: string;
  coords: GeoLocationCoords;
}

export interface LocationAreaType {
  id: string;
  name: string;
}

export interface LocationFormValueType {
  address: LocationAddressType;
  areas?: LocationAreaType[];
  details?: string;
  type: string;
}
