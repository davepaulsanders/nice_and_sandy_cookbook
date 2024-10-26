import type { Meta, StoryObj } from '@storybook/react';
 
import CardContent from './CardContent';
 
const meta: Meta<typeof CardContent> = {
  component: CardContent,
};
 
export default meta;
type Story = StoryObj<typeof CardContent>;
export const Card: Story = {args: {cardContent: {label: "TikTok Pasta", href: "https://www.delish.com/cooking/recipe-ideas/a35421563/baked-feta-pasta-tiktok/"}}}
