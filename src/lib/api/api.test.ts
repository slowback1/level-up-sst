import type { Mock } from "vitest";
import API from "./api";

describe("API", () => {
    let mockFetch: Mock;
    let api = new API();
    beforeEach(() => {
        mockFetch = vi.fn(() => {
            return Promise.resolve({
                json: () => Promise.resolve({})
            })
        });

        global.fetch = mockFetch;
    })

    it("calls the correct url for getting a list of blog articles", async () => {
        await api.getBlogArticles();

        let [url] = mockFetch.mock.lastCall;

        expect(url).toContain("api/blog-articles");
    })

    it("calls the correct url for getting a blog article", async () => {
        await api.getBlogArticleById(1);

        let [url] = mockFetch.mock.lastCall;

        expect(url).toContain("api/blog-articles/1");
    })

    it("calls the correct url for getting a list of uploaded lead images", async () => {
        await api.getImages();

        let [url] = mockFetch.mock.lastCall;

        expect(url).toContain("api/upload/files");
    })

    it("calls the correct url for creating a blog article", async () => {
        let request = { data: { Body: "", LeadImage: { id: 1 }, Title: "" } }

        await api.createBlogArticle(request)

        let [url, options] = mockFetch.mock.lastCall;

        expect(url).toContain("api/blog-articles");
        expect(options.method).toEqual("POST");
        expect(options.body).toEqual(JSON.stringify(request));
    })
})