interface ActionsProps {
	label: string;
	action: "submit" | "delete";
	type: "submit" | "reset" | "button";
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	}
const Actions = ({label, action, type, onClick}: ActionsProps) => {
	return (
		<button className={`text-xl ${action === "submit" ? "bg-medg hover:bg-lgg" : "bg-deleteColor hover:bg-deleteColorHover"} \
			hover:text-slate-200 py-3 px-10 rounded-md`} type={type} onClick={onClick}>{label}</button>
		)
	}

export default Actions;
