var fetch = require('isomorphic-fetch');

var fbGraphHost = 'https://graph.facebook.com';

/**
 *  Converts parameters object to string separated with ampersand (&).
 *  If no parameters passed, empty string will be returned.
 *
 *  Example:
 *  {a: 1, b: 2} => '&a=1&b=2'
 *
 * @param params
 * @returns {string}
 */
function convertParams(params) {
    return Object.keys(params || {})
        .reduce((resultString, paramName) => resultString + `&${paramName}=${params[paramName]}`, '');
}

/**
 * Common method for all api calls.
 *
 * @param accessToken
 * @param url
 * @param params
 * @param method='get' HTTP method
 * @returns {Promise.<T>|Thenable<U>|Promise<U>}
 */
function apiCall(accessToken, url, params, method) {
    return fetch(`${fbGraphHost}/v2.5/${url}?access_token=${accessToken}${convertParams(params)}`, {
        method: method || 'get'
    })
        .then(response => response.json())
        .then(response => response.error ? Promise.reject(response.error) : response);
}

function getPageAccessToken(userAccessToken, pageId) {
    return apiCall(userAccessToken, 'me/accounts')
        .then(response => {
            var accounts = response.data;
            if (accounts && accounts.length) {
                var account = accounts.find(account => account.id == pageId);
                if (account) {
                    return account.access_token;
                }
            }
            return Promise.reject(`User doesn't have permissions for posting to page: ${pageId}`);
        })
}

function addPost(accessToken, message) {
    return apiCall(accessToken, 'feed', {message}, 'post');
}

module.exports = {
    apiCall,
    getPageAccessToken,
    addPost
};