import RecipeCard from "./RecipeCard";
import { expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import { generateRecipes } from "../../utils/testUtils";

import "@testing-library/dom";

test("<RecipeCard /> as link renders", () => {
	const { container } = render(
		<RecipeCard
			id={1}
			img="https://www.feastingathome.com/wp-content/uploads/2024/10/Vegan-Fajitas-13.jpg"
			href="https://www.feastingathome.com/vegan-fajitas/"
			label="Vegan Fajitas"
			alt="test"
			category="ENTREE"
			category_id={1}
			is_pinned={false}
			recipes={generateRecipes()}
			setRecipes={vi.fn()}
		/>
	);
	expect(container).toMatchSnapshot();
});
test("<RecipeCard /> as submit button renders", () => {
	const { container } = render(
		<RecipeCard
			id={1}
			img="https://www.feastingathome.com/wp-content/uploads/2024/10/Vegan-Fajitas-13.jpg"
			href="https://www.feastingathome.com/vegan-fajitas/"
			label="Vegan Fajitas"
			alt="test"
			category="ENTREE"
			category_id={1}
			is_pinned={false}
			recipes={generateRecipes()}
			setRecipes={vi.fn()}
		/>
	);
	expect(container).toMatchSnapshot();
});
