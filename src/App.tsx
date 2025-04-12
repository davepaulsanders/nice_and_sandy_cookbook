import { useState, useEffect, useRef } from "react"
import './App.css'
import { fetchData } from "./utils/fetch"
import Home from "./pages/Home/Home"
import Wrapper from "./components/Wrapper/Wrapper"
import Category from "./components/Category/Category"
import RecipeCard from "./components/RecipeCard/RecipeCard"
import {Recipe, Category as CategoryType} from "./types/types"
import SearchRecipes from "./components/SearchRecipes/SearchRecipes"
import SearchResults from "./components/SearchResults/SearchResults"
import PinnedRecipes from "./components/PinnedRecipes/PinnedRecipes"
const App = () => {
const [recipes, setRecipes] = useState<Recipe[]>([])
const [categories, setCategories] = useState<CategoryType[]>([])
const cachedRecipes = useRef<Recipe[]>([])
const [search, setSearch] = useState(false)

 useEffect(() => {
	getRecipes()
	getCategories()
}, [])

const pinnedRecipes = recipes.filter(recp => recp.is_pinned === true)

const getRecipes = async () => {
	const { recipes: recipeList } = await fetchData("../v1/recipes")
	cachedRecipes.current = recipeList
	setRecipes(recipeList)
}
const getCategories = async () => {
	const { categories: categoriesList} = await fetchData("../v1/categories")
	setCategories(categoriesList)
}
  return (
	<>
	<Home />
	<div className="mt-4 sm:mt-6 w-5/12 mx-auto border-b border-slate-200"></div>
	<SearchRecipes setSearch={setSearch} cachedRecipes={cachedRecipes} recipes={recipes} setRecipes={setRecipes}/>
	{!search ? (
		<PinnedRecipes recipes={recipes} pinnedRecipes={pinnedRecipes} setRecipes={setRecipes}/>
	): null}
	{search ? (
		<div className="mt-4">
	<SearchResults recipes={recipes} setRecipes={setRecipes}/>
</div>
	) : 
	categories && recipes && categories.map(category => <Category category={category.category} recipes={recipes} setRecipes={setRecipes}/>)	}
	</>
  )
}
export default App
