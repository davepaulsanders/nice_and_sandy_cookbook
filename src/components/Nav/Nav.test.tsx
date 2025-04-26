import Nav from "./Nav";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/dom";
const routes = [{label: "Add a recipe", path: "/add"}, {label: "Complain", path: "https://github.com/davepaulsanders/nice_and_sandy_cookbook/issues"}]
test("<Nav /> renders open", () => {
	const { container } = render(
		<Nav routes={routes} isOpen={true} />
	);
	expect(container).toMatchSnapshot();
});
test("<Nav /> renders closed", () => {
	const { container } = render(
		<Nav routes={routes} isOpen={false} />
	);
	expect(container).toMatchSnapshot();
});
