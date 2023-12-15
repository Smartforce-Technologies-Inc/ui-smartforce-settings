import { createContext } from 'react';

export interface ApiContextProps {
  settings: string;
  shifts: string;
}

export const ApiContext = createContext<ApiContextProps>({
  settings: '',
  shifts: ''
});
