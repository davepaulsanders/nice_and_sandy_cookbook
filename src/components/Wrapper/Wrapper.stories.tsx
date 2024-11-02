import { ReactElement } from "react"
import type { Meta, StoryObj } from '@storybook/react';
 
import Wrapper from './Wrapper';
import RecipeCard from '../RecipeCard/RecipeCard';
 
const meta: Meta<typeof Wrapper> = {
  component: Wrapper,
};


const children: ReactElement[] = []
for (let i = 0; i < 10; i++) {
	children.push(<RecipeCard 
	img="https://www.feastingathome.com/wp-content/uploads/2024/10/Vegan-Fajitas-13.jpg"
	href="https://www.feastingathome.com/vegan-fajitas/"
	label="Vegan Fajitas"
	alt="test" />)
	}
 
export default meta;
type Story = StoryObj<typeof Wrapper>;
export const WrapperStory: Story = {args: {
	children
}}
