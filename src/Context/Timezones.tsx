import React, { FC } from 'react';
import { Timezone } from '../Models/Timezone';

export type TimezonesContextState = {
  timezones: Timezone[];
  setTimezones: React.Dispatch<React.SetStateAction<Timezone[]>>;
};

const contextDefaultValues: TimezonesContextState = {
  timezones: [],
  setTimezones: () => {}
};

export const TimezonesContext =
  React.createContext<TimezonesContextState>(contextDefaultValues);

export const TimezonesProvider: FC = ({ children }) => {
  const [timezones, setTimezones] = React.useState<Timezone[]>([]);

  return (
    <TimezonesContext.Provider
      value={{
        timezones,
        setTimezones
      }}
    >
      {children}
    </TimezonesContext.Provider>
  );
};
