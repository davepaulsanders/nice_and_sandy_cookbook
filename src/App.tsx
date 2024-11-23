import { useState, useEffect } from "react"
import './App.css'
import { fetchData } from "./utils/fetch"
import Home from "./pages/Home/Home"
import Wrapper from "./components/Wrapper/Wrapper"
import Category from "./components/Category/Category"
import RecipeCard from "./components/RecipeCard/RecipeCard"
import {Recipe, Category as CategoryType} from "./types/types"
const App = () => {
const [recipes, setRecipes] = useState<Recipe[]>([])
const [categories, setCategories] = useState<CategoryType[]>([])

 useEffect(() => {
	getRecipes()
	getCategories()
}, [])

const pinnedRecipes = recipes.filter(recp => recp.is_pinned === true)

const getRecipes = async () => {
	const { recipes: recipeList } = await fetchData("../v1/recipes")
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
	<div className="w-full flex flex-col justify-center mx-auto"><p className="text-lightg font-bold text-3xl text-center my-10">PINNED RECIPES</p>
	{pinnedRecipes.length > 0 ? (
     <Wrapper>
	 {pinnedRecipes.map(recp => <RecipeCard {...recp} recipes={recipes} setRecipes={setRecipes} />)}
	</Wrapper>	
	) : (<p className="text-medg">No pinned recipes :(</p>)}

	</div>
	{categories && recipes && categories.map(category => <Category category={category.category} recipes={recipes} setRecipes={setRecipes}/>)}	
	</>
  )
}
export default App
