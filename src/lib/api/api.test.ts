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
})