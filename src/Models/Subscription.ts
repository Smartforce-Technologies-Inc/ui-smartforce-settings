import { ApplicationProduct } from './Apps';

export type BillingCycleType = 'monthly' | 'annually';

export interface SubscriptionPaymentCard {
  name: string;
  brand: string;
  last_4_digits: string;
  exp_month: number;
  exp_year: number;
}

export interface SubscriptionPayment {
  method: string;
  card: SubscriptionPaymentCard | null;
}

export type SubscriptionPlan = 'basic' | 'connect' | 'analytics' | 'schedule';
export type SubscriptionStatus =
  | 'Active'
  | 'Incomplete'
  | 'Unpaid'
  | 'Canceled';

export interface Subscription {
  id: string;
  created_at: string;
  status: SubscriptionStatus;
  product: ApplicationProduct;
  plan: SubscriptionPlan;
  triggered_by_user: string;
  total_seats_paid: number;
  total_seats_used: number;
  total_seats_billed: number;
  payment: SubscriptionPayment | null;
  billing_cycle: BillingCycleType;
  start_date: string;
  end_date: string;
  renew: boolean;
}

export interface BillingDetailsValue {
  full_name: string;
  phone: string;
  full_address: string;
}

export interface ContactDetailsValue {
  owner_name: string;
  owner_email: string;
  phone: string;
  agency_name: string;
}

export interface SubscriptionValue {
  plan?: string;
  card_token: string;
  additional_seats: number;
  billing_cycle: BillingCycleType;
  billing_details: BillingDetailsValue;
  product: ApplicationProduct;
}

export interface ContactSalesValue
  extends Omit<ContactDetailsValue, 'agency_name'> {
  plan: string;
  product: ApplicationProduct;
  payment_method: string;
  additional_seats: number;
}
