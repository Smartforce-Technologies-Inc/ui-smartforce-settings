import { User } from '../Models';

const LS_SESSION_KEY = 'Smartforce.UserSession';

export interface UserSession {
  access_token: string | undefined;
  token_type: string | undefined;
}

/**
 * Owner / Officer account creation
 * @param email
 * @param password
 * @param name
 * @param officer_id
 * @param role_id
 * @returns User object
 */
export const createAccount = (
  baseUrl: string,
  email: string,
  password: string,
  name: string,
  officer_id: string,
  role_id: string
): Promise<User> => {
  const url: string = `${baseUrl}/auth/register`;

  return fetch(url, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      email,
      password,
      name,
      officer_id,
      role_id
    })
  }).then(async (resp: Response) => {
    if (resp.ok) {
      return resp.json().then((data: User) => data);
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

/**
 * Send verification email to User created
 * @param email
 * @returns void
 */
export const requestVerifyAccount = (
  baseUrl: string,
  email: string
): Promise<void> => {
  const url: string = `${baseUrl}/auth/request-verify-token`;

  return fetch(url, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      email
    })
  }).then(async (resp: Response) => {
    if (resp.ok) {
      return Promise.resolve();
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

/**
 * Checks that token is a valid account created from user email
 * @param token
 * @returns void
 */
export const verifyAccountCreated = (
  baseUrl: string,
  token: string
): Promise<void> => {
  const url: string = `${baseUrl}/auth/verify`;

  return fetch(url, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      token
    })
  }).then(async (resp: Response) => {
    if (resp.ok) {
      return Promise.resolve();
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

export const getUserSession = (): UserSession => {
  return JSON.parse(localStorage.getItem(LS_SESSION_KEY) as string);
};

const saveUserSession = (session: UserSession): void => {
  localStorage.setItem(LS_SESSION_KEY, JSON.stringify(session));
};

export const removeUserSession = (): void => {
  localStorage.removeItem(LS_SESSION_KEY);
};

export const isLogin = (): boolean => {
  const session: UserSession = getUserSession();
  return (
    session &&
    session.access_token !== undefined &&
    session.token_type !== undefined
  );
};

/**
 * Log in user method
 * @param username / user email
 * @param password
 * @returns user login session token
 */
export const login = (
  baseUrl: string,
  username: string,
  password: string
): Promise<UserSession> => {
  const url: string = `${baseUrl}/auth/login`;
  const params: { [key: string]: string } = {
    username,
    password
  };

  // Encode data
  const searchParams = Object.keys(params)
    .map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    })
    .join('&');

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }),
      body: searchParams
    })
      .then(async (resp: Response) => {
        if (resp.ok) {
          const result: UserSession = await resp.json();
          saveUserSession(result);
          resolve(result);
        } else {
          const body = await resp.json();
          reject({
            code: resp.status,
            text: resp.statusText,
            detail: body.detail
          });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Logout user session
 * @returns void
 */
export const logout = () => {
  removeUserSession();
};

/**
 * Send an email to request a reset password token
 * @param email
 * @returns
 */
export const forgotPassword = (
  baseUrl: string,
  email: string
): Promise<void> => {
  const url: string = `${baseUrl}/auth/forgot-password`;

  return fetch(url, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      email
    })
  }).then(async (resp: Response) => {
    if (resp.ok) {
      return Promise.resolve();
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

export const resetPassword = (
  baseUrl: string,
  password: string,
  token: string
): Promise<void> => {
  const url: string = `${baseUrl}/auth/reset-password`;

  return fetch(url, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      token,
      password
    })
  }).then(async (resp: Response) => {
    if (resp.ok) {
      return Promise.resolve();
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
