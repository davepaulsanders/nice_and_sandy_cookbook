import Wrapper from "../Wrapper/Wrapper";
import RecipeCard from "../RecipeCard/RecipeCard";
import { Recipe } from "../../types/types";
interface CategoryProps {
	category: string;
	recipes: Recipe[];
	setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}
const Category = ({ category, recipes, setRecipes }: CategoryProps) => {
	return (
		<section className="w-full">
			<p className="text-lightg font-bold text-3xl my-10 text-center">
				{category}
			</p>
			<Wrapper>
				{recipes
					.filter((recipe) => recipe.category === category)
					.map((recp) => (
						<RecipeCard
							{...recp}
							recipes={recipes}
							setRecipes={setRecipes}
						/>
					))}
			</Wrapper>
		</section>
	);
};

export default Category;
