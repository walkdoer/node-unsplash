import cheerio from 'cheerio'
import request from 'request'

const PROTOCAL = 'https';
const HOST = 'unsplash.com';

let getImages = (html) => {
    let $ = cheerio.load(html);
    let $photos = $('.photo');
    let images = [];
    $photos.each((i, photo)=> {
        let $photo = $(photo);
        let $img = $photo.find('img');
        let downloadLink = $photo.find('>a').attr('href');
        let imgSrc = $img.attr('src');
        let $title = $photo.find('.photo-title a');
        let authorLink = $title.attr('href');
        let title = $title.find('span').text();
        images.push({
            title: title,
            download: `${PROTOCAL}://${HOST}${downloadLink}`,
            authorPage: `${PROTOCAL}://${HOST}/${authorLink}`,
            src: imgSrc
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
    page (pageNumber) {
        const url = `https://unsplash.com/grid?page=${pageNumber}`;
        return new Promise((resolve, reject) => {
            request(url, function (err, response, body) {
                if (err) {
                    return reject(err);
                }
                if (response.statusCode === 200) {
                    let images = getImages(body);
                    resolve(images);
                } else {
                    reject(response);
                }
            })
        })
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
    filter (keyword) {

    }
}



export default Unsplash