import Wrapper from "./Wrapper" 
import RecipeCard from "../RecipeCard/RecipeCard" 
import { expect, test } from 'vitest'
import { screen, render } from '@testing-library/react'
import '@testing-library/dom'

const children: ReactNode[] = []
for (let i = 0; i < 10; i++) {
	children.push(<RecipeCard 
	img="https://www.feastingathome.com/wp-content/uploads/2024/10/Vegan-Fajitas-13.jpg"
	href="https://www.feastingathome.com/vegan-fajitas/"
	label="Vegan Fajitas"
	alt="test" />)
	}
test('<Wrapper /> renders', async () => {
	const { container } = render(<Wrapper children={children}/>)
	expect(container).toMatchSnapshot()
})
test('<Wrapper /> cards exist', async () => {
	render(<Wrapper children={children}/>)
	const labels = await screen.getAllByAltText("test")
	expect(labels.length).toBe(10)
})
