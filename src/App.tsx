import { useState, useEffect } from "react";
import useToggle from "./hooks/useToggle";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import "./App.css";
import { fetchData } from "./utils/fetch";
import Category from "./components/Category/Category";
import { Recipe, Category as CategoryType } from "./types/types";
import SearchRecipes from "./components/SearchRecipes/SearchRecipes";
import SearchResults from "./components/SearchResults/SearchResults";
import PinnedRecipes from "./components/PinnedRecipes/PinnedRecipes";
import HamburgerMenu from "./components/Hamburger/Hamburger";
import { routes } from "./routes";
const App = () => {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [categories, setCategories] = useState<CategoryType[]>([]);
	// Copied recipes for searching
	const [recipeSearchCopy, setRecipeSearchCopy] = useState<Recipe[]>([]);
	// Is a search being performed
	const [search, setSearch] = useState(false);
	useEffect(() => {
		getRecipes();
		getCategories();
	}, []);

	const { isOpen, toggleOpen } = useToggle();
	const pinnedRecipes = recipes.filter((recp) => recp.is_pinned === true);
	const getRecipes = async () => {
		const { recipes: recipeList } = await fetchData("../v1/recipes");
		setRecipes(recipeList);
		setRecipeSearchCopy(recipeList);
	};
	const getCategories = async () => {
		const { categories: categoriesList } =
			await fetchData("../v1/categories");
		setCategories(categoriesList);
	};
	return (
		<>
			<Nav isOpen={isOpen} routes={routes} />
			<HamburgerMenu isOpen={isOpen} toggleOpen={toggleOpen} />
			<Header />
			<div className="mt-4 sm:mt-6 w-5/12 mx-auto border-b border-slate-200"></div>
			<SearchRecipes
				recipes={recipes}
				setSearch={setSearch}
				setRecipeSearchCopy={setRecipeSearchCopy}
			/>
			{!search ? (
				<>
					<PinnedRecipes
						recipes={recipes}
						pinnedRecipes={pinnedRecipes}
						setRecipes={setRecipes}
					/>

					{categories &&
						recipes &&
						categories.map((category) => (
							<Category
								key={category.id || category.category}
								category={category.category}
								recipes={recipes}
								setRecipes={setRecipes}
							/>
						))}
				</>
			) : (
				<div className="mt-4">
					<SearchResults
						recipeSearchCopy={recipeSearchCopy}
						setRecipes={setRecipes}
						setRecipeSearchCopy={setRecipeSearchCopy}
					/>
				</div>
			)}
		</>
	);
};
export default App;
