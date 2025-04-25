import SearchRecipes from "./SearchRecipes";
import App from "../../App";
import { expect, test, vi } from "vitest";
import { render, waitFor, screen } from "@testing-library/react";

import { generateRecipes } from "../../utils/testUtils";

const recipes = generateRecipes();

import "@testing-library/dom";
import userEvent from "@testing-library/user-event";

global.fetch = vi.fn((url: string) => {
  if (url === '../v1/recipes') {
    return Promise.resolve({
	status: 200,
      json: () => Promise.resolve({ recipes: generateRecipes() }),
    });
  }
  if (url === '../v1/categories') {
    return Promise.resolve({
	status: 200,
      json: () => Promise.resolve({ categories: ["ENTREE"] }),
    });
  }
  return Promise.resolve({
    json: () => Promise.resolve({ error: 'Unknown path' }),
  });
}) as unknown as typeof global.fetch

test("<SearchRecipes /> renders", () => {
	const { container } = render(
		<SearchRecipes
			recipes={recipes}
			setSearch={vi.fn()}
			setRecipeSearchCopy={vi.fn()}
		/>
	);
	expect(container).toMatchSnapshot();
});
test("<Calls setSearch with false if input is cleared, and true if input has text", async () => {
	const setSearchMock = vi.fn()
	render(
		<SearchRecipes
			recipes={recipes}
			setSearch={setSearchMock}
			setRecipeSearchCopy={vi.fn()}
		/>
	);
	const searchInput = await waitFor(() => screen.getByPlaceholderText("Search recipes"));
	await waitFor(() => userEvent.click(searchInput));
	await waitFor(() => userEvent.keyboard("a"));
	expect(setSearchMock).toBeCalledWith(true)
	expect(setSearchMock).toBeCalledTimes(1)
	await waitFor(() => userEvent.keyboard("{backspace}"));
	expect(setSearchMock).toBeCalledWith(false)
	expect(setSearchMock).toBeCalledTimes(2)
});
test("Reset button clears input", async () => {
	const setSearchMock = vi.fn()
	render(
		<SearchRecipes
			recipes={recipes}
			setSearch={setSearchMock}
			setRecipeSearchCopy={vi.fn()}
		/>
	);
	const searchInput = await waitFor(() => screen.getByPlaceholderText("Search recipes"));
	await waitFor(() => userEvent.click(searchInput));
	await waitFor(() => userEvent.keyboard("a"));
	const resetButton = await waitFor(() => screen.getByText("Reset"));
	await waitFor(() => userEvent.click(resetButton));
	const searchInputAfterReset = await waitFor(() => screen.getByPlaceholderText("Search recipes"));
	expect(searchInputAfterReset).not.toBeNull()
});
test("Typing in input calls setRecipeSearchCopy", async () => {
	const setRecipeSearchCopyMock = vi.fn()
	render(
		<SearchRecipes
			recipes={recipes}
			setSearch={vi.fn()}
			setRecipeSearchCopy={setRecipeSearchCopyMock}
		/>
	);
	const searchInput = await waitFor(() => screen.getByPlaceholderText("Search recipes"));
	await waitFor(() => userEvent.click(searchInput));
	await waitFor(() => userEvent.keyboard("a"));
	expect(setRecipeSearchCopyMock).toBeCalledTimes(1)	
});
test("Recipes filter based on input", async () => {
	render( <App />);
	const searchInput = await waitFor(() => screen.getByPlaceholderText("Search recipes"));
	await waitFor(() => userEvent.click(searchInput));
	await waitFor(() => userEvent.keyboard("2"));
	const veganRecp = await waitFor(() => screen.getByText("Vegan Fajitas 2"));
	const veganRecp1 = await waitFor(() => screen.queryByText("Vegan Fajitas"));
	expect(veganRecp).not.toBeNull()
	expect(veganRecp1).toBeNull()
});
