
var express = require('express');
var fetch = require('isomorphic-fetch');
var cheerio = require('cheerio');

var securityUtils = require('./../utils/security-utils');

module.exports = () => {
    var router = express.Router();
    
    router.route('/page-info')
        .get((request, response) => {
            var decodedUri = includePriorProtocol(decodeURIComponent(request.query.pageUrl));
            
            fetch(decodedUri, {
                method: 'get'
            })
                .then(response => {
                   return response.error ? Promise.reject(response.error) : response;
                })
                .then(response => response.text())
                .then(data => {
                    response.send(getPageInfoFromHtml(data));
               });
        });
        
    return router;
}

function includePriorProtocol(url) {
    return /^http(s)?:\/\//.test(url) ? url : 'http://' + url;
}

// TODO: Add support of other sources of page information. Now only open graph tags/attrs are supported.
function getPageInfoFromHtml(data) {
    var content = cheerio.load(data);
    var title = content('meta[property="og:title"]').attr("content");
    var type = content('meta[property="og:type"]').attr("content");
    var url = content('meta[property="og:url"]').attr("content");
    var siteName = content('meta[property="og:site_name"]').attr("content");
    var description = content('meta[property="og:description"]').attr("content");
    var imageUrl = content('meta[property="og:image"]').attr("content");
    
    return {
        title: title,
        type: type,
        url: url,
        siteName: siteName,
        description: description,
        imageUrl: imageUrl  
    };
}


