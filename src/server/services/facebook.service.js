const fetch = require('isomorphic-fetch');

const fbGraphHost = 'https://graph.facebook.com';

/**
 *  Converts parameters object to string separated with ampersand (&).
 *  First parameter is preceded with ?.
 *  If no parameters passed, empty string will be returned.
 *
 *  Example:
 *  {a: 1, b: 2} => '?a=1&b=2'
 *
 * @param params
 * @returns {string}
 */
function convertParams(params) {
    return '?' + Object.keys(params || {}) // eslint-disable-line prefer-template
        .map((resultString, paramName) => `${paramName}=${params[paramName]}`)
        .join('&');
}

/**
 * Common method for all api calls.
 *
 * @param access_token
 * @param url
 * @param params
 * @param method='get' HTTP method
 * @returns {Promise.<T>|Thenable<U>|Promise<U>}
 */
function apiCall(url, params, method) {
    return fetch(`${fbGraphHost}/v2.5/${url}${encodeURI(convertParams(params))}`, {
        method: method || 'get',
    })
        .then(response => response.json())
        .then(response => response.error ? Promise.reject(response.error) : response);
}

function secureApiCall(accessToken, url, params, method) {
    return apiCall(url, Object.assign({ access_token: accessToken }, params), method);
}

function getPageAccessToken(userAccessToken, pageId) {
    return secureApiCall(userAccessToken, 'me/accounts')
        .then(response => {
            const accounts = response.data;
            if (accounts && accounts.length) {
                const account = accounts.find(acc => acc.id == pageId); // eslint-disable-line eqeqeq
                if (account) {
                    return account.access_token;
                }
            }
            return Promise.reject(`User doesn't have permissions for posting to page: ${pageId}`);
        });
}

function getLongLiveAccessToken(userAccessToken, appId, appSecret) {
    return apiCall('oauth/access_token', {
        grant_type: 'fb_exchange_token',
        client_id: appId,
        client_secret: appSecret,
        fb_exchange_token: userAccessToken,
    });
}

function addPost(accessToken, resourceId, message, link) {
    return secureApiCall(accessToken, `${resourceId}/feed`, { message, link }, 'post');
}

module.exports = {
    getPageAccessToken,
    getLongLiveAccessToken,
    addPost,
};
