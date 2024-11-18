import CardHeader from "../CardHeader/CardHeader"
import CardContent from "../CardContent/CardContent"
import tack from "/thumb-tack.webp" 
import cancelPin from "/thumb-tack-cancel.webp" 

const RecipeCard = (props) => {
	const pinRecipeToggle = (e) => {
		e.preventDefault()
		const {recipes, setRecipes, is_pinned, ...rest} = props
		if (props.is_pinned) {
			props.setRecipes(prev => {
				return prev.map((rec) => {
				if (rec.id === props.id) {
				  return { ...rest, is_pinned: false};
				}
				return rec;
				})
			  })

		} else {
			props.setRecipes(prev => {
				return prev.map((rec) => {
				if (rec.id === props.id) {
				  return { ...rest, is_pinned: true};
				}
				return rec;
				})
			  })
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
