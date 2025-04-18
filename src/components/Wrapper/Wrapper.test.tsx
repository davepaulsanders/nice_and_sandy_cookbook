import Wrapper from "./Wrapper" 
import { expect, test } from 'vitest'
import { screen, render } from '@testing-library/react'
import '@testing-library/dom'

import { generateRecipeCards } from "../../utils/testUtils"

const children = generateRecipeCards()

test('<Wrapper /> renders', async () => {
	const { container } = render(<Wrapper children={children}/>)
	expect(container).toMatchSnapshot()
})
test('<Wrapper /> cards exist', async () => {
	render(<Wrapper children={children}/>)
	const labels = screen.getAllByAltText("test")
	expect(labels.length).toBe(10)
})
