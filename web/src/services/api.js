import axios from "axios";

const API_PATH = '/api';

class BaseHttpService {
    static #defaultHeader = {
        'Content-Type': 'application/json'
    };

    #httpClient;

    constructor(domain, header = {}) {
        this.domain = domain;
        this.header = {...BaseHttpService.#defaultHeader, ...header}
    }

    async get(url, params={}, headers={}) {
        return  this._client().get(url, {params: params, headers: {...this.header, ...headers}});
    }

    async post(url, params={}, headers={}) {
        return await this._client().post(url, params, {'headers': {...this.header, ...headers}});
    }

    _client() {
        if (!this.#httpClient) {
            this.#httpClient = axios.create({
                baseURL: this.domain,
                headers: this.header
            })
        }

        return this.#httpClient;
    }
}

class UserService {
    #path = '/users'

    constructor(httpService) {
        if (! httpService instanceof BaseHttpService) {
            throw 'Unsupported HTTP Service';
        }

        this.client = httpService;
    }

    async register(username, autoLogin=false) {
        return await this.client.post(this.#path, {'username': username, 'auto_login': autoLogin});
    }

    async getProfile() {
        return await this.client.get(`${this.#path}/profile`);
    }

    async login(username) {
        return await this.client.post(`${this.#path}/login`, {'username': username});
    }
}

export const userService = (token = null) => new UserService(new BaseHttpService(API_PATH, {'x-api-key': token}));
