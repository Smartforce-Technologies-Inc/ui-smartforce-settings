import React, { FC } from 'react';
import { State } from '../Models';

export type StatesListConfig = {
  statesList: State[];
  setStatesList: React.Dispatch<React.SetStateAction<State[]>>;
};

const contextDefaultValues: StatesListConfig = {
  statesList: [],
  setStatesList: () => {}
};

export const StatesListConfigContext =
  React.createContext<StatesListConfig>(contextDefaultValues);

export const StatesListConfigProvider: FC = ({ children }) => {
  const [statesList, setStatesList] = React.useState<State[]>([]);

  return (
    <StatesListConfigContext.Provider
      value={{
        statesList,
        setStatesList
      }}
    >
      {children}
    </StatesListConfigContext.Provider>
  );
};
