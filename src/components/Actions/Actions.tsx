interface ActionsProps {
	label: string;
	type: "link" | "button";
	button?: {type: string, action: string}
	href: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => void;
	}
const Actions = ({label, type, button, href, onClick}: ActionsProps) => {
	if (type === "button" && button) {
	return (
		<button className={`hover:cursor-pointer text-xl ${button.action === "submit" ? "bg-medg hover:bg-lgg" : "bg-deleteColor hover:bg-deleteColorHover"} \
			hover:text-slate-200 py-3 px-10 rounded-md`} type={type} onClick={onClick}>{label}</button>
		)
		} else {
			return (
				<a target="_blank" href={href} rel="noopener noreferrer" className="text-xl hover:underline hover:cursor-pointer">{label}</a>
			)
		}
		
	}

export default Actions;
