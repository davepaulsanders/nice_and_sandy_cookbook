import { useState, useEffect } from "react"
const SearchRecipes = ({ recipes, setSearch, setRecipeSearchCopy }) => {
	const [searchInputVal, setSearchInputVal] = useState("")

	// if recipes changes, refilter with changes
	useEffect(() => {
		const reg = new RegExp(`${searchInputVal}`, "i")
		const filtered = recipes.filter(recp => reg.test(recp.label))
		setRecipeSearchCopy(filtered)
	}, [recipes])

	const resetRecipes = async (e) => {
		setSearch(false)
		setSearchInputVal("")
	}
	const searchRecipes = (val: string) => {
		const reg = new RegExp(`${val}`, "i")
		const filtered = recipes.filter(recp => reg.test(recp.label))
		setRecipeSearchCopy(filtered)
	}
	const handleChange= (e) => {
		setSearch(true)
		if (!e.target.value) {
			resetRecipes(e)
		} else {
			searchRecipes(e.target.value)
			setSearchInputVal(e.target.value)
		}
	}
	return (
		<div className="flex flex-col items-center">
			<input placeholder="Search recipes" className="relative rounded-md h-[3rem] w-[20rem] py-[8px] mt-4 text-xl pl-2" type="text" value={searchInputVal} onChange={handleChange} />
			<button className="mt-6 bg-tan-500 text-black rounded-md border py-2 px-8 bg-medg border-1 border-lightg" onClick={resetRecipes}>Reset</button>
		</div>
	)
}
export default SearchRecipes
