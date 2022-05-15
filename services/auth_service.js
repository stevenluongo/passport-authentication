import { base_url } from "../lib/url";

const auth_service = {
  login: async(data) => {
    const res = await fetch(`${base_url}/api/auth/login`, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  },
  register: async(data) => {
    const res = await fetch(`${base_url}/api/auth/user`, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  },
  logout: async() => {
    const res = await fetch(`${base_url}/api/auth/logout`);
    return await res.json();
  },
  fetchSession: async() => {
    const res = await fetch(`${base_url}/api/auth/user`);
    return await res.json();
  },
};

export default auth_service;