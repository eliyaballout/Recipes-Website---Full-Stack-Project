import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },

  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },

  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },

  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },

  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },

  {
    path: "/myFamily/:id",
    name: "familyRecipe",
    component: () => import("./pages/RecipeViewPage"),
  },

  {
    path: "/myRecipes/:id",
    name: "MyRecipe",
    component: () => import("./pages/RecipeViewPage"),
  },

  {
    path: "/favorites",
    name: "favorites",
    component: () => import("./pages/FavoritesPage"),
  },

  {
    path: "/myRecipes",
    name: "myRecipes",
    component: () => import("./pages/MyRecipesPage"),
  },

  {
    path: "/familyRecipes",
    name: "familyRecipes",
    component: () => import("./pages/FamilyRecipesPage"),
  },

  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },

  {
    path: "/contactUs",
    name: "contactUs",
    component: () => import("./pages/ContactUsPage"),
  },

  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },

];

export default routes;
