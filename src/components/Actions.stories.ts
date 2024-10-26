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
	action: 'submit',
	type: "submit",
	onClick: fn()
  },
};
export const DeleteAction: Story = {
  args: {
    label: 'Remove recipe',
	action: 'delete',
	type: "submit",
	onClick: fn()
}
};
