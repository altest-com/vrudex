import Qs from 'qs';
import Jwt from './jwt';

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
    
    fetch(params = {}) {
        return this.axios.get(this.path, {
            params: params,
            paramsSerializer: (p) => {
                return Qs.stringify(p, { arrayFormat: 'repeat' });
            }
        });
    }
    
    retrieve(id = '', params = {}) {
        return this.axios.get(this.path + id + '/', { params: params });
    }
    
    create(params) {
        return this.axios.post(this.path, params);
    }

    update(id, params) {
        return this.axios.patch(this.path + id + '/', params);
    }
    
    destroy(id) {
        return this.axios.delete(this.path + id + '/');
    }

    download(params) {
        return this.axios.get(this.path, {
            responseType: 'blob',
            params: params
        });
    }
}

export default Api;

