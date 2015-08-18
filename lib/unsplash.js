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

var getImages = function getImages(html) {
    var $ = _cheerio2['default'].load(html);
    var $photos = $('.photo');
    var images = [];
    $photos.each(function (i, photo) {
        var $photo = $(photo);
        var $img = $photo.find('img');
        var downloadLink = $photo.find('>a').attr('href');
        var imgSrc = $img.attr('src');
        var $title = $photo.find('.photo-title a');
        var authorLink = $title.attr('href');
        var title = $title.find('span').text();
        images.push({
            title: title,
            download: PROTOCAL + '://' + HOST + downloadLink,
            authorPage: PROTOCAL + '://' + HOST + '/' + authorLink,
            src: imgSrc
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
        var url = 'https://unsplash.com/grid?page=' + pageNumber;
        return new Promise(function (resolve, reject) {
            (0, _request2['default'])(url, function (err, response, body) {
                if (err) {
                    return reject(err);
                }
                if (response.statusCode === 200) {
                    var images = getImages(body);
                    resolve(images);
                } else {
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
    filter: function filter(keyword) {}
};

exports['default'] = Unsplash;
module.exports = exports['default'];