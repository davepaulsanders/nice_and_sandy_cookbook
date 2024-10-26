import CardContent from "./CardContent" 
import { expect, test } from 'vitest'
import {render } from '@testing-library/react'
import '@testing-library/dom'

test('<CardContent /> renders', () => {
	const { container } = render(<CardContent label="test" href="www.google.com"/>)
	expect(container).toMatchSnapshot()
})
