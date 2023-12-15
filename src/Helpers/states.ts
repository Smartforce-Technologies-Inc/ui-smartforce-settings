import { GeoLocationCoords, State } from '../Models';
import { COLORADO_STATE } from '../Constants';

export const getStateFileName = (statesList: State[], name: string): string => {
  return statesList?.find(
    (state) => state.name.toLowerCase() === name.toLowerCase()
  )?.file_name as string;
};

export const getStateCoords = (
  statesList: State[],
  name: string
): GeoLocationCoords => {
  const state = statesList.find(
    (state) => state.name.toLowerCase() === name.toLowerCase()
  ) as State;

  return state.coords;
};

export function isColorado(name: string | undefined): boolean {
  return name === COLORADO_STATE;
}
