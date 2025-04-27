import { Recipe } from "../../types/types";

const CardHeader = ({ img, alt, ...rest }: Recipe) => {
	const defaultImgUrl =
		"https://images.unsplash.com/photo-1645802734096-07f97fcd8bf2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
	return (
		<div className="mt-4 w-full rounded-md overflow-hidden">
			<img
				className="h-[16rem] sm:h-[20rem] w-full object-cover"
				src={img || defaultImgUrl}
				alt={alt}
			/>
		</div>
	);
};
export default CardHeader;
