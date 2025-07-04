import UrlRepository from "@/repositories/UrlRepository";
import {nanoid} from "nanoid"

export default class UrlShortenerServices{
    private urlRepository;
    constructor(){
        this.urlRepository = new UrlRepository();
    }

    async shortenUrl(originalUrl:string) : Promise<string>{
         if(!originalUrl) {
            return "";
        }
        let url = await this.urlRepository.getUrlByOriginalUrl(originalUrl);
        if(url){
            return url.shortUrl;
        }
        let shortUrl = nanoid();
        url = await this.urlRepository.getUrlByShortUrl(shortUrl);
        while(url){
            shortUrl = nanoid();
            url = await this.urlRepository.getUrlByShortUrl(shortUrl);
        }
        await this.urlRepository.createUrl(originalUrl, shortUrl);
        return shortUrl;
    }

    async getAllUrls(){
        return await this.urlRepository.getAllUrls();
    }

     async getUrlByShortUrl(shortUrl: string) {
        return await this.urlRepository.getUrlByShortUrl(shortUrl);
    }
    
}