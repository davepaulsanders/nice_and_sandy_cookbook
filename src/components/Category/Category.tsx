import Wrapper from "../Wrapper/Wrapper"
import RecipeCard from "../RecipeCard/RecipeCard"
const Category = ({category, recipes, setRecipes, pinnedRecipes, setPinnedRecipes}: {category: string, recipes: any[], setPinnedRecipes: any, setRecipes: any, pinnedRecipes: any[]}) => {
	return (
		<section className="my-16 w-full">
		<p className="text-lightg font-bold text-4xl my-10 text-center">{category}</p>
		<Wrapper>
		{recipes.map(recp => (<RecipeCard {...recp} recipes={recipes} pinnedRecipes={pinnedRecipes} setRecipes={setRecipes} setPinnedRecipes={setPinnedRecipes}/>))}
		</Wrapper>
		</section>
	)
}

export default Category
