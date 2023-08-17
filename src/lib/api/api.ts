import { API_TOKEN, API_URL } from "$env/static/private";
import type { BlogArticleIDResponse, BlogArticleLeadImageAttributes, BlogArticleListResponse, CreateBlogArticleRequest } from "$lib/types";

export default class API {
    private request(url: string, method: string = "GET", body: any = null) {
        let fullUrl = `${API_URL}/${url}`;

        let options: RequestInit = {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            },
            method,
        }

        if (body) {
            options.headers["Content-Type"] = "application/json";
            options.body = JSON.stringify(body);
        }

        return fetch(fullUrl, options).then(res => res.json())
    }

    getBlogArticles(): Promise<BlogArticleListResponse> {
        return this.request("api/blog-articles?populate=*")
    }

    getBlogArticleById(id: number): Promise<BlogArticleIDResponse> {
        return this.request(`api/blog-articles/${id}?populate=*`)
    }

    getImages(): Promise<BlogArticleLeadImageAttributes[]> {
        return this.request(`api/upload/files`)
    }
    createBlogArticle(article: CreateBlogArticleRequest) {
        return this.request("api/blog-articles", "POST", article);
    }
    editBlogArticle(article: CreateBlogArticleRequest) {
        return this.request("api/blog-articles/1", "PUT", article);
    }
}