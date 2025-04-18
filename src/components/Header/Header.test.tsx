import Header from "./Header" 
import { expect, test } from 'vitest'
import {render } from '@testing-library/react'
import '@testing-library/dom'

test('<Header /> renders', () => {
	const { container } = render(<Header />)
	expect(container).toMatchSnapshot()
})
