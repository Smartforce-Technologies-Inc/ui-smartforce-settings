export interface AgencyEvent {
  name: string;
  color: string;
}

export interface AgencyEventTypeResponse {
  id: number;
  agency_id: number;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
  created_by_user: string;
  updated_by_user: string;
}
