import useToggle from "../../hooks/useToggle"
const HamburgerMenu = () => {
	const { isOpen, toggleOpen } = useToggle()
	return (
		<button onClick={() => toggleOpen(prev => !prev)}
			  className="fixed flex flex-col justify-center items-center w-[20px] h-[20px] top-5 right-10">
				<span className={`bg-lightg block transition-all duration-300 ease-out 
								h-0.5 w-6 rounded-sm ${isOpen ? 
								'rotate-45 translate-y-1' : '-translate-y-0.5'
								}`} >
					</span>
					<span className={`bg-lightg block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}> </span>
				<span className={`bg-lightg block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}> </span>

		  </button>
	)
}
export default HamburgerMenu
