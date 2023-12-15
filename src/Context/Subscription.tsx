import React, { FC } from 'react';
import { Subscription } from '../Models';

export type SubscriptionContextState = {
  subscriptions: Subscription[];
  setSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>;
};

const contextDefaultValues: SubscriptionContextState = {
  subscriptions: [],
  setSubscriptions: () => {}
};

export const SubscriptionContext =
  React.createContext<SubscriptionContextState>(contextDefaultValues);

export const SubscriptionProvider: FC = ({ children }) => {
  const [subscriptions, setSubscriptions] = React.useState<Subscription[]>([]);

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        setSubscriptions
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
