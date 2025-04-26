const Nav = ({ isOpen, routes }: { isOpen: boolean; routes: string[] }) => {
	return (
		<div className={`${isOpen ? 'opacity-1' : 'opacity-0'} ml-auto sticky border z-[1000] p-0 bg-xxlg border-lightg top-0 w-[20rem] text-lightg text-left pb-2 pt-6`}>
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
