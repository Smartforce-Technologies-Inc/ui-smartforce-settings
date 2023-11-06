import React, { FC } from 'react';
import { Customer } from '../Models';

export type CustomerContextState = {
  customer: Customer | undefined;
  setCustomer: React.Dispatch<React.SetStateAction<Customer | undefined>>;
};

const contextDefaultValues: CustomerContextState = {
  customer: undefined,
  setCustomer: () => {}
};

export const CustomerContext =
  React.createContext<CustomerContextState>(contextDefaultValues);

export const CustomerProvider: FC = ({ children }) => {
  const [customer, setCustomer] = React.useState<Customer>();

  return (
    <CustomerContext.Provider
      value={{
        customer,
        setCustomer
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
