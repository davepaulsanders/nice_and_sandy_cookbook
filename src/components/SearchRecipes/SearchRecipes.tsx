import { Recipe } from "../../types/types"
import { useState } from "react"
import Actions from "../Actions/Actions"
const SearchRecipes = ({setSearch, cachedRecipes, recipes, setRecipes}) => {
	const [searchInputVal, setSearchInputVal] = useState("")
	const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])
	const [hideSearchList, setHideSearchList] = useState(true)

	const resetRecipes = (e) => {
		setSearch(false)
		setRecipes(cachedRecipes.current)
		setSearchInputVal("")
		
	}
	const searchRecipes = (val) => {
		setRecipes(cachedRecipes.current.filter(recp => recp.label.includes(val)))
	}
	const handleChange= (e) => {
		setSearch(true)
		setSearchInputVal(e.target.value)
		searchRecipes(e.target.value)
		if (e.target.value === "") {
			setHideSearchList(true)
			setSearch(false)
		} else {
			setHideSearchList(false) 
		}

	}
	const handleIndividualRecipeClick = (recp) => {
		setHideSearchList(true)
		setSearch(true)
		setRecipes([recp])	
		setFilteredRecipes(cachedRecipes.current)
	}

	
	return (
		<div className="flex flex-col items-center">
			<input placeholder="Search recipes" className="rounded-md text-center w-[20rem] py-[8px] mt-4 text-xl pl-2" type="text" value={searchInputVal} onChange={handleChange} />
			{!hideSearchList && (<ul>
								 {recipes.map(recp => <li className="hover:cursor-pointer bg-white w-[20rem] mx-auto" onClick={() => handleIndividualRecipeClick(recp)}>{recp.label}</li>)}
			</ul>)}
			<button className="mt-6 bg-tan-500 text-black rounded-md border py-2 px-8 bg-medg border-1 border-lightg" onClick={resetRecipes}>Reset</button>
		</div>
	)
}
export default SearchRecipes
