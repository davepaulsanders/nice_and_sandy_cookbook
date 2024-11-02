import { ReactElement } from "react"
const Wrapper = ({children}: {children: ReactElement[]}) => {
	return (
		<div className="grid gap-x-8 grid-cols-12 grid-rows-auto w-11/12 sm:mx-auto">
		{children.map((child, i) => (<div key={child!.props.alt} className="col-span-12 sm:col-span-3">{child}</div>))}
		</div>
	)
}
export default Wrapper
	
