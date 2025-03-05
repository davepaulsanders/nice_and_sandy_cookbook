import CardHeader from "./CardHeader" 
import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import '@testing-library/dom'
import { generateRecipes } from "../../utils/testUtils"
const recipes = generateRecipes()
test('<CardHeader /> renders', () => {
	const { container } = render(<CardHeader  {...recipes[0]}/>)
	expect(container).toMatchSnapshot()
})
