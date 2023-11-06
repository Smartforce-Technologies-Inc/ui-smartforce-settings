import { useContext } from 'react';
import { SubscriptionContext } from '../Context';
import { getAppSubscription } from '../Helpers';
import { Subscription } from '../Models';

export function useSubscription(product: string): Subscription | undefined {
  const subscriptions = useContext(SubscriptionContext).subscriptions;

  return getAppSubscription(subscriptions, product);
}
