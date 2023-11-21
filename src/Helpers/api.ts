export async function apiGet<T>(url: string, token?: string): Promise<T> {
  return fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`
    })
  }).then(async (resp: Response) => {
    if (resp.ok) {
      return resp.json().then((data: T) => data);
    } else {
      const body = await resp.json();
      return Promise.reject({
        code: resp.status,
        text: resp.statusText,
        detail: body.detail
      });
    }
  });
}

export async function apiPost<V, R>(
  url: string,
  value: V,
  token?: string
): Promise<R> {
  try {
    const fetchResp = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`
      }),
      body: JSON.stringify(value)
    });

    if (fetchResp.ok) {
      return fetchResp.json();
    } else {
      const fetchData = await fetchResp.json();
      return Promise.reject({
        code: fetchResp.status,
        text: fetchResp.statusText,
        detail: fetchData.detail
      });
    }
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function apiPut<T, R>(
  url: string,
  value: T,
  token?: string
): Promise<R> {
  return fetch(url, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`
    }),
    body: JSON.stringify(value)
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
}

export async function apiPatch<T, R>(
  url: string,
  value: T,
  token?: string
): Promise<R> {
  return fetch(url, {
    method: 'PATCH',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`
    }),
    body: JSON.stringify(value)
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
}

export async function apiDelete(url: string, token?: string): Promise<void> {
  return fetch(url, {
    method: 'DELETE',
    headers: new Headers({
      Authorization: `bearer ${token}`
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
}
