import type { BlogArticleIDResponse, BlogArticleLeadImageAttributes, BlogArticleListResponse, CreateBlogArticleRequest } from "$lib/types";

export default interface IAPI {
    getBlogArticles(): Promise<BlogArticleListResponse>;
    getBlogArticleById(id: number): Promise<BlogArticleIDResponse>;
    getImages(): Promise<BlogArticleLeadImageAttributes[]>;
    createBlogArticle(article: CreateBlogArticleRequest): Promise<any>;
    editBlogArticle(id: number, article: CreateBlogArticleRequest): Promise<any>;
    uploadFile(file: File): Promise<any>;
}