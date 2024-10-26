import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test'; 
 
import Actions from './Actions';
 
const meta: Meta<typeof Actions> = {
  component: Actions,
};
 
export default meta;
type Story = StoryObj<typeof Actions>;
export const SubmitAction: Story = {
  args: {
    label: 'Add recipe',
	button: {type: "submit", action: "submit"},
	type: "button",
	onClick: fn()
  },
};
export const DeleteAction: Story = {
  args: {
    label: 'Remove recipe',
	button: {type: "delete", action: "delete"},
	type: "button",
	onClick: fn()
}
};
export const Link: Story = {
  args: {
    label: 'TikTok Pasta',
	type: "link",
	onClick: fn()
}
};
