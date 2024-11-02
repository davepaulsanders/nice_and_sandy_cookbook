import { Children, ReactElement } from "react"
import Wrapper from "../Wrapper/Wrapper"
const Category = ({category, children}: {category: string, children: ReactElement[]}) => {
	return (
		<section className="my-16">
		<p className="font-bold text-4xl my-10 text-center">{category}</p>
		<Wrapper>
		{Children.toArray(children) as ReactElement[]}
		</Wrapper>
		</section>
	)
}

export default Category
