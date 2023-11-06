import { getUserSession } from './AuthService';

export async function sendEmail(
  baseUrl: string,
  template_name: string,
  template_data: Object
): Promise<void> {
  try {
    const url: string = `${baseUrl}/emails/send`;

    const fetchResp = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `bearer ${getUserSession().access_token}`
      }),
      body: JSON.stringify({ template_name, template_data })
    });

    const fetchData = await fetchResp.json();

    if (!fetchResp.ok) {
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
