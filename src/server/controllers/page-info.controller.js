const express = require('express');
const fetch = require('isomorphic-fetch');
const cheerio = require('cheerio');

module.exports = () => {
    const router = express.Router(); // eslint-disable-line new-cap

    router.route('/page-info')
        .get((request, response) => {
            const decodedUri = includePriorProtocol(decodeURIComponent(request.query.pageUrl));

            fetch(decodedUri, {
                method: 'get',
            })
                .then(resp => response.error ? Promise.reject(resp.error) : resp)
                .then(resp => resp.text())
                .then(data => response.send(getPageInfoFromHtml(data)));
        });

    return router;
};

function includePriorProtocol(url) {
    return /^http(s)?:\/\//.test(url) ? url : `http://${url}`;
}

// TODO: Add support of other sources of page information. Now only open graph tags/attrs are supported.
function getPageInfoFromHtml(data) {
    const content = cheerio.load(data);

    return {
        url: content('meta[property="og:url"]').attr('content'),
        title: content('meta[property="og:title"]').attr('content'),
        description: content('meta[property="og:description"]').attr('content'),
        image: content('meta[property="og:image"]').attr('content'),
        type: content('meta[property="og:type"]').attr('content'),
        siteName: content('meta[property="og:site_name"]').attr('content'),
    };
}
