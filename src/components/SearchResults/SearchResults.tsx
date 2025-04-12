import RecipeCard from "../RecipeCard/RecipeCard"
import Wrapper from "../Wrapper/Wrapper"

const SearchResults = ({recipes, setRecipes}) => {
	return (
		<Wrapper>
			{recipes.map((recipe) =>  <RecipeCard {...recipe} />)}
		</Wrapper>
		   )
}
export default SearchResults
