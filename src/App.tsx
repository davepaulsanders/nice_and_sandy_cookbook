import { useState, useEffect, Fragment } from "react"
import './App.css'
import { fetchData } from "./utils/fetch"
import Home from "./pages/Home/Home"
import Wrapper from "./components/Wrapper/Wrapper"
import Category from "./components/Category/Category"
import RecipeCard from "./components/RecipeCard/RecipeCard"

const App = () => {
const [recipes, setRecipes] = useState<Map<string, any[]>>()
const [pinnedRecipes, setPinnedRecipes] = useState<any[]>([])
 useEffect(() => {
	getRecipes()
}, [])
const getRecipes = async () => {
	const { recipes: recipeList } = await fetchData("http://localhost:8080/v1/recipes")
	const recipeMap = new Map()
	const pinnedList: any[] = []
	recipeList.forEach(recipe => {
		if (!recipeMap.get(recipe.category)) {
			recipeMap.set(recipe.category, [recipe])	
		} else {
			recipeMap.get(recipe.category).push(recipe)
		}
		if (recipe.is_pinned) {
			pinnedList.push(recipe)
		}
	})
	setRecipes(recipeMap)
	setPinnedRecipes(pinnedList)
}
console.log(pinnedRecipes)
  return (
	<>
	<Home />
	{pinnedRecipes.length > 0 ? (
     <Wrapper>
		{pinnedRecipes.map(recp => <RecipeCard {...recp} recipes={recipes} pinnedRecipes={pinnedRecipes} setRecipes={setRecipes} setPinnedRecipes={setPinnedRecipes} />)}
	</Wrapper>	
	) : (<><p className="text-4xl font-bold mt-16 mb-8 text-lightg">Pinned Recipes</p><p className="text-medg">No pinned recipes :(</p></>)}
	{recipes && Array.from(recipes).map(([key, val]) => {
		return (<Category setRecipes={setRecipes} pinnedRecipes={pinnedRecipes} setPinnedRecipes={setPinnedRecipes} category={key} recipes={val} />)
	})}
	</>
  )
}
export default App
