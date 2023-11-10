import React, { FC } from 'react';
import { AgencyEvent } from '../Models';

export type AgencyEventsContextState = {
  events: AgencyEvent[];
  setEvents: React.Dispatch<React.SetStateAction<AgencyEvent[]>>;
};

const contextDefaultValues: AgencyEventsContextState = {
  events: [],
  setEvents: () => {}
};

export const AgencyEventsContext =
  React.createContext<AgencyEventsContextState>(contextDefaultValues);

export const AgencyEventsProvider: FC = ({ children }) => {
  const [events, setEvents] = React.useState<AgencyEvent[]>([]);

  return (
    <AgencyEventsContext.Provider
      value={{
        events,
        setEvents
      }}
    >
      {children}
    </AgencyEventsContext.Provider>
  );
};
