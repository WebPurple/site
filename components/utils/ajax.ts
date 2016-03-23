export function getJson(url: string, params?: any): Promise<any> {
    return ajaxJson(url, 'get', params);
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
        .then(response=> response.json())
        .then(obj => {
            return obj;
        });
}