import { baseURL } from "../lib/domain/url";

export class Service {
    public base: string = `${baseURL}/api`;
    
    public async get(url: string) {
        const res = await fetch(url);
        return await res.json();
    }

    public async post(url: string, payload: object, csrfToken?: string) {
        const res = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'CSRF-Token': csrfToken,
            },
            body: JSON.stringify(payload),
        });
        return await res.json();
    }

    public async put(url: string, payload: object, csrfToken?: string) {
        const res = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'CSRF-Token': csrfToken,
            },
            body: JSON.stringify(payload),
        });
        return await res.json();
    }

    public async delete(url: string, payload: object, csrfToken: string) {
        const res = await fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'CSRF-Token': csrfToken,
            },
            body: JSON.stringify(payload),
        });
        return await res.json();
    }

}