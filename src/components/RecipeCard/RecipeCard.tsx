import CardHeader from "../CardHeader/CardHeader"
import CardContent from "../CardContent/CardContent"

const RecipeCard = (props) => {
	return (
		<div className="bg-lightg flex flex-col justify-content-center \
		items-center shadow-lg rounded-md">
			<CardHeader {...props} />
			<CardContent {...props} />
		</div>
	)
	}
export default RecipeCard
