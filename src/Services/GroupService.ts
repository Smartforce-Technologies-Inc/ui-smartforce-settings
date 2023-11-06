import moment from 'moment';
import { apiDelete, apiGet, apiPatch, apiPost } from '../Helpers';
import { Group, GroupAvatar, GroupHistory, GroupStatus } from '../Models';
import { getUserSession } from './AuthService';

const MAX_INACTIVE_DAYS = 30;

export interface GroupSaveValue {
  name: string;
  acronym: string;
  members: string[];
}

export function saveGroup(
  baseUrl: string,
  group: Partial<GroupSaveValue>
): Promise<Group> {
  const url: string = `${baseUrl}/agencies/me/groups/`;

  return apiPost<Partial<GroupSaveValue>, Group>(
    url,
    group,
    getUserSession().access_token
  );
}

export function updateGroup(
  baseUrl: string,
  id: string,
  value: Partial<GroupSaveValue>
): Promise<Group> {
  const url: string = `${baseUrl}/agencies/me/groups/${id}`;

  return apiPatch<Partial<GroupSaveValue>, Group>(
    url,
    value,
    getUserSession().access_token
  );
}

export function restoreGroup(baseUrl: string, id: string): Promise<Group> {
  const url: string = `${baseUrl}/agencies/me/groups/${id}`;

  return apiPatch<{ status: GroupStatus }, Group>(
    url,
    { status: 'Active' },
    getUserSession().access_token
  );
}

export async function getGroups(baseUrl: string): Promise<Group[]> {
  const url: string = `${baseUrl}/agencies/me/groups/`;

  const groups: Group[] = await apiGet<Group[]>(
    url,
    getUserSession().access_token
  );

  return groups.filter(
    (group: Group) =>
      group.status !== 'Inactive' ||
      !group.updated_at ||
      moment().diff(moment(group.updated_at), 'days') <= MAX_INACTIVE_DAYS
  );
}

export function getGroup(baseUrl: string, id: string): Promise<Group> {
  const url: string = `${baseUrl}/agencies/me/groups/${id}`;

  return apiGet<Group>(url, getUserSession().access_token);
}

export function deleteGroup(baseUrl: string, id: string): Promise<Group> {
  const url: string = `${baseUrl}/agencies/me/groups/${id}`;

  return apiPatch<{ status: GroupStatus }, Group>(
    url,
    { status: 'Inactive' },
    getUserSession().access_token
  );
}

export function addGroupMembers(
  baseUrl: string,
  groupId: string,
  membersIds: string[]
): Promise<Partial<GroupSaveValue>> {
  const url: string = `${baseUrl}/agencies/me/groups/${groupId}/members`;
  return apiPost<Partial<GroupSaveValue>, Partial<GroupSaveValue>>(
    url,
    { members: membersIds },
    getUserSession().access_token
  );
}

export function removeGroupMember(
  baseUrl: string,
  groupId: string,
  memberId: string
): Promise<void> {
  const url: string = `${baseUrl}/agencies/me/groups/${groupId}/members/${memberId}`;
  return apiDelete(url, getUserSession().access_token);
}

export function getGroupHistory(
  baseUrl: string,
  groupId: string
): Promise<GroupHistory[]> {
  const url: string = `${baseUrl}/agencies/me/groups/${groupId}/history`;

  return apiGet(url, getUserSession().access_token);
}

export async function saveGroupAvatar(
  baseUrl: string,
  file: Blob,
  groupId: string
): Promise<GroupAvatar> {
  const url: string = `${baseUrl}/agencies/me/groups/${groupId}/avatars`;

  const formData = new FormData();
  formData.append('avatar', file, 'avatar.jpeg');

  const fetchResp = await fetch(url, {
    method: 'POST',
    headers: new Headers({
      Authorization: `bearer ${getUserSession().access_token}`
    }),
    body: formData
  });

  if (fetchResp.ok) {
    const fetchData = await fetchResp.json();
    return Promise.resolve(fetchData.url);
  } else {
    const fetchData = await fetchResp.json();
    return Promise.reject({
      code: fetchResp.status,
      text: fetchResp.statusText,
      detail: fetchData.detail
    });
  }
}
