import { Recipe } from "../../types/types";
import { useState, useEffect } from "react";
interface SearchRecipesProps {
	recipes: Recipe[];
	setSearch: React.Dispatch<React.SetStateAction<boolean>>;
	setRecipeSearchCopy: React.Dispatch<React.SetStateAction<Recipe[]>>;
}
const SearchRecipes = ({
	recipes,
	setSearch,
	setRecipeSearchCopy,
}: SearchRecipesProps) => {
	const [searchInputVal, setSearchInputVal] = useState("");

	// if recipes changes, refilter with changes
	useEffect(() => {
		const reg = new RegExp(`${searchInputVal}`, "i");
		const filtered = recipes.filter((recp) => reg.test(recp.label));
		// don't trigger if searchInputVal is empty
		if (searchInputVal === "") {
			return;
		}
		setRecipeSearchCopy(filtered);
	}, [recipes, searchInputVal]);

	const resetRecipes = async (e) => {
		setSearch(false);
		setSearchInputVal("");
		setRecipeSearchCopy(recipes);
	};
	const handleInputChange = (e) => {
		// clear if input is empty
		if (!e.target.value) {
			resetRecipes(e);
		} else {
			setSearch(true);
			setSearchInputVal(e.target.value);
		}
	};
	return (
		<div className="flex flex-col items-center">
			<input
				placeholder="Search recipes"
				className="relative rounded-md h-[3rem] w-[20rem] py-[8px] mt-4 text-xl pl-2"
				type="text"
				value={searchInputVal}
				onChange={handleInputChange}
			/>
			<button
				className="mt-6 bg-tan-500 text-black rounded-md border py-2 px-8 bg-medg border-1 border-lightg"
				onClick={resetRecipes}
			>
				Reset
			</button>
		</div>
	);
};
export default SearchRecipes;
