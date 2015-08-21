# Unsplash Api

## Install

```
$ npm install node-unsplash
```

## Usage

### `Unsplash.page(pageNumber)`

list photos of each page, suppor `promise`

```
Unsplash.page(1, function (err, photos) {
    if (err) {
        //handler error
    }
    //handler your photos
});
```

or use promise

```
Unsplash.page(1).then(function (photos) {
    //handle your photos
}, function (err) {
    //handle error
})
```


### `Unsplash.filter(params)`

*Params*

- `keyword`: String 'your keyword',
- `feature`: String 'all'/'feature',
- `page`: Number


filter photos by keyword or feature, suppor `promise`

```
Unsplash.filter({
    keyword: 'animal',
    page: 1
}, function (err, photos) {
    if (err) {
        //handler error
    }
    //handler your photos
});
```

or use promise

```
Unsplash.filter({
    keyword: 'animal',
    page: 1
},.then(function (photos) {
    //handle your photos
}, function (err) {
    //handle error
})
```

## License

MIT © [Andrew Zhang](http://zhangmhao.github.io)