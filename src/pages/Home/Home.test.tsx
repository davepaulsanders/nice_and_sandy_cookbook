import Home from "./Home" 
import { expect, test } from 'vitest'
import {render } from '@testing-library/react'
import '@testing-library/dom'

test('<Home /> renders', () => {
	const { container } = render(<Home />)
	expect(container).toMatchSnapshot()
})
