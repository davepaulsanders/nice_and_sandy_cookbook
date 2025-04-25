import {useState} from "react"
const useToggle = () => {
const [isOpen, toggleOpen]	= useState(false)
	return {isOpen, toggleOpen}
}
export default useToggle
