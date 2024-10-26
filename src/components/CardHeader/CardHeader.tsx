interface CardHeaderProps {
	src: string;
	alt: string;
	[key: string]: any;
	}
const CardHeader = ({img, alt, ...headerContent}: CardHeaderProps) => {
	return (
		<div className="w-11/12">
		<img className="h-[27rem] w-full object-cover" 
		src={img} alt={alt} />
		</div>
		)
}
export default CardHeader
