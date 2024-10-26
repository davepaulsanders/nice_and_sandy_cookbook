import RecipeCard from "./RecipeCard" 
import { expect, test } from 'vitest'
import {render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/dom'
import { vi } from 'vitest'
const mockFunc = vi.fn()
test('<RecipeCard /> as link renders', () => {
	const { container } = render(<RecipeCard label="test" type="link" href="www.google.com"/>)
	expect(container).toMatchSnapshot()
})
test('<RecipeCard /> as submit button renders', () => {
	const { container } = render(
        <RecipeCard 
            label="test" 
            img="https://fastly.picsum.photos/id/454/200/300.jpg?hmac=wGXBDB3HURz2isRdLrgggeWdD1yO3rdX4B3-jlzRncg" 
			href="https://www.feastingathome.com/vegan-fajitas/"
			alt="test"
        />
    );
	expect(container).toMatchSnapshot()
})
