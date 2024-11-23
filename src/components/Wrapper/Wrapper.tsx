import { ReactElement } from "react"
const Wrapper = ({ children }: { children: ReactElement[]}) => {
    return (
        <div className="grid gap-4 sm:grid-cols-4 sm:mx-auto">
		{children}
        </div>
    );
};
export default Wrapper
	
