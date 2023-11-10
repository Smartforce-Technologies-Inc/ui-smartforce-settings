export interface IdNameValue {
  id: string;
  name: string;
}

export interface Shift {
  title: string;
  acronym: string;
  status: 'Active' | 'Inactive';
  updated_at: string;
  area?: IdNameValue[];
  start_date: string;
  end_date: string;
  repeat: {
    frecuency: string;
    every_on: number;
    days: string[];
  };
  minimun_staffing: number;
  members: IdNameValue[];
  supervisor?: IdNameValue;
}
