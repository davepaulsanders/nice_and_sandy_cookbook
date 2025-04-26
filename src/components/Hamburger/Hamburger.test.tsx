import HamburgerMenu from "./Hamburger";
import { expect, test, vi } from "vitest";
import { render } from "@testing-library/react";

import "@testing-library/dom";
test("<Hamburger/> renders open", () => {
	const { container } = render(
		<HamburgerMenu isOpen={true} toggleOpen={vi.fn()}/>
	);
	expect(container).toMatchSnapshot();
});
test("<Hamburger/> renders closed", () => {
	const { container } = render(
		<HamburgerMenu isOpen={false} toggleOpen={vi.fn()}/>
	);
	expect(container).toMatchSnapshot();
});
