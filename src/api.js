import Qs from 'qs';
import Jwt from './jwt';

const paramSerializer = (params) => {
    return Qs.stringify(params, { arrayFormat: 'repeat' });
};

class Api {
    constructor(axios, path = '') {
        if (path.length && path[path.length - 1] !== '/') {
            path += '/';
        }
        this.axios = axios;
        this.path = path;
    }

    getUrl() {
        return this.axios.defaults.baseURL + this.path;
    }

    getHeader() {
        return {
            Authorization: `Token ${Jwt.getToken()}`
        };
    }

    setHeader() {
        const token = `Token ${Jwt.getToken()}`;
        this.axios.defaults.headers.common['Authorization'] = token;
    }

    fetch(params = {}, path = '') {
        return this.axios.get(this.path + path, {
            params: params,
            paramsSerializer: paramSerializer
        });
    }

    retrieve(id = '', params = {}, path = '') {
        return this.axios.get(this.path + id + '/' + path, {
            params: params,
            paramsSerializer: paramSerializer
        });
    }

    create(data, params = {}) {
        return this.axios.post(this.path, data, {
            params: params,
            paramsSerializer: paramSerializer
        });
    }

    update(id, data, params = {}) {
        return this.axios.patch(this.path + id + '/', data, {
            params: params,
            paramsSerializer: paramSerializer
        });
    }

    destroy(id) {
        return this.axios.delete(this.path + id + '/');
    }

    download(path = '', params = {}) {
        return this.axios.get(this.path + path, {
            responseType: 'blob',
            params: params,
            paramsSerializer: paramSerializer
        });
    }
}

export default Api;

