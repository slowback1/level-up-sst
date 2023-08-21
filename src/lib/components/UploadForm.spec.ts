import { render, type RenderResult } from "@testing-library/svelte";
import UploadForm from "./UploadForm.svelte";

describe("UploadForm", () => {
    let result: RenderResult<UploadForm>;

    beforeEach(() => {
        result = render(UploadForm);

    })

    afterEach(() => {
        result.unmount();
    })

    it("renders a form", () => {
        let form = result.container.querySelector("form") as HTMLFormElement;

        expect(form).toBeTruthy();
        expect(form.method).toEqual("post");
    })

    it("contains a file input", () => {
        let fileInput = result.container.querySelector("input[type='file']") as HTMLInputElement;

        expect(fileInput).toBeTruthy();
        expect(fileInput.name).toEqual("file");
        expect(fileInput.accept).toEqual("image/png, image/jpeg")
    })

    it("contains a submit button", () => {
        let submit = result.container.querySelector("input[type='submit']")

        expect(submit).toBeTruthy();
    })
})