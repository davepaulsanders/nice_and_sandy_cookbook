import type { Meta, StoryObj } from '@storybook/react';
 
import Wrapper from './Wrapper';
 
import { generateRecipeCards } from "../../utils/testUtils"

const children = generateRecipeCards()

const meta: Meta<typeof Wrapper> = {
  component: Wrapper,
};

 
export default meta;
type Story = StoryObj<typeof Wrapper>;
export const WrapperStory: Story = {args: {
	children
}}
