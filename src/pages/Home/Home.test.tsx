import Home from "./Home" 
import { expect, test } from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/dom'

test('<Home /> renders', () => {
	const { container } = render(<Home />)
	expect(container).toMatchSnapshot()
})
