import type { Meta, StoryObj } from '@storybook/react';
 
import CardBase from './CardBase';
 
const meta: Meta<typeof CardBase> = {
  component: CardBase,
};
 
export default meta;
type Story = StoryObj<typeof CardBase>;
export const Card: Story = {
  args: {
  },
};
