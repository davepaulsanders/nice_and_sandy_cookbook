const Nav = ({ routes }: { routes: string[] }) => {
	return (
		<div className="border border-lightg absolute top-0 right-0 w-[20rem] text-medg text-left pb-2 pt-6">
			<ul>
				{routes.map((route) => (
					<li className="cursor-pointer hover:text-lgg pl-6 mb-8">
						{route}
					</li>
				))}
			</ul>
		</div>
	);
};
export default Nav;
