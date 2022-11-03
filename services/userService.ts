import { base_url } from '../lib/url';

async function createPostRequest(url: string, payload?, csrf_token?: string) {
  const res = await fetch(url, {
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
}

// export default class userService {
//     public async create(csrf_token: string, username: string, emailAddress: string, password: string) {
//
//     }
// }

const userService = {
  create: async (
    csrf_token: string,
    username: string,
    emailAddress: string,
    password: string
  ) => {
    console.log('here');
    // return await createPostRequest(`${base_url}/api/auth/user`, { username, emailAddress, password }, csrf_token);
    const res = await fetch(`${base_url}/api/auth/user`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'CSRF-Token': csrf_token,
      },
      body: JSON.stringify({ username, emailAddress, password }),
    });
    return await res.json();
  },
  //   login: async (payload) => {
  //     const res = await fetch(`${base_url}/api/auth/login`, {
  //       method: 'POST',
  //       mode: 'cors',
  //       credentials: 'same-origin',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     });
  //     return await res.json();
  //   },
  //   register: async (csrf_token, payload) => {
  //     const res = await fetch(`${base_url}/api/posts`, {
  //       method: 'POST',
  //       mode: 'cors',
  //       credentials: 'same-origin',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         'CSRF-Token': csrf_token,
  //       },
  //       body: JSON.stringify(payload),
  //     });
  //     return await res.json();
  //   },
  //   logout: async () => {
  //     const res = await fetch(`${base_url}/api/auth/logout`);
  //     return await res.json();
  //   },
  //   fetchSession: async () => {
  //     const res = await fetch(`${base_url}/api/auth/session`);
  //     return await res.json();
  //   },
  //   fetchUserById: async (_id) => {
  //     const res = await fetch(`${base_url}/api/auth/user/${_id}`);
  //     return await res.json();
  //   },
  //   updateUser: async (_id, payload) => {
  //     const res = await fetch(`${base_url}/api/auth/user/${_id}`, {
  //       method: 'PUT',
  //       mode: 'cors',
  //       credentials: 'same-origin',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     });
  //     return await res.json();
  //   },
  //   deleteUser: async (_id) => {
  //     const res = await fetch(`${base_url}/api/auth/user/${_id}`, {
  //       method: 'DELETE',
  //       mode: 'cors',
  //       credentials: 'same-origin',
  //     });
  //     return await res.json();
  //   },
};

export default userService;
