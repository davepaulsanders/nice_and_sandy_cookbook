import App from "../../App";
import PinnedRecipes from "./PinnedRecipes";
import { expect, test, vi } from "vitest";
import { render, waitFor, prettyDOM, screen } from "@testing-library/react";

import { generateRecipes } from "../../utils/testUtils";

const recipes = generateRecipes();

import "@testing-library/dom";
import userEvent from "@testing-library/user-event";

global.fetch = vi.fn((url: string) => {
	if (url === "../v1/recipes") {
		return Promise.resolve({
			status: 200,
			json: () => Promise.resolve({ recipes: generateRecipes() }),
		});
	}
	if (url === "../v1/categories") {
		return Promise.resolve({
			status: 200,
			json: () =>
				Promise.resolve({
					categories: [{ id: 1, category: "ENTREE" }],
				}),
		});
	}
	if (url === "../v1/recipes/pinned") {
		return Promise.resolve({
			status: 200,
			json: () => Promise.resolve({ recipes: generateRecipes() }),
		});
	}
	if (url === "../v1/recipes/pinned/2") {
		return Promise.resolve({
			status: 200,
			json: () => Promise.resolve({ recipes: generateRecipes() }),
		});
	}
	if (url === "../v1/recipes/pinned/1") {
		return Promise.resolve({
			status: 200,
			json: () => Promise.resolve({ recipes: generateRecipes() }),
		});
	}
	return Promise.resolve({
		json: () => Promise.resolve({ error: "Unknown path" }),
	});
}) as unknown as typeof global.fetch;

test("<PinnedRecipes /> renders", () => {
	const { container } = render(
		<PinnedRecipes
			pinnedRecipes={recipes}
			recipes={recipes}
			setRecipes={vi.fn()}
		/>
	);
	expect(container).toMatchSnapshot();
});
test("<PinnedRecipes /> can toggle pinned recipes", async () => {
	/**
	 *This starts with 19 recipes, 9 pinned, 10 in the main recipe list.
	 * This test toggles pinned recipes to make sure the overall amount
	 * of recipes on the page updates
	 */
	render(<App />);
	const recipes = await waitFor(() => screen.getAllByTestId("pin"));
	expect(recipes.length).toEqual(19);
	await waitFor(() => userEvent.click(recipes[0]));
	const recipesAfterClick = await waitFor(() => screen.getAllByTestId("pin"));
	expect(recipesAfterClick.length).toEqual(18);
	await waitFor(() => userEvent.click(recipesAfterClick[8]));
	const recipesAfterToggle = await waitFor(() =>
		screen.getAllByTestId("pin")
	);
	expect(recipesAfterToggle.length).toEqual(19);
});
