import { Service } from "./service";

export class AuthService extends Service {
    private url: string = `${this.base}/auth`;

    public async login(payload) {
        return await this.post(`${this.url}/login`, payload);
    }

    public async logout() {
        return await this.get(`${this.url}/logout`);
    }

    public async fetchSession() {
        return await this.get(`${this.url}/session`);
    }
}

