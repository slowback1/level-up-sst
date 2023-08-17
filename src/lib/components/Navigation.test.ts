import { render } from "@testing-library/svelte";
import Navigation from './Navigation.svelte';


describe("Navigation", () => {
    function renderComponent() {
        return render(Navigation);
    }

    it("renders without breaking", () => {
        let { container } = renderComponent();

        let nav = container.querySelector("nav");

        expect(nav).toBeTruthy();
    })

    it.each(["/", "/blog/create"])("contains a link to %s", (link: string) => {
        let result = renderComponent();

        let homeLink = result.container.querySelector(`[href='${link}']`);

        expect(homeLink).toBeTruthy();
    })

})