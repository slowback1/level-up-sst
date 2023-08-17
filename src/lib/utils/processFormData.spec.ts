import processFormData from "./processFormData";

describe("processFormData", () => {
    it("can process form  data", () => {
        let result = processFormData<{ a: string }>([['a', 'b']] as any as FormData);

        expect(result.a).toEqual("b");
    })
});