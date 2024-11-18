import { useState, useEffect, Fragment } from "react"
import './App.css'
import { fetchData } from "./utils/fetch"
import Home from "./pages/Home/Home"
import Wrapper from "./components/Wrapper/Wrapper"
import Category from "./components/Category/Category"
import RecipeCard from "./components/RecipeCard/RecipeCard"

const App = () => {
const [recipes, setRecipes] = useState<any[]>([])
const [categories, setCategories] = useState<any[]>([])

 useEffect(() => {
	getRecipes()
	getCategories()
}, [])
const getRecipes = async () => {
	const { recipes: recipeList } = await fetchData("http://localhost:8080/v1/recipes")
	setRecipes(recipeList)
}
const getCategories = async () => {
	const { categories: categoriesList} = await fetchData("http://localhost:8080/v1/categories")
	setCategories(categoriesList)
}
  return (
	<>
	<Home />
	{recipes ? (
     <Wrapper>
	 {recipes.filter(recp => recp.is_pinned === true).map(recp => <RecipeCard {...recp} recipes={recipes} setRecipes={setRecipes} />)}
	</Wrapper>	
	) : (<><p className="text-4xl font-bold mt-16 mb-8 text-lightg">Pinned Recipes</p><p className="text-medg">No pinned recipes :(</p></>)}
	{categories && recipes && categories.map(category => <Category category={category.category} recipes={recipes} setRecipes={setRecipes}/>)}	
	</>
  )
}
export default App
