import Category from "./Category" 
import { expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'
import '@testing-library/dom'

import { generateRecipes } from "../../utils/testUtils"

const recipes = generateRecipes()

test('<Category /> renders', async () => {
	const { container } = render(<Category category="Entree" recipes={recipes} setRecipes={vi.fn()}/>)
	expect(container).toMatchSnapshot()
})
