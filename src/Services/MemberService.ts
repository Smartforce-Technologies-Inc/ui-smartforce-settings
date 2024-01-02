import { getUserSession } from './AuthService';
import { Member, MemberResponse, GetMemberType } from '../Models';
import { apiGet } from '../Helpers';

const PAGE_SIZE: number = 10;

export type GetMembersFn = (
  baseUrl: string,
  type: GetMemberType,
  filter?: string,
  status?: string[],
  limit?: number
) => Promise<MemberResponse>;

export const getMembers: GetMembersFn = async (
  baseUrl,
  type,
  filter,
  status,
  limit = PAGE_SIZE
) => {
  const limitString = `limit=${limit}`;
  const filterString = filter && filter.length > 0 ? `&filter=${filter}` : '';

  let statusFilter = '';
  if (status && status.length > 0) {
    statusFilter = status.map((value: string) => `&status=${value}`).join('');
  }

  const url: string = `${baseUrl}/agencies/me/${type}?${limitString}${filterString}${statusFilter}`;

  return fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `bearer ${getUserSession().access_token}`
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

export const getNextMembers = async (url: string): Promise<MemberResponse> => {
  return fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `bearer ${getUserSession().access_token}`
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

export const addMembers = async (
  baseUrl: string,
  members: string[]
): Promise<MemberResponse> => {
  const url: string = `${baseUrl}/agencies/me/members`;

  return fetch(url, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `bearer ${getUserSession().access_token}`
    }),
    body: JSON.stringify(members)
  }).then(async (resp: Response) => {
    if (resp.ok) {
      return resp.json().then((data: MemberResponse) => data);
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

export const resendInvitation = async (
  baseUrl: string,
  email: string
): Promise<void> => {
  const url: string = `${baseUrl}/agencies/me/members/${email}/resend-invitation`;

  return fetch(url, {
    method: 'POST',
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

export const changeRole = async (
  baseUrl: string,
  userId: string,
  roleId: string
): Promise<void> => {
  const url: string = `${baseUrl}/roles/change`;

  return fetch(url, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `bearer ${getUserSession().access_token}`
    }),
    body: JSON.stringify({
      user_id: userId,
      role_id: roleId
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

export const removeMember = async (
  baseUrl: string,
  member: Member
): Promise<void> => {
  const url: string = `${baseUrl}/agencies/me/members/${member.email}`;

  return fetch(url, {
    method: 'DELETE',
    headers: new Headers({
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

export const addInvitations = async (
  baseUrl: string,
  emails: string[]
): Promise<void> => {
  const url: string = `${baseUrl}/agencies/me/invitations`;

  return fetch(url, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `bearer ${getUserSession().access_token}`
    }),
    body: JSON.stringify({
      emails
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

export const removeInvitations = async (
  baseUrl: string,
  emails: string[]
): Promise<void> => {
  const url: string = `${baseUrl}/agencies/me/invitations`;

  return fetch(url, {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `bearer ${getUserSession().access_token}`
    }),
    body: JSON.stringify({
      emails
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

export const getMemberById = (baseUrl: string, id: string): Promise<Member> => {
  const url: string = `${baseUrl}/users/${id}`;

  return apiGet<Member>(url, getUserSession().access_token);
};
