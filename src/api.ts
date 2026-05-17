const BASE_URL = 'https://ziraeat-wazn-production.up.railway.app/api/v1';

function getToken() {
  return localStorage.getItem('access_token');
}

export function saveTokens(tokens: { access: string; refresh: string }) {
  localStorage.setItem('access_token', tokens.access);
  localStorage.setItem('refresh_token', tokens.refresh);
}

export function clearTokens() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

export const api = {
  login: (email: string, password: string) =>
    request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  me: () => request('/auth/me/'),

  logout: () =>
    request('/auth/logout/', {
      method: 'POST',
      body: JSON.stringify({ refresh: localStorage.getItem('refresh_token') }),
    }),
};
