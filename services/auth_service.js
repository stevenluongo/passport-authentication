import { baseURL } from '../lib/domain/url';

const auth_service = {
  login: async (payload) => {
    const res = await fetch(`${baseURL}/api/auth/login`, {
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
    const res = await fetch(`${baseURL}/api/posts`, {
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
    const res = await fetch(`${baseURL}/api/auth/logout`);
    return await res.json();
  },
  fetchSession: async () => {
    console.log(baseURL)
    const res = await fetch(`${baseURL}/api/auth/session`);
    return await res.json();
  },
  fetchUserById: async (payload) => {
    const res = await fetch(`${baseURL}/api/auth/user/id`, {
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
    const res = await fetch(`${baseURL}/api/auth/user/${_id}`, {
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
    const res = await fetch(`${baseURL}/api/auth/user/id`, {
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
