export interface IdNameValue {
  id: string;
  name: string;
}

export interface ShiftRepeat {
  frecuency: string;
  every_on: number;
  days: string[];
}

export interface Shift {
  id: string;
  title: string;
  acronym: string;
  status: 'Active' | 'Inactive';
  updated_at: string;
  area?: IdNameValue[];
  start_date: string;
  end_date: string;
  repeat: ShiftRepeat;
  minimun_staffing: number;
  members: IdNameValue[];
  supervisor?: IdNameValue;
}
