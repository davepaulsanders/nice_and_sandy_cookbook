import AddRecipe from "./pages/AddRecipe/AddRecipe";
import HomePage from "./pages/HomePage/HomePage";
export const routes = [
  { label: "Home", path: "/", component: HomePage },
  { label: "Add a recipe", path: "/add-recipe", component: AddRecipe },
  {
    label: "Complain",
    path: "https://github.com/davepaulsanders/nice_and_sandy_cookbook/issues",
  },
];
