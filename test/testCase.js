'use strict';

var Unsplash = require('../lib/unsplash.js');
console.log('load page');
Promise.all([
    Unsplash.page(1),
    Unsplash.page(2)
])
.then(function (result) {
    console.log(result[0].length);
    console.log(result[1].length);
}, function (err) {
    console.log(err);
});