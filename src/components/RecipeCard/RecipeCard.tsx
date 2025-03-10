import CardHeader from "../CardHeader/CardHeader"
import CardContent from "../CardContent/CardContent"
import tack from "/thumb-tack.webp" 
import cancelPin from "/thumb-tack-cancel.webp" 
import { pinRecipeToggle } from "./RecipeCardUtils"
import { Recipe } from "../../types/types"
interface RecipeCardProps extends Recipe {
	recipes: Recipe[]
	setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>
}
const RecipeCard = (props: RecipeCardProps) => {
	return (
		<div className="relative bg-lightg flex flex-col justify-content-center \
		items-center shadow-lg rounded-xl">
			<CardHeader {...props} />
			<CardContent {...props} />
			<img onClick={(e)=> pinRecipeToggle(e, props)} width="30px" height="30px" className="absolute top-5 right-5 hover:scale-125 hover:cursor-pointer" src={props.is_pinned ? cancelPin : tack}/>
		</div>
	)
	}
export default RecipeCard
