import CardHeader from "../CardHeader/CardHeader"
import CardContent from "../CardContent/CardContent"

const RecipeCard = (props) => {
	return (
		<div className="flex flex-col justify-content-center \
		items-center min-w-[20rem] max-w-[30rem] min-h-[20rem] shadow-lg rounded-md">
			<CardHeader {...props} />
			<CardContent {...props} />
		</div>
	)
	}
export default RecipeCard
