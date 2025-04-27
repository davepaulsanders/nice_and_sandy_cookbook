import Actions from "../Actions/Actions";
import { Recipe } from "../../types/types";
const CardContent = ({ label, href, ..._rest }: Recipe) => {
	return (
		<div className="m-2">
			<Actions label={label} href={href} type="link" />
		</div>
	);
};
export default CardContent;
