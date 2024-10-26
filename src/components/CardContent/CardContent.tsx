import Actions from "../Actions/Actions"
interface CardContentProps {
	label: string;
	onClick: () => void;
	[key: string]: any;
}
const CardContent = ({label, href, ...cardContent}: CardContentProps) => {
	return (
		<div className="m-4">
		<Actions label={label} href={href} type="link" />
		</div>
	)
	}
export default CardContent
