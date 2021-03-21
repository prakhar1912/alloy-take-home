// import * as rp from 'request-promise';
// import * as cheerio from 'cheerio';
const rp = require('request-promise');
const cheerio = require('cheerio');

const url = 'https://en.wikipedia.org/wiki/Main_Page';

export default async () => {
    try{
        const html = await rp(url);
        const news = cheerio('#np-itn', html);
        const newslist = cheerio(' > ul', news);
        return newslist.text();
    } catch(err){
        console.log("Error Scrapping: ", err);
    }
}