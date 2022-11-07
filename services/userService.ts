import { HttpResponse } from "../lib/infra/http/interfaces/httpResponse";
import { Service } from "./service";

type userInterface = {
    username?: string;
    emailAddress?: string;
    createdAt?: Date;
}

export class UserService extends Service {
    private url: string = `${this.base}/auth/user`;
    
    public async create(payload: object, csrfToken: string) {
        return this.postRequest(this.url, payload, csrfToken)
    }

    public async fetchByQuery(payload: userInterface): Promise<HttpResponse> {
        return this.putRequest(this.url, payload)
    }

    public async fetchById(id: string): Promise<HttpResponse> {
        return this.postRequest(`${this.url}/${id}`, { id });
    }

    public async update(id: string, payload: userInterface): Promise<HttpResponse> {
        return this.putRequest(`${this.url}/${id}`, payload);
    }

    public async delete(id: string, payload: userInterface): Promise<HttpResponse> {
        return this.deleteRequest(`${this.url}/${id}`, payload);
    }
}