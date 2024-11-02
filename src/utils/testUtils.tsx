import RecipeCard from '../components/RecipeCard/RecipeCard';
import { ReactElement } from "react"

const generateRecipeCards = () => {
	
const children: ReactElement[] = []
for (let i = 0; i < 10; i++) {
	children.push(<RecipeCard 
	img="https://www.feastingathome.com/wp-content/uploads/2024/10/Vegan-Fajitas-13.jpg"
	href="https://www.feastingathome.com/vegan-fajitas/"
	label="Vegan Fajitas"
	alt="test" />)
	}
	return children
}
export { generateRecipeCards }
