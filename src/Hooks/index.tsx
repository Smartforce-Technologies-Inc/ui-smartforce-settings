import { useCallback, useContext, useEffect, useRef } from 'react';
import { SubscriptionContext } from '../Context';
import { getAppSubscription } from '../Helpers';
import { Subscription } from '../Models';

export function useSubscription(product: string): Subscription | undefined {
  const subscriptions = useContext(SubscriptionContext).subscriptions;

  return getAppSubscription(subscriptions, product);
}

export function useIsMounted(): () => boolean {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
}
