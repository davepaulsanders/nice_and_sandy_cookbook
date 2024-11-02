import type { Meta, StoryObj } from '@storybook/react';
import Category from './Category';
 
import { generateRecipeCards } from "../../utils/testUtils"

const children = generateRecipeCards()

const meta: Meta<typeof Category> = {
  component: Category,
};
 
export default meta;

type Story = StoryObj<typeof Category>;
export const CategoryStory: Story = {args: {category: "Entree", children: children}} 
