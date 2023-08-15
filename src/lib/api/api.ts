import { API_TOKEN, API_URL } from "$env/static/private";
import type { BlogArticleListResponse } from "$lib/types";

export default class API {
    private request(url: string) {
        let fullUrl = `${API_URL}/${url}`;

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

    getBlogArticleById(id: number) {
        return this.request(`api/blog-articles/${id}?populate=*`)
    }
}