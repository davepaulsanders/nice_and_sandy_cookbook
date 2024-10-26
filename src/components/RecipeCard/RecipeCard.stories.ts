import type { Meta, StoryObj } from '@storybook/react';
 
import RecipeCard from './RecipeCard';
 
const meta: Meta<typeof RecipeCard> = {
  component: RecipeCard,
};
 
export default meta;
type Story = StoryObj<typeof RecipeCard>;
export const RecipeCards: Story = {
	args: {
	img: "https://www.feastingathome.com/wp-content/uploads/2024/10/Vegan-Fajitas-13.jpg",
	href: "https://www.feastingathome.com/vegan-fajitas/",
	label: "Vegan Fajitas",
	alt: "test",
	}
};
