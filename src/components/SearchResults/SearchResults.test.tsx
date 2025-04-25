import SearchResults from "./SearchResults";
import { expect, test, vi } from "vitest";
import { render } from "@testing-library/react";

import { generateRecipes } from "../../utils/testUtils";

const recipes = generateRecipes();

import "@testing-library/dom";

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
			json: () => Promise.resolve({ categories: ["ENTREE"] }),
		});
	}
	return Promise.resolve({
		json: () => Promise.resolve({ error: "Unknown path" }),
	});
}) as unknown as typeof global.fetch;

test("<SearchResults /> renders", () => {
	const { container } = render(
		<SearchResults
			recipeSearchCopy={recipes}
			setRecipeSearchCopy={vi.fn()}
			setRecipes={vi.fn()}
		/>
	);
	expect(container).toMatchSnapshot();
});
