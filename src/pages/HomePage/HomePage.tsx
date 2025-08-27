import Category from "../../components/Category/Category";
import SearchRecipes from "../../components/SearchRecipes/SearchRecipes";
import SearchResults from "../../components/SearchResults/SearchResults";
import PinnedRecipes from "../../components/PinnedRecipes/PinnedRecipes";
import { Recipe, Category as CategoryType } from "../../types/types";
import { useEffect, useState } from "react";
import { fetchData } from "../../utils/fetch";

const HomePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  // Copied recipes for searching
  const [recipeSearchCopy, setRecipeSearchCopy] = useState<Recipe[]>([]);
  // Is a search being performed
  const [search, setSearch] = useState(false);
  useEffect(() => {
    getRecipes();
    getCategories();
  }, []);

  const pinnedRecipes = recipes.filter((recp) => recp.is_pinned === true);
  const getRecipes = async () => {
    const { recipes: recipeList } = await fetchData<{ recipes: Recipe[] }>(
      "../v1/recipes"
    );
    setRecipes(recipeList);
    setRecipeSearchCopy(recipeList);
  };
  const getCategories = async () => {
    const { categories: categoriesList } = await fetchData<{
      categories: CategoryType[];
    }>("../v1/categories");
    setCategories(categoriesList);
  };
  return (
    <div className="container p-4 sm:p-0 flex flex-col mx-auto">
      <SearchRecipes
        recipes={recipes}
        setSearch={setSearch}
        setRecipeSearchCopy={setRecipeSearchCopy}
      />
      {!search ? (
        <>
          {pinnedRecipes.length > 0 && (
            <PinnedRecipes
              recipes={recipes}
              pinnedRecipes={pinnedRecipes}
              setRecipes={setRecipes}
            />
          )}
          {categories &&
            recipes &&
            categories.map((category) => (
              <Category
                key={category.id || category.category}
                category={category.category}
                recipes={recipes}
                setRecipes={setRecipes}
              />
            ))}
        </>
      ) : (
        <div className="mt-4">
          <SearchResults
            recipeSearchCopy={recipeSearchCopy}
            setRecipes={setRecipes}
            setRecipeSearchCopy={setRecipeSearchCopy}
          />
        </div>
      )}
    </div>
  );
};
export default HomePage;
