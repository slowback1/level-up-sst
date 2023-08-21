import processFormData from "./processFormData";

describe("processFormData", () => {
    it("can process form  data", () => {
        let formData = new FormData();
        formData.append("a", "b");


        let result = processFormData<{ a: string }>(formData);

        expect(result.a).toEqual("b");
    })
});