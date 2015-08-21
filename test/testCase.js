'use strict';

var Unsplash = require('../lib/unsplash.js');
console.log('load page');
Promise.all([
    Unsplash.page(1),
    Unsplash.page(2)
])
.then(function (result) {
    console.log(result[0]);
    console.log(result[1]);
}, function (err) {
    console.log(err);
});


Unsplash.filter({
    keyword: "people",
    page: 1
}).then(function (images) {
    console.log(images);
    return Unsplash.filter({
        keyword: "people",
        page: 2
    });
}).then(function (images) {
    console.log(images);
});