import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from '../Helpers';
import {
  AgencyEvent,
  AgencyEventType,
  Shift,
  ShiftListItem,
  ShiftMember,
  ShiftRequest
} from '../Models';
import { getUserSession } from './AuthService';

export function getShifts(baseUrl: string): Promise<ShiftListItem[]> {
  const url: string = `${baseUrl}/shifts`;
  return apiGet<{ data: ShiftListItem[] }>(
    url,
    getUserSession().access_token
  ).then((resp) => resp.data);
}

export function getShift(baseUrl: string, id: string): Promise<Shift> {
  const url: string = `${baseUrl}/shifts/${id}`;
  return apiGet<Shift>(url, getUserSession().access_token);
}

export function addShift(baseUrl: string, shift: ShiftRequest): Promise<Shift> {
  const url: string = `${baseUrl}/shifts`;
  return apiPost<ShiftRequest, Shift>(
    url,
    shift,
    getUserSession().access_token
  );
}

export function editShift(
  baseUrl: string,
  id: string,
  shift: ShiftRequest
): Promise<Shift> {
  const url: string = `${baseUrl}/shifts/${id}`;
  return apiPatch<ShiftRequest, Shift>(
    url,
    shift,
    getUserSession().access_token
  );
}

export function getEventTypes(baseUrl: string): Promise<AgencyEventType[]> {
  const url: string = `${baseUrl}/calendars`;
  return apiGet<{ data: AgencyEventType[] }>(
    url,
    getUserSession().access_token
  ).then((resp) => resp.data);
}

export function createEventType(
  baseUrl: string,
  eventType: AgencyEvent
): Promise<AgencyEventType> {
  const url: string = `${baseUrl}/calendars`;
  return apiPost<AgencyEvent, AgencyEventType>(
    url,
    eventType,
    getUserSession().access_token
  );
}

export function editEventType(
  baseUrl: string,
  eventType: AgencyEventType
): Promise<AgencyEventType> {
  const url: string = `${baseUrl}/calendars/${eventType.id}`;
  return apiPut<AgencyEvent, AgencyEventType>(
    url,
    {
      name: eventType.name,
      color: eventType.color
    },
    getUserSession().access_token
  );
}

export function deleteEventType(baseUrl: string, id: string): Promise<void> {
  const url: string = `${baseUrl}/calendars/${id}`;

  return apiDelete(url, getUserSession().access_token);
}

export function addShiftMembers(
  baseUrl: string,
  id: string,
  members: { id: string }[]
): Promise<ShiftMember[]> {
  const url: string = `${baseUrl}/shifts/${id}/participants`;
  return apiPost<{ id: string }[], ShiftMember[]>(
    url,
    members,
    getUserSession().access_token
  );
}
