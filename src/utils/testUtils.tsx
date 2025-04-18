import RecipeCard from '../components/RecipeCard/RecipeCard';
import { ReactElement } from "react"
import { vi } from "vitest"
import { Recipe } from "../types/types"

const generateRecipes = () => {
const recipes: Recipe[] = []
for (let i = 0; i < 10; i++) {
	recipes.push({
	id:i + 1,
	img:"https://www.feastingathome.com/wp-content/uploads/2024/10/Vegan-Fajitas-13.jpg",
	href:"https://www.feastingathome.com/vegan-fajitas/",
	label:`Vegan Fajitas ${i + 1}`,
	alt:"test",
	category:"ENTREE",
	category_id:1,
	is_pinned: false,
	})
}
return recipes
}
const generateRecipeCards = () => {
const recipeCards: ReactElement[] = []
for (let i = 0; i < 10; i++) {
	recipeCards.push(
	<RecipeCard
	id={i + 1}
	img="https://www.feastingathome.com/wp-content/uploads/2024/10/Vegan-Fajitas-13.jpg"
	href="https://www.feastingathome.com/vegan-fajitas/"
	label="Vegan Fajitas 2"
	alt="test"
	category="ENTREE"
	category_id={1}
	is_pinned= {false}
	recipes={generateRecipes()}
	setRecipes={vi.fn()}
	/>)
	}
	return recipeCards
}
export { generateRecipeCards, generateRecipes }
