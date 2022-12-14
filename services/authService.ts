import { HttpResponse } from "../lib/infra/http/interfaces/httpResponse";
import { Service } from "./service";

export class AuthService extends Service {
    private url: string = `${this.base}/auth`;

    public async login(payload: { username: string, password: string }): Promise<HttpResponse> {
        return await this.postRequest(`${this.url}/login`, payload);
    }

    public async logout(): Promise<HttpResponse> {
        return await this.getRequest(`${this.url}/logout`);
    }

    public async fetchSession(): Promise<HttpResponse> {
        return await this.getRequest(`${this.url}/session`);
    }
}

