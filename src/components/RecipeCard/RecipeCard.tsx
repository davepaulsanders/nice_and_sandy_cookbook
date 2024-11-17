import CardHeader from "../CardHeader/CardHeader"
import CardContent from "../CardContent/CardContent"
import tack from "/thumb-tack.webp" 
import cancelPin from "/thumb-tack-cancel.webp" 

const RecipeCard = (props) => {
	const pinRecipeToggle = () => {
		if (props.isPinned) {
			props.setPinnedRecipes(prev => prev.filter(recipe => recipe.props.id !== props.id))
		} else {
			props.setPinnedRecipes(prev => [<RecipeCard isPinned={true} setPinnedRecipes={props.setPinnedRecipes} img={props.img} href={props.href} label={props.label} alt={props.alt}/>, ...prev])
	
		}
	}
	return (
		<div className="relative bg-lightg flex flex-col justify-content-center \
		items-center shadow-lg rounded-md">
			<CardHeader {...props} />
			<CardContent {...props} />
			<img onClick={pinRecipeToggle} width="30px" height="30px" className="absolute top-5 right-5 hover:scale-125 hover:cursor-pointer" src={props.isPinned ? cancelPin : tack}/>
		</div>
	)
	}
export default RecipeCard
