import { baseURL } from "../lib/domain/url";

export class Service {
    public base: string = `${baseURL}/api`;

    public async post(url: string, payload) {
        const res = await fetch(url, {
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
    }

    public async get(url: string) {
        const res = await fetch(url);
        return await res.json();
    }

}