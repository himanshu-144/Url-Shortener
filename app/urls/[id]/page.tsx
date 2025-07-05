import UrlShortenerServices from "@/services/UrlShortenerService"
import { redirect } from "next/navigation";

async function fetchUrlOriginal(url:string){
    const urlService =  new UrlShortenerServices();
    const result = await urlService.getUrlByShortUrl(url);
    return result?.originalUrl;

}
export default async function urlRedirect({params}: {params: {id: string}}) {
    console.log(params.id);
    const {id} = params;
    const original = await fetchUrlOriginal(`urls/${id}`);
    if(original) redirect(original);
    redirect('/404');
    return null;
}

