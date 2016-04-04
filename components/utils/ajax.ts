export function getJson(url: string, params?: any): Promise<any> {
    if (params === undefined) {
        return ajaxJson(url);
    }
    
    var paramsQueryPart = Object.keys(params)
        .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
        .join("&")
        .replace(/%20/g, "+");

    return ajaxJson(url + "?" + paramsQueryPart, 'get');
}

export function postJson(url: string, params?: any): Promise<any> {
    return ajaxJson(url, 'post', params);
}

export function putJson(url: string, params?: any): Promise<any> {
    return ajaxJson(url, 'put', params);
}

export function deleteJson(url: string, params?: any): Promise<any> {
    return ajaxJson(url, 'delete', params);
}

export function ajaxJson(url: string, method: string = 'get', params?: any): Promise<any> {
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