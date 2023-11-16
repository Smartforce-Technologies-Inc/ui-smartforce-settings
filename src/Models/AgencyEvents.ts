export interface AgencyEvent {
  name: string;
  color: string;
}

export interface AgencyEventType {
  id: string;
  agency_id: string;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
  created_by_user: string;
  updated_by_user: string;
}
