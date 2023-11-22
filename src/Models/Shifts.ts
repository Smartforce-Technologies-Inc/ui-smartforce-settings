import { SFPeopleOption } from 'sfui';
import { DateTimeValue } from '../Components';

export interface ShiftArea {
  id: string;
  name: string;
}

export interface ShiftDate {
  datetime: string;
  timezone: string;
}

export interface ShiftRecurrence {
  frequency: string;
  interval: number;
  days: string[];
  until?: ShiftDate;
}

export interface ShiftMember {
  id: string;
  name: string;
  avatar_thumbnail_url?: string;
}

export interface ShiftListItem {
  id: string;
  agency_id: string;
  name: string;
  acronym: string;
  areas: string[];
  start: ShiftDate;
  end: ShiftDate;
  recurrence: ShiftRecurrence;
  min_staff: number;
  members: string[];
  supervisor?: string;
  created_at: string;
  updated_at: string;
  created_by_user: string;
  updated_by_user: string;
}

export interface Shift {
  id: string;
  agency_id: string;
  name: string;
  acronym: string;
  areas?: ShiftArea[];
  start: ShiftDate;
  end: ShiftDate;
  recurrence: ShiftRecurrence;
  min_staff: number;
  participants: ShiftMember[];
  supervisor?: ShiftMember;
  created_at: string;
  updated_at: string;
  created_by_user: string;
  updated_by_user: string;
}

export interface ShiftFormValue {
  name: string;
  acronym: string;
  start: DateTimeValue;
  end: DateTimeValue;
  recurrence: ShiftRecurrence;
  areas: SFPeopleOption[];
  participants: SFPeopleOption[];
  supervisor?: SFPeopleOption;
  min_staff: string;
}

export interface ShiftRequestDate {
  datetime: string;
}

export interface ShiftRequestRecurrence extends Omit<ShiftRecurrence, 'until'> {
  until: ShiftRequestDate;
}

export interface ShiftRequest {
  name: string;
  acronym: string;
  areas: ShiftArea[];
  start: ShiftRequestDate;
  end: ShiftRequestDate;
  recurrence: ShiftRecurrence;
  participants: ShiftMember[];
  supervisor: ShiftMember | undefined | null;
  min_staff: string;
}
