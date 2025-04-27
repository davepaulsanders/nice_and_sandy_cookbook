import { Recipe } from "../../types/types";
import Wrapper from "../Wrapper/Wrapper";
import RecipeCard from "../RecipeCard/RecipeCard";
interface PinnedRecipesProps {
	pinnedRecipes: Recipe[];
	recipes: Recipe[];
	setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}
const PinnedRecipes = ({
	pinnedRecipes,
	recipes,
	setRecipes,
}: PinnedRecipesProps) => {
	return (
		<div className="w-full mx-auto">
			<p className="text-lightg font-bold text-3xl text-center my-10">
				PINNED RECIPES
			</p>
				<Wrapper>
					{pinnedRecipes.map((recp) => (
						<RecipeCard
							key={recp.id}
							{...recp}
							recipes={recipes}
							setRecipes={setRecipes}
						/>
					))}
				</Wrapper>
		</div>
	);
};
export default PinnedRecipes;
