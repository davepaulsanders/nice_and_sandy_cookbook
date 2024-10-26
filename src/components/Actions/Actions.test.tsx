import Actions from "./Actions" 
import { expect, test } from 'vitest'
import {render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/dom'
import { vi } from 'vitest'
const mockFunc = vi.fn()
test('<Actions /> as link renders', () => {
	const { container } = render(<Actions label="test" type="link" href="www.google.com"/>)
	expect(container).toMatchSnapshot()
})
test('<Actions /> as submit button renders', () => {
	const { container } = render(
        <Actions 
            label="test" 
            button={{ type: "submit", action: "submit" }} 
            type="button" 
            onClick={vi.fn()} 
        />
    );
	expect(container).toMatchSnapshot()
})
test('<Actions /> as delete button renders', () => {
	const { container } = render(
        <Actions 
            label="test" 
            button={{ type: "button", action: "delete" }} 
            type="button" 
            onClick={vi.fn()} 
        />
    );
	expect(container).toMatchSnapshot()
})
test('<Actions /> sends onClick', async () => {
	const { container } = render(
        <Actions 
            label="test" 
            button={{ type: "button", action: "delete" }} 
            type="button" 
            onClick={mockFunc} 
        />
    );
	await userEvent.click(screen.getByText("test"))
	expect(mockFunc).toHaveBeenCalledTimes(1)
})
