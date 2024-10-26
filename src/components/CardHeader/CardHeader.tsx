interface CardHeaderProps {
	src: string;
	alt: string;
	}
const CardHeader = (props: CardHeaderProps) => {
	return (
		<img {...props} />
		)
}
export default CardHeader
