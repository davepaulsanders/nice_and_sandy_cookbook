import CardHeader from "../CardHeader/CardHeader"
import CardContent from "../CardContent/CardContent"
import tack from "/thumb-tack.webp" 
import cancelPin from "/thumb-tack-cancel.webp" 

const RecipeCard = (props) => {
	const pinRecipeToggle = (e) => {
		e.preventDefault()
		const {recipes, setRecipes, pinnedRecipes, setPinnedRecipes, is_pinned, ...rest} = props
		if (props.is_pinned) {
			props.setPinnedRecipes(prev => [...prev.filter(recipe => recipe.id !== props.id)])
		} else if (!props.pinnedRecipes.some(recipe => recipe.id === props.id)) {
			props.setPinnedRecipes(prev => [...prev, {...rest, is_pinned: true}])
		}
	}
	return (
		<div className="relative bg-lightg flex flex-col justify-content-center \
		items-center shadow-lg rounded-md">
			<CardHeader {...props} />
			<CardContent {...props} />
			<img onClick={pinRecipeToggle} width="30px" height="30px" className="absolute top-5 right-5 hover:scale-125 hover:cursor-pointer" src={props.is_pinned ? cancelPin : tack}/>
		</div>
	)
	}
export default RecipeCard
