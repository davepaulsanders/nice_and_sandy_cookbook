import CardContent from "./CardContent" 
import { expect, test } from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/dom'

test('<CardContent /> renders', () => {
	const { container } = render(<CardContent cardContent={{label: "test", href: "www.google.com"}}/>)
	expect(container).toMatchSnapshot()
})
