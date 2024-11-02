import { Children, ReactElement } from "react"
const Wrapper = ({ children }: { children: ReactElement[]}) => {
    return (
        <div className="grid gap-8 grid-cols-12 grid-rows-auto w-11/12 sm:mx-auto">
            {Children.map(children, (child, i) => (
                <div key={`${child!.props.alt}${i}`} className="col-span-12 sm:col-span-3">
                    {child}
                </div>
            ))}
        </div>
    );
};
export default Wrapper
	
