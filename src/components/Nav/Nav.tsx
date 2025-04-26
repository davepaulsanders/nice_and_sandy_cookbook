const Nav = ({
	isOpen,
	routes,
}: {
	isOpen: boolean;
	routes: { label: string; path: string }[];
}) => {
	return (
		<div
			className={`${isOpen ? "opacity-1 z-[1000]" : "opacity-0 z-[-1]"} ml-auto sticky border p-0 bg-darkg top-0 w-[20rem] text-lightg text-left pb-2 pt-6`}
		>
			<ul className="w-[20rem]">
				{routes.map((route) => (
					<a
						href={route.path}
						className={`block w-1/2 hover:text-lgg ${!isOpen ? "pointer-events-none" : ""}`}
						target="blank"
					>
						<li className="cursor-pointer pl-6 mb-8">
							{route.label}
						</li>
					</a>
				))}
			</ul>
		</div>
	);
};
export default Nav;
