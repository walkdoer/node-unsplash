import cheerio from 'cheerio'
import request from 'request'

const PROTOCAL = 'https';
const HOST = 'unsplash.com';
const PREFIX = `${PROTOCAL}://${HOST}`;
const noop = (a) => a;
let getImages = (html) => {
    let $ = cheerio.load(html);
    let $photoContainers = $('.photo-container');
    let images = [];
    $photoContainers.each((i, photoContainer)=> {
        let $photoContainer = $(photoContainer);
        let $photo = $photoContainer.find('.photo');
        let $photoDesc = $photoContainer.find('.photo-description');
        let $img = $photo.find('img');
        let downloadLink = $photo.find('>a').attr('href');
        let imgSrc = $img.attr('src');
        let $links = $photoDesc.find('a');
        let $author = $links.eq(1);
        let authorName = $author.text();
        let authorLink = $author.attr('href');
        images.push({
            download: `${PROTOCAL}://${HOST}${downloadLink}`,
            authorPage: `${PROTOCAL}://${HOST}/${authorLink}`,
            src: imgSrc,
            author: authorName
        });
    });
    return images;
}

let Unsplash = {
    /**
     * read grid page
     *
     * https://unsplash.com/grid?_={timestamp}&page={pageNumber}
     */
    page (pageNumber, cb=noop) {
        const url = `${PREFIX}/grid?page=${pageNumber}`;
        return new Promise((resolve, reject) => {
            request(url, (err, response, body) => {
                if (err) {
                    cb(err, null);
                    return reject(err);
                }
                if (response.statusCode === 200) {
                    let images = getImages(body);
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
    filter (params = {}, cb=noop) {
        let url = `${PREFIX}/filter?`;
        let {keyword, category, scope, page} = params;
        if (keyword) {
            url += `&search[keyword]=${keyword}`;
        }
        if (scope === 'all') {
            url += `&scope[featured]=0`
        } else if (scope === 'featured') {
            url += `&scope[featured]=1`
        }
        if (page) {
            url += `&page=${page}`;
        }
        return new Promise((resolve, reject) => {
            request(url, (err, response, body) => {
                if (err) {
                    cb(err, null);
                    return reject(err);
                }
                if (response.statusCode === 200) {
                    let images = getImages(body);
                    cb(null, images);
                    resolve(images);
                } else {
                    cb(reponse, null);
                    reject(response);
                }
            });
        });
    }
}



export default Unsplash