import type { Meta, StoryObj } from '@storybook/react';
 
import CardHeader from './CardHeader';
 
const meta: Meta<typeof CardHeader> = {
  component: CardHeader,
};
 
export default meta;
type Story = StoryObj<typeof CardHeader>;
export const Card: Story = {args: {src: "https://www.feastingathome.com/wp-content/uploads/2024/10/Vegan-Fajitas-13.jpg", alt: "test"}};
