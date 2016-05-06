export function getJson(url, params) {
    if (params === undefined) {
        return ajaxJson(url);
    }

    var paramsQueryPart = Object.keys(params)
        .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
        .join("&")
        .replace(/%20/g, "+");

    return ajaxJson(url + "?" + paramsQueryPart, 'get');
}

export function postJson(url, params) {
    return ajaxJson(url, 'post', params);
}

export function putJson(url, params) {
    return ajaxJson(url, 'put', params);
}

export function deleteJson(url, params) {
    return ajaxJson(url, 'delete', params);
}

export function ajaxJson(url, method = 'get', params) {
    return fetch(url, {
        method: method,
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: params && JSON.stringify(params)
    })
        .then(response=> response.status === 200 ? response.json() : Promise.reject(response.statusText))
        .then(obj => {
            return obj;
        });
}