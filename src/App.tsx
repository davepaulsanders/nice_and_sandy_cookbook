import { useState, useEffect, Fragment } from "react"
import './App.css'
import { fetchData } from "./utils/fetch"
import Home from "./pages/Home/Home"
import Category from "./components/Category/Category"
import RecipeCard from "./components/RecipeCard/RecipeCard"

const App = () => {
const [recipes, setRecipes] = useState<Map<string, any[]>>()
 useEffect(() => {
	getRecipes()
}, [])
const getRecipes = async () => {
	const { recipes: recipeList } = await fetchData("http://localhost:8080/v1/recipes")
	const recipeMap = new Map()
	recipeList.forEach(recipe => {
		if (!recipeMap.get(recipe.category)) {
			recipeMap.set(recipe.category, [<RecipeCard img={recipe.img} href={recipe.href} label={recipe.label} alt={recipe.alt}/>])	
		} else {
			recipeMap.get(recipe.category)!.push(<RecipeCard img={recipe.img} href={recipe.href} label={recipe.label} alt={recipe.alt}/>)
		}
	})
	setRecipes(recipeMap)

}
  return (
	  <>
	<Home />
	{recipes && Array.from(recipes).map(([key, val]) => {
		return (<Category category={key} children={val} />)
	})}
	</>
  )
}

export default App
