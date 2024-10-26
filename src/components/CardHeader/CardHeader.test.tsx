import CardHeader from "./CardHeader" 
import { expect, test } from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/dom'

test('<CardHeader /> renders', () => {
	const { container } = render(<CardHeader img={"https://fastly.picsum.photos/id/454/200/300.jpg?hmac=wGXBDB3HURz2isRdLrgggeWdD1yO3rdX4B3-jlzRncg"} alt="test" />)
	expect(container).toMatchSnapshot()
})
