import { base_url } from '../lib/url';

const auth_service = {
  login: async (payload) => {
    const res = await fetch(`${base_url}/api/auth/login`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return await res.json();
  },
  register: async (csrf_token, payload) => {
    const res = await fetch(`${base_url}/api/posts`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'CSRF-Token': csrf_token,
      },
      body: JSON.stringify(payload),
    });
    return await res.json();
  },
  logout: async () => {
    const res = await fetch(`${base_url}/api/auth/logout`);
    return await res.json();
  },
  fetchSession: async () => {
    const res = await fetch(`${base_url}/api/auth/session`);
    return await res.json();
  },
  fetchUserById: async (payload) => {
    const res = await fetch(`${base_url}/api/auth/user/id`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return await res.json();
  },
  updateUser: async (_id, payload) => {
    const res = await fetch(`${base_url}/api/auth/user/${_id}`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return await res.json();
  },
  deleteUser: async (payload) => {
    const res = await fetch(`${base_url}/api/auth/user/id`, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return await res.json();
  },
};

export default auth_service;
