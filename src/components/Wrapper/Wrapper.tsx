const Wrapper = ({children}: ReactNode[]) => {
	return (
		<div className="grid gap-x-8 grid-cols-12 grid-rows-auto w-11/12 sm:mx-auto">
		{children.map((child, i) => (<div key={`c${child.props.alt}${i}`} className="col-span-12 sm:col-span-3">{child}</div>))}
		</div>
	)
}
export default Wrapper
	
