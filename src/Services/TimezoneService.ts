import { apiGet } from '../Helpers';
import { Timezone } from '../Models/Timezone';
import { getUserSession } from './AuthService';

export const getTimezones = async (baseUrl: string): Promise<Timezone[]> => {
  const url: string = `${baseUrl}/timezones`;
  return apiGet<{ data: Timezone[] }>(url, getUserSession().access_token).then(
    (r) => r.data
  );
};
