import CardContent from "./CardContent" 
import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import '@testing-library/dom'
import { generateRecipes } from "../../utils/testUtils"

const recipes = generateRecipes()
test('<CardContent /> renders', () => {
	const { container } = render(<CardContent {...recipes[0]}/>)
	expect(container).toMatchSnapshot()
})
