import { render, type RenderResult } from '@testing-library/svelte';
import { TestBlogArticle } from '../../__testHelpers/testBlogArticle';
import ArticleItem from './ArticleItem.svelte';

describe("ArticleItem", () => {

    let result: RenderResult<ArticleItem>;

    beforeEach(() => {
        result = render(ArticleItem, { article: TestBlogArticle });
    })

    it("renders an article", () => {
        let article = result.container.querySelector("article");

        expect(article).toBeTruthy();
    })


    it("contains the article title", () => {
        let title = result.container.querySelector("article h2");

        expect(title).toBeTruthy();
        expect(title?.textContent).toEqual(TestBlogArticle.attributes.Title);
    })

    it("is a link to the article", () => {
        let link = result.container.querySelector("a");

        expect(link).toBeTruthy();
        expect(link?.getAttribute("href")).toEqual("/blog/" + TestBlogArticle.id);
    })

})