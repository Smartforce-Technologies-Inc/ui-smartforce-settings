import { SFPeopleOption } from 'sfui';
import { User } from './User';

export type DateRange = {
  dateFrom?: string;
  dateTo?: string;
  exactDate?: boolean;
};

export type NumberRange = {
  from?: number;
  to?: number;
};

export interface PeoplePickerUserType
  extends Omit<User, 'agency_name' | 'is_active' | 'password' | 'height'> {
  id: string;
  age?: number;
  height_ft?: number;
  height_in?: number;
  years_of_service?: number;
}

export interface PeoplePickerValueType extends SFPeopleOption {
  asyncObject?: PeoplePickerUserType;
}
