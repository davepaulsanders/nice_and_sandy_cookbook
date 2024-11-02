import Category from "./Category" 
import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import '@testing-library/dom'

import { generateRecipeCards } from "../../utils/testUtils"

const children = generateRecipeCards()

test('<Category /> renders', async () => {
	const { container } = render(<Category category="Entree" children={children}/>)
	expect(container).toMatchSnapshot()
})
