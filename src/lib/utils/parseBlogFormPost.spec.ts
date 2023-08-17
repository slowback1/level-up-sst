import parseBlogFormPost from "./parseBlogFormPost"

describe("parseBlogFormPost", () => {
    const testPost = "title=test&body=123&image=1"
    const testPost2 = "title=abc&body=456&image=2"

    it.each(
        [
            [testPost, "test"],
            [testPost2, "abc"]
        ]
    )("can parse out the title to %s", (postString: string, expectedValue: string) => {
        let result = parseBlogFormPost(postString);

        expect(result.title).toEqual(expectedValue);
    })

    it.each(
        [
            [testPost, "123"],
            [testPost2, "456"]
        ]
    )("can parse out the body %s", (postString: string, expectedValue: string) => {
        let result = parseBlogFormPost(postString);

        expect(result.body).toEqual(expectedValue);
    });

    it.each([
        [testPost, 1],
        [testPost2, 2]
    ])("can parse out the image for %s", (postString: string, expectedValue: number) => {
        let result = parseBlogFormPost(postString);

        expect(result.image).toEqual(expectedValue);
    })
})