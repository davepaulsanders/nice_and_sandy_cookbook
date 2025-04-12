import Wrapper from "../Wrapper/Wrapper"
import RecipeCard from "../RecipeCard/RecipeCard"
const PinnedRecipes = ({pinnedRecipes, recipes, setRecipes}) => {

return (

	<div className="w-full flex flex-col justify-center mx-auto"><p className="text-lightg font-bold text-3xl text-center my-10">PINNED RECIPES</p>
	{pinnedRecipes.length > 0 ? (
    <Wrapper>
      {pinnedRecipes.map(recp => (
        <RecipeCard
          key={recp.id} // assuming each recipe has a unique id
          {...recp}
          recipes={recipes}
          setRecipes={setRecipes}
        />
      ))}
    </Wrapper>
  ) : (
		<p className="text-medg">No pinned recipes :(</p>
  )
	}</div>
)
}
export default PinnedRecipes
