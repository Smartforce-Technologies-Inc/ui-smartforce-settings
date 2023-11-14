import { SFPeopleOption } from 'sfui';

export interface ShiftArea {
  id: string;
  name: string;
}

export interface ShiftDate {
  datetime: string;
  timezone: string;
}

export interface ShiftRecurrence {
  frecuency: string;
  interval: number;
  days: string[];
  until?: ShiftDate;
}

export interface ShiftMember {
  id: string;
  name: string;
  avatar_thumbnail_url?: string;
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
  staff_min: number;
  members: ShiftMember[];
  supervisor?: ShiftMember;
  created_at: string;
  updated_at: string;
  created_by_user: string;
  updated_by_user: string;
}

export interface ShiftFormValue {
  name: string;
  acronym: string;
  start: { datetime: string | null };
  end: { datetime: string | null };
  recurrence: ShiftRecurrence;
  areas: SFPeopleOption[];
  members: SFPeopleOption[];
  supervisor?: SFPeopleOption;
  staff_min: string;
}
