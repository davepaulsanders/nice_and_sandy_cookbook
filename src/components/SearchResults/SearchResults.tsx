import RecipeCard from "../RecipeCard/RecipeCard"
import Wrapper from "../Wrapper/Wrapper"

const SearchResults = ({recipeSearchCopy, setRecipeSearchCopy, setRecipes }) => {
	return (
		<Wrapper>
			{recipeSearchCopy.map((recipe) =>  <RecipeCard key={recipe.id} {...recipe} setRecipeSearchCopy={setRecipeSearchCopy} setRecipes={setRecipes}/>)}
		</Wrapper>
		   )
}
export default SearchResults
