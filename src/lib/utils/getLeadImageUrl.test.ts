import type { BlogArticleLeadImage } from "$lib/types";
import { TestBlogArticle } from "../../__testHelpers/testBlogArticle";
import getLeadImageUrl from "./getLeadImageUrl";

type ImageFormat = "thumbnail" | "small" | "medium" | "large"

describe("getLeadImageUrl", () => {
    function generateImage(formats: ImageFormat[]) {
        let base = JSON.parse(JSON.stringify(TestBlogArticle.attributes.LeadImage)) as BlogArticleLeadImage;
        base.data.attributes.formats = {};

        const containsFormat = (f: ImageFormat) => formats.includes(f);
        const addFormat = (f: ImageFormat) => base.data.attributes.formats[f] = JSON.parse(JSON.stringify({ ...TestBlogArticle.attributes.LeadImage.data.attributes.formats.small, url: `http://${f}.jpg` }));

        let allFormats: ImageFormat[] = ["large", "medium", "small", "thumbnail"];

        allFormats.forEach(format => {
            if (containsFormat(format))
                addFormat(format);
        })

        return base;
    }

    it("returns the expected url when all formats are present", () => {
        let image = generateImage(["large", "medium", "small", "thumbnail"]);

        let result = getLeadImageUrl(image);

        expect(result).toEqual("http://large.jpg");
    })

    it.each([
        "large", "medium", "small", "thumbnail"
    ])("gets the correct url when the format is just %s", (format: ImageFormat) => {
        let image = generateImage([format]);

        let result = getLeadImageUrl(image);

        expect(result).toEqual(`http://${format}.jpg`)
    })
})