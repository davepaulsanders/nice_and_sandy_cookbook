import type { Meta, StoryObj } from '@storybook/react';
 
import Home from './Home';
 
const meta: Meta<typeof Home> = {
  component: Home,
};
 
export default meta;
type Story = StoryObj<typeof Home>;
export const Card: Story = {args: {cardContent: {label: "TikTok Pasta", href: "https://www.delish.com/cooking/recipe-ideas/a35421563/baked-feta-pasta-tiktok/"}}}
