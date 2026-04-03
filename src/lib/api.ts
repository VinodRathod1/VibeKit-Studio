const API_URL = '/.netlify/functions';

const request = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }
  return data;
};

export const api = {
  signup: (email: string, password: string) => 
    request('auth-signup', { method: 'POST', body: JSON.stringify({ email, password }) }),
  
  login: (email: string, password: string) => 
    request('auth-login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  
  logout: () => 
    request('auth-logout', { method: 'POST' }),
  
  getMe: () => 
    request('auth-me', { method: 'GET' }),

  getPages: () => 
    request('pages', { method: 'GET' }),

  createPage: (title: string, theme: string) => 
    request('pages', { method: 'POST', body: JSON.stringify({ title, theme }) }),

  duplicatePage: (id: string) => 
    request('pages-duplicate', { method: 'POST', body: JSON.stringify({ id }) }),

  deletePage: (id: string) => 
    request('pages', { method: 'DELETE', body: JSON.stringify({ id }) }),

  getPage: (id: string) => 
    request(`page?id=${id}`, { method: 'GET' }),

  updatePage: (id: string, data: any) => 
    request('page', { method: 'PUT', body: JSON.stringify({ id, ...data }) }),

  publishPage: (id: string) => 
    request('page-publish', { method: 'POST', body: JSON.stringify({ id }) }),

  unpublishPage: (id: string) => 
    request('page-unpublish', { method: 'POST', body: JSON.stringify({ id }) }),

  getPublicPage: (slug: string) => 
    request(`public-page?slug=${slug}`, { method: 'GET' }),

  incrementViewCount: (id: string) => 
    request('public-page-view', { method: 'POST', body: JSON.stringify({ id }) }),

  submitContact: (data: any) => 
    request('public-contact', { method: 'POST', body: JSON.stringify(data) }),
};
