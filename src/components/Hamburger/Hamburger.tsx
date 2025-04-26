import { useEffect } from "react";
import { useScroll } from "../../hooks/useScroll";

const HamburgerMenu = ({ isOpen, toggleOpen }) => {
	const scrollPosition = useScroll();
	useEffect(() => {
	}, [scrollPosition]);

	return (
		<button
			onClick={() => toggleOpen((prev) => !prev)}
			className={`${scrollPosition !== 0 ? "bg-darkg p-4 rounded-md" : ""} fixed flex flex-col justify-center z-[1001] items-center w-[50px] h-[50px] top-5 right-10`}
		>
			<span
				className={`bg-lightg block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"}`}
			></span>
			<span
				className={`bg-lightg block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? "opacity-0" : "opacity-100"}`}
			>
				{" "}
			</span>
			<span
				className={`bg-lightg block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"}`}
			>
				{" "}
			</span>
		</button>
	);
};
export default HamburgerMenu;
