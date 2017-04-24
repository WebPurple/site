export function ajaxJson(url, method = 'get', params) {
    return fetch(url, {
        method,
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: params && JSON.stringify(params),
    })
        // eslint-disable-next-line no-confusing-arrow
        .then(response => response.status === 200 ? response.json() : Promise.reject(response.statusText));
}

export function getJson(url, params) {
    return ajaxJson(url + mapParamsObjectToQueryString(params)); // eslint-disable-line prefer-template
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

export function mapParamsObjectToQueryString(params) {
    if (!params) { return ''; }

    const nonEmptyProps = Object.keys(params).filter(key => params[key] !== undefined);
    return nonEmptyProps.length
        ? '?' + nonEmptyProps // eslint-disable-line prefer-template
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])) // eslint-disable-line prefer-template
        .join('&')
        .replace(/%20/g, '+')
        : '';
}

/**
 * Converts '?show=all&cha=42' to { show: 'all', cha: '42' }
 *
 * @param query
 */
export const mapQueryStringToObject = query => query.substr(1).split('&')
    .reduce((result, paramWithValue) => {
        paramWithValue = paramWithValue.split('='); // eslint-disable-line no-param-reassign

        result[paramWithValue[0]] = paramWithValue[1]; // eslint-disable-line no-param-reassign

        return result;
    }, {});
