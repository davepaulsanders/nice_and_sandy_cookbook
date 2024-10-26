import Actions from "../Actions/Actions"
interface CardContentProps {
	label: string;
	onClick: () => void;
}
const CardContent = ({label, onClick}: CardContentProps) => {
	return (
		<div>
		<Actions label={label} type="link" onClick={onClick} />
		</div>
	)
	}
export default CardContent
