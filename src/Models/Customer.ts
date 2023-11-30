import { LocationAddressType } from './Geographic';
import { MemberRole } from './Member';

export type CustomerStatus =
  | 'Active'
  | 'Inactive'
  | 'Pending'
  | 'Canceled'
  | 'Paused';

export interface Customer {
  address?: LocationAddressType | null;
  badge?: string | null;
  email?: string | null;
  full_name: string | null;
  has_analytics: boolean;
  id: string;
  is_active: boolean;
  name: string;
  ori: string;
  owner_email: string;
  phone1: string;
  phone2?: string | null;
  roles?: MemberRole[];
  short_name?: string | null;
  state_name: string;
  status: CustomerStatus;
  unit?: string | null;
  website?: string | null;
  timezone: string;
}
