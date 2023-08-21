import { TestImageListResult } from "../../__testHelpers/testImageListResult";
import processImageAttribute from "./processImageAttribute";

describe("processImageAttribute", () => {
    it("result contains the correct image url", () => {
        let result = processImageAttribute(TestImageListResult[0]);

        expect(result.url).toContain("uploads/thumbnail_Arkanoid_dd31f25696.jpg")

    });

    it("result contains the image id", () => {
        let result = processImageAttribute(TestImageListResult[0]);

        expect(result.id).toEqual(1);
    });
})