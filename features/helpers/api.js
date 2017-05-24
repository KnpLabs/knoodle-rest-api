const baseUrl = process.env.API_BASE_URL || 'http://localhost:3333';
const qs = require('querystring');
const axios = require('axios').create({
    baseUrl: baseUrl,
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
});

module.exports.get = function get(resource, queries) {
    queries = queries ? qs.stringify(queries) : '';

    return axios.get(`${resource}?${queries}`).then(d => {
        if (d.status > 299) {
            throw d;
        }

        return d.data;
    });
};

module.exports.post = function post(resource, data) {
    return axios.post(resource, data).then(d => {
        if (d.status > 299) {
            throw d;
        }

        return d.data;
    });
}

module.exports.post = function patch(resource, data) {
    return axios.patch(resource, data).then(d => {
        if (d.status > 299) {
            throw d;
        }

        return d.data;
    });
};

module.exports.delete = function remove(resource, queries) {
    queries = queries ? qs.stringify(queries) : '';

    return axios.delete(`${resource}?${queries}`).then(d => {
        if (d.status > 299) {
            throw d;
        }

        return d.data;
    });
};
