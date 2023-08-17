import { fireEvent, render, type RenderResult } from "@testing-library/svelte";
import { TestBlogArticle } from "../../__testHelpers/testBlogArticle";
import BlogForm from "./BlogForm.svelte";

describe("BlogForm", () => {
    let result: RenderResult<BlogForm>;

    afterEach(() => {
        result.unmount();
    })
    describe("when creating a new article", () => {


        beforeEach(() => {
            result = render(BlogForm, { images: [{ id: 1, url: "http://farting.expert" }, { id: 2, url: "http://farting.alucard" }] });
        })


        it("renders a form", () => {
            let form = result.container.querySelector("form") as HTMLFormElement;

            expect(form).toBeTruthy();
            expect(form.method).toEqual("post");

        })

        it.each([
            "title",
            "body",
        ])("contains an field for %s", (fieldName: string) => {
            let field = result.container.querySelector(`[name=${fieldName}]`)

            expect(field).toBeTruthy();
        })

        it("contains two radio buttons for the given images", () => {
            let fields = result.container.querySelectorAll("[data-testid=blog-form__image-radio]");

            expect(fields.length).toEqual(2);
        })
        it("the radio buttons contain the image that they are used for", () => {
            let [firstField, secondField] = Array.from(result.container.querySelectorAll("[data-testid='blog-form__image-radio-image']")) as HTMLImageElement[];


            expect(firstField.src).toContain("http://farting.expert")
            expect(secondField.src).toContain("http://farting.alucard");
        })

        it("contains a submit button", () => {
            let submitButton = result.container.querySelector("[type='submit']");

            expect(submitButton).toBeTruthy();
        })

        it("can fill out all of the fields and POST the form", () => {
            let titleField = result.container.querySelector("[name='title']");
            let bodyField = result.container.querySelector("[name='body']")
            let [firstRadio] = Array.from(result.container.querySelectorAll("[data-testid='blog-form__image-radio']"));
            let submitButton = result.container.querySelector("[type='submit']")

            fireEvent.change(titleField, { target: { value: "My Ultra Cool Title" } })
            fireEvent.change(bodyField, { target: { value: "My even better body value that's really cool and awesome" } })
            fireEvent.click(firstRadio);

            fireEvent.click(submitButton);

            //this might not be unit testable since it's a form submit action, not sure if that's something we can mock, TO-DO?
        })

    })
    describe("when editing a blog article", () => {
        beforeEach(() => {
            result = render(BlogForm, { images: [{ id: 1, url: "http://farting.expert" }], defaultValue: TestBlogArticle })
        })

        it.each(
            [
                ["title", TestBlogArticle.attributes.Title],
                ["body", TestBlogArticle.attributes.Body]
            ]
        )("contains the values of the default value for %s", (name: string, expectedValue: string) => {
            let field = result.container.querySelector(`[name="${name}"]`) as HTMLInputElement;

            expect(field.value).toEqual(expectedValue);

        })

        it("default checks the first image when the given default value contains it", () => {
            let [firstImage] = Array.from(result.container.querySelectorAll("[data-testid='blog-form__image-radio']")) as HTMLInputElement[];

            expect(firstImage.checked).toBeTruthy();
        })
    })
})