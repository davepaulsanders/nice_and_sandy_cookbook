import { vi } from "vitest"
import type { Meta, StoryObj } from '@storybook/react';
import Category from './Category';
 
import { generateRecipes } from "../../utils/testUtils"

const recipes = generateRecipes()

const meta: Meta<typeof Category> = {
  component: Category,
};
 
export default meta;

type Story = StoryObj<typeof Category>;
const mock = vi.fn()
// @ts-ignore
export const CategoryStory: Story = {args: {category: "Entree", recipes: recipes, setRecipes={mock}}}
