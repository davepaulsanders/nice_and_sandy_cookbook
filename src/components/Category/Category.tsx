import Wrapper from "../Wrapper/Wrapper"
import RecipeCard from "../RecipeCard/RecipeCard"
const Category = ({category, recipes, setRecipes }: {category: string, recipes: any[], setRecipes: any}) => {
	return (
		<section className="my-16 w-full">
		<p className="text-lightg font-bold text-4xl my-10 text-center">{category}</p>
		<Wrapper>
		{recipes.filter(recipe => recipe.category === category).map(recp => (<RecipeCard {...recp} recipes={recipes} setRecipes={setRecipes} />))}
		</Wrapper>
		</section>
	)
}

export default Category
