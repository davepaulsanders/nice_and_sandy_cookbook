import { Recipe } from "../../types/types";
const CardContent = ({ label, href, ..._rest }: Recipe) => {
	return (
		<div className="m-2">
			<p className="text-lightg text-md">{label}</p>
		</div>
	);
};
export default CardContent;
