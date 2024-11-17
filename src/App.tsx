import { useState, useEffect, Fragment } from "react"
import './App.css'
import { fetchData } from "./utils/fetch"
import Home from "./pages/Home/Home"
import Category from "./components/Category/Category"
import RecipeCard from "./components/RecipeCard/RecipeCard"

const App = () => {
const [recipes, setRecipes] = useState<Map<string, any[]>>()
const [pinnedRecipes, setPinnedRecipes] = useState<any>([])
 useEffect(() => {
	getRecipes()
}, [])
const getRecipes = async () => {
	const { recipes: recipeList } = await fetchData("http://localhost:8080/v1/recipes")
	const recipeMap = new Map()
	const pinnedList: any = []
	recipeList.forEach(recipe => {
		if (!recipeMap.get(recipe.category)) {
			recipeMap.set(recipe.category, [<RecipeCard img={recipe.img} href={recipe.href} label={recipe.label} alt={recipe.alt}/>])	
		} else {
			recipeMap.get(recipe.category)!.push(<RecipeCard img={recipe.img} href={recipe.href} label={recipe.label} alt={recipe.alt}/>)
		}
		if (recipe.is_pinned) {
			pinnedList.push(<RecipeCard img={recipe.img} href={recipe.href} label={recipe.label} alt={recipe.alt}/>)
		}
	})
	setRecipes(recipeMap)
	setPinnedRecipes(pinnedList)
}
  return (
	<>
	<Home />
	{pinnedRecipes.length > 0 ? (
		<Category category="Pinned Recipes" children={pinnedRecipes}/> ) : (
		<><p className="text-4xl font-bold mt-16 mb-8 text-lightg">Pinned Recipes</p><p className="text-medg">No pinned recipes :(</p></>)}
	{recipes && Array.from(recipes).map(([key, val]) => {
		return (<Category category={key} children={val} />)
	})}
	</>
  )
}

export default App
