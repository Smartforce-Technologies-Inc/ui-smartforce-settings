import React, { FC } from 'react';
import { BusinessCardSettings, User } from '../Models';

export type UserContextState = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isOnboarding: boolean;
  setIsOnboarding: React.Dispatch<React.SetStateAction<boolean>>;
  businessCardSettings: BusinessCardSettings | undefined;
  setBusinessCardSettings: React.Dispatch<
    React.SetStateAction<BusinessCardSettings | undefined>
  >;
};

const contextDefaultValues: UserContextState = {
  user: undefined,
  setUser: () => {},
  isOnboarding: false,
  setIsOnboarding: () => {},
  businessCardSettings: undefined,
  setBusinessCardSettings: () => {}
};

export const UserContext =
  React.createContext<UserContextState>(contextDefaultValues);

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = React.useState<User>();
  const [isOnboarding, setIsOnboarding] = React.useState<boolean>(false);
  const [businessCardSettings, setBusinessCardSettings] =
    React.useState<BusinessCardSettings>();

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isOnboarding,
        setIsOnboarding,
        businessCardSettings,
        setBusinessCardSettings
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
