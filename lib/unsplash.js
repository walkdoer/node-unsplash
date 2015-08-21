'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var PROTOCAL = 'https';
var HOST = 'unsplash.com';
var PREFIX = PROTOCAL + '://' + HOST;
var noop = function noop(a) {
    return a;
};
var getImages = function getImages(html) {
    var $ = _cheerio2['default'].load(html);
    var $photoContainers = $('.photo-container');
    var images = [];
    $photoContainers.each(function (i, photoContainer) {
        var $photoContainer = $(photoContainer);
        var $photo = $photoContainer.find('.photo');
        var $photoDesc = $photoContainer.find('.photo-description');
        var $img = $photo.find('img');
        var downloadLink = $photo.find('>a').attr('href');
        var imgSrc = $img.attr('src');
        var $links = $photoDesc.find('a');
        var $author = $links.eq(1);
        var authorName = $author.text();
        var authorLink = $author.attr('href');
        images.push({
            download: PROTOCAL + '://' + HOST + downloadLink,
            authorPage: PROTOCAL + '://' + HOST + '/' + authorLink,
            src: imgSrc,
            author: authorName
        });
    });
    return images;
};

var Unsplash = {
    /**
     * read grid page
     *
     * https://unsplash.com/grid?_={timestamp}&page={pageNumber}
     */
    page: function page(pageNumber) {
        var cb = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];

        var url = PREFIX + '/grid?page=' + pageNumber;
        return new Promise(function (resolve, reject) {
            (0, _request2['default'])(url, function (err, response, body) {
                if (err) {
                    cb(err, null);
                    return reject(err);
                }
                if (response.statusCode === 200) {
                    var images = getImages(body);
                    cb(null, images);
                    resolve(images);
                } else {
                    cb(reponse, null);
                    reject(response);
                }
            });
        });
    },

    /**
     * search image
     *
     *
     * https://unsplash.com/grid/filter?search[keyword]={keyword}&page={pageNumber}
     * keyword
     * scope
     * category
     * page
     */
    filter: function filter() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var cb = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];

        var url = PREFIX + '/filter?';
        var keyword = params.keyword;
        var category = params.category;
        var scope = params.scope;
        var page = params.page;

        if (keyword) {
            url += '&search[keyword]=' + keyword;
        }
        if (scope === 'all') {
            url += '&scope[featured]=0';
        } else if (scope === 'featured') {
            url += '&scope[featured]=1';
        }
        if (page) {
            url += '&page=' + page;
        }
        return new Promise(function (resolve, reject) {
            (0, _request2['default'])(url, function (err, response, body) {
                if (err) {
                    cb(err, null);
                    return reject(err);
                }
                if (response.statusCode === 200) {
                    var images = getImages(body);
                    cb(null, images);
                    resolve(images);
                } else {
                    cb(reponse, null);
                    reject(response);
                }
            });
        });
    }
};

exports['default'] = Unsplash;
module.exports = exports['default'];