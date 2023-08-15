import { API_TOKEN } from "$env/static/private";
import { PUBLIC_API_URL } from "$env/static/public";
import type { BlogArticleIDResponse, BlogArticleListResponse } from "$lib/types";

export default class API {
    private request(url: string) {
        let fullUrl = `${PUBLIC_API_URL}/${url}`;

        let options = {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            }
        }

        return fetch(fullUrl, options).then(res => res.json())
    }

    getBlogArticles(): Promise<BlogArticleListResponse> {
        return this.request("api/blog-articles?populate=*")
    }

    getBlogArticleById(id: number): Promise<BlogArticleIDResponse> {
        return this.request(`api/blog-articles/${id}?populate=*`)
    }
}