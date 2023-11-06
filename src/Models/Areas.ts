export interface AreaFormValue {
  name: string;
  acronym: string;
}

export interface Area {
  id: string;
  agency_id: string;
  name: string;
  acronym: string;
  paths: google.maps.LatLngLiteral[];
  created_at: string;
  updated_at?: string;
  created_by_user: string;
  updated_by_user?: number;
}
