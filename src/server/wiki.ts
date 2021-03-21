import rp from "request-promise";
import cheerio from "cheerio";

const url = "https://en.wikipedia.org/wiki/Main_Page";

export default async () => {
    try{
        const html = await rp(url);
        const news = cheerio("#mp-itn", html);
        const newslist = cheerio(" > ul", news);
        return newslist.text();
    } catch(err){
        console.log("Error Scrapping: ", err);
    }
}