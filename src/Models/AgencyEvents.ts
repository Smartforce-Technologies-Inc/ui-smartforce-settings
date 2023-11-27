export interface AgencyEvent {
  name: string;
  color: string;
}

export interface AgencyEventTypeBasic {
  id: string;
  name: string;
  color: string;
}

export interface AgencyEventType extends AgencyEventTypeBasic {
  agency_id: string;
  created_at: string;
  updated_at: string;
  created_by_user: string;
  updated_by_user: string;
}
