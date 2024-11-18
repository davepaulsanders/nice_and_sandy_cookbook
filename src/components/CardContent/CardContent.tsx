import Actions from "../Actions/Actions"
import { Recipe } from "../../types/types"
interface CardContentProps extends Recipe {}
const CardContent = ({label, href, ..._rest }: CardContentProps) => {
	return (
		<div className="m-4">
		<Actions label={label} href={href} type="link" />
		</div>
	)
	}
export default CardContent
