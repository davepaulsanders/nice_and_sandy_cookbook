import { ReactElement } from "react"
const Wrapper = ({ children }: { children: ReactElement[]}) => {
    return (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-6 sm:mx-auto">
		{children}
        </div>
    );
};
export default Wrapper
	
