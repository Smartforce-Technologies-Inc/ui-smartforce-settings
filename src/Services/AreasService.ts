import { getUserSession } from './AuthService';
import { apiGet } from '../Helpers';
import { Area } from '../Models/Areas';

export const getAreas = async (baseUrl: string): Promise<Area[]> => {
  const url: string = `${baseUrl}/agencies/me/areas`;

  return apiGet(url, getUserSession().access_token);
};

export const deleteArea = async (
  baseUrl: string,
  id: string
): Promise<void> => {
  const url: string = `${baseUrl}/agencies/me/areas/${id}`;

  return fetch(url, {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `bearer ${getUserSession().access_token}`
    })
  }).then(async (resp: Response) => {
    if (resp.ok) {
      return;
    } else {
      const body = await resp.json();
      return Promise.reject({
        code: resp.status,
        text: resp.statusText,
        detail: body.detail
      });
    }
  });
};

export const saveArea = async (
  baseUrl: string,
  value: Partial<Area>
): Promise<Area> => {
  const url: string = `${baseUrl}/agencies/me/areas`;

  return fetch(url, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `bearer ${getUserSession().access_token}`
    }),
    body: JSON.stringify({
      ...value
    })
  }).then(async (resp: Response) => {
    if (resp.ok) {
      return resp.json();
    } else {
      const body = await resp.json();
      return Promise.reject({
        code: resp.status,
        text: resp.statusText,
        detail: body.detail
      });
    }
  });
};

export const updateArea = async (
  baseUrl: string,
  id: string,
  area: Partial<Area>
) => {
  const url: string = `${baseUrl}/agencies/me/areas/${id}`;

  return fetch(url, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `bearer ${getUserSession().access_token}`
    }),
    body: JSON.stringify({
      ...area
    })
  }).then(async (resp: Response) => {
    if (resp.ok) {
      return resp.json();
    } else {
      const body = await resp.json();
      return Promise.reject({
        code: resp.status,
        text: resp.statusText,
        detail: body.detail
      });
    }
  });
};
