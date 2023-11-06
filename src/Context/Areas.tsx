import React, { FC } from 'react';
import { Area } from '../Models';

export type AreasContextState = {
  areas: Area[];
  setAreas: React.Dispatch<React.SetStateAction<Area[]>>;
};

const contextDefaultValues: AreasContextState = {
  areas: [],
  setAreas: () => {}
};

export const AreasContext =
  React.createContext<AreasContextState>(contextDefaultValues);

export const AreasProvider: FC = ({ children }) => {
  const [areas, setAreas] = React.useState<Area[]>([]);

  return (
    <AreasContext.Provider
      value={{
        areas,
        setAreas
      }}
    >
      {children}
    </AreasContext.Provider>
  );
};
