import {
  PLAN_ENGAGE,
  PLAN_ANALYTICS,
  PLAN_CONNECT,
  ANNUALLY_FEE_ANALYTICS_COLORADO,
  MONTHLY_FEE_ANALYTICS_COLORADO,
  ANNUALLY_FEE_ENGAGE,
  ANNUALLY_FEE_ANALYTICS,
  MONTHLY_FEE_ENGAGE,
  MONTHLY_FEE_ANALYTICS,
  PLAN_SCHEDULE,
  ANNUALLY_FEE_SCHEDULE,
  MONTHLY_FEE_SCHEDULE
} from '../Constants';
import { BillingCycleType, Customer, Subscription } from '../Models';
import { upperFirstChar } from './format';
import { isColorado } from './states';

export function isPlanConnect(plan?: string): boolean {
  return plan === PLAN_CONNECT;
}

export function isPlanEngage(plan?: string): boolean {
  return plan === PLAN_ENGAGE;
}

export function isPlanAnalytics(plan?: string): boolean {
  return plan === PLAN_ANALYTICS;
}

export function isPlanSchedule(plan?: string): boolean {
  return plan === PLAN_SCHEDULE;
}

export function getPlanLabel(plan: string): string {
  if (isPlanEngage(plan)) {
    return 'Engage';
  }

  return upperFirstChar(plan);
}

export function isFreeCustomer(
  customer: Customer | undefined,
  plan: string | undefined
): boolean {
  return (
    isPlanConnect(plan) ||
    (isColorado(customer?.state_name) && isPlanEngage(plan))
  );
}

export function getInvoiceAmmount(
  isColorado: boolean,
  plan: string,
  billCycle: BillingCycleType,
  seats: number
): number {
  if (plan === PLAN_CONNECT) return 0;

  if (plan === PLAN_SCHEDULE) {
    if (billCycle === 'annually') {
      return ANNUALLY_FEE_SCHEDULE * seats;
    }

    return MONTHLY_FEE_SCHEDULE * seats;
  }

  if (isColorado) {
    if (plan === PLAN_ENGAGE) return 0;

    if (billCycle === 'annually') {
      return ANNUALLY_FEE_ANALYTICS_COLORADO * seats;
    }

    return MONTHLY_FEE_ANALYTICS_COLORADO * seats;
  }

  if (billCycle === 'annually') {
    return plan === PLAN_ENGAGE
      ? ANNUALLY_FEE_ENGAGE * seats
      : ANNUALLY_FEE_ANALYTICS * seats;
  }

  return plan === PLAN_ENGAGE
    ? MONTHLY_FEE_ENGAGE * seats
    : MONTHLY_FEE_ANALYTICS * seats;
}

export const getAppSubscription = (
  subscriptions: Subscription[],
  appName: string
): Subscription | undefined => {
  return subscriptions.find(
    (subscription: Subscription) => subscription.product === appName
  );
};
