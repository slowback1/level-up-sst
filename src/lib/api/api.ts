import { API_TOKEN, API_URL } from "$env/static/private";
import type { BlogArticleIDResponse, BlogArticleLeadImageAttributes, BlogArticleListResponse, CreateBlogArticleRequest } from "$lib/types";

export default class API {
    private getBearerToken() {
        return `Bearer ${API_TOKEN}`
    }
    private appendUrl(url: string) {
        return `${API_URL}/${url}`;
    }

    private request(url: string, method: string = "GET", body: any = null) {
        let fullUrl = this.appendUrl(url);

        let options: RequestInit = {
            headers: {
                Authorization: this.getBearerToken()
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
    editBlogArticle(id: number, article: CreateBlogArticleRequest) {
        return this.request("api/blog-articles/" + id, "PUT", article);
    }
    uploadFile(file: File) {
        let url = this.appendUrl("api/upload");
        let options: RequestInit = {
            method: "POST",
            headers: {
                Authorization: this.getBearerToken(),
                "Content-Type": "multipart/form-data"
            }
        }

        let formData = new FormData();
        formData.append("file", file);

        options.body = formData;

        return fetch(url, options).then(res => res.json());
    }
}