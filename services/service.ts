import { baseURL } from "../lib/domain/url";

export class Service {
    public base: string = `${baseURL}/api`;
    
    public async getRequest(url: string) {
        const res = await fetch(url);
        return await res.json();
    }

    public async postRequest(url: string, payload: object, csrfToken?: string) {
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

    public async putRequest(url: string, payload: object, csrfToken?: string) {
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

    public async deleteRequest(url: string, payload: object, csrfToken?: string) {
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