import { Service } from "./service";

type loginInterface = {
    username: string;
    password: string;
}

type userInterface = {
    username?: string;
    emailAddress?: string;
    createdAt?: Date;
}

export class UserService extends Service {
    private url: string = `${this.base}/auth/user`;
    
    public async create(payload: loginInterface, csrfToken: string) {
        return this.post(this.url, payload, csrfToken)
    }

    public async fetchByQuery(payload: userInterface) {
        return this.put(this.url, payload)
    }

    public async fetchById(id: string) {
        return this.post(`${this.url}/${id}`, { id });
    }

    public async update(id: string, payload: userInterface) {
        return this.put(`${this.url}/${id}`, payload);
    }

    public async delete(id: string, payload: userInterface) {
        return this.delete(`${this.url}/${id}`, payload);
    }
}