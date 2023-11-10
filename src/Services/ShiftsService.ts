import { Shift } from '../Models';

export const getShifts = (baseUrl: string): Promise<Shift[]> => {
  // TODO BE INTEGRATION
  // const url: string = `${baseUrl}/shifts/me`;
  // return apiGet<Shift[]>(url, getUserSession().access_token);
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve([]);
    }, 1500);
  });
};
