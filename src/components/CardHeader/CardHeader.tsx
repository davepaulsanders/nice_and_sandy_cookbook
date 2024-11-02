interface CardHeaderProps {
	img: string;
	alt: string;
	}
const CardHeader = ({ img, alt, ..._rest }: CardHeaderProps) => {
	return (
		<div className="w-11/12">
		<img className="h-[27rem] w-full object-cover" 
		src={img} alt={alt} />
		</div>
		)
}
export default CardHeader
