<template>
  <b-container fluid class="container">
    
    <div v-if="emptyResult" style="color: red; text-align: center; font-size: 50px; font-weight: bolder;" >No Results Found! :(</div>

    <div v-if="title == 'Random Recipes' || title == 'Last Watched Recipes'">
      <b-row>
        <b-col v-for="r in recipes" :key="r.id" cols="6">
          <RecipePreview ref="previews" class="recipePreview" :recipe="r" :isFavorite="isFavoriteRecipe(r.id)" @toggle-favorite="toggleFavorite" :isViewed="isRecipeViewed(r.id)" @toggle-viewed="toggleViewed"></RecipePreview>
        </b-col>
      </b-row>
    </div>

    <div v-else-if="title == 'Family Recipes'">
      <b-row>
        <b-col v-for="r in recipes" :key="r.id" cols="3">
          <RecipePreview :isFamily="true" ref="previews" class="recipePreview" :recipe="r" :isFavorite="isFavoriteRecipe(r.id)" @toggle-favorite="toggleFavorite" isViewed="isRecipeViewed(r.id)" @toggle-viewed="toggleViewed"></RecipePreview>
        </b-col>
      </b-row>
    </div>

    <div v-else-if="title == 'My Recipes'">
      <b-row>
        <b-col v-for="r in recipes" :key="r.id" cols="3">
          <RecipePreview :isMyRecipe="true" ref="previews" class="recipePreview" :recipe="r" :isFavorite="isFavoriteRecipe(r.id)" @toggle-favorite="toggleFavorite" :isViewed="isRecipeViewed(r.id)" @toggle-viewed="toggleViewed"></RecipePreview>
        </b-col>
      </b-row>
    </div>

    <div v-else>
      <b-row>
        <b-col v-for="r in recipes" :key="r.id" cols="3">
          <RecipePreview ref="previews" class="recipePreview" :recipe="r" :isFavorite="isFavoriteRecipe(r.id)" @toggle-favorite="toggleFavorite" :isViewed="isRecipeViewed(r.id)" @toggle-viewed="toggleViewed"></RecipePreview>
        </b-col>
      </b-row>
    </div>

  </b-container>
</template>
  
  
<!-- #######################################################################################################
############################################ scripts ################################################## -->
  
<script>

  import RecipePreview from "./RecipePreview.vue";
  export default {
    name: "RecipePreviewList",
    components: {
      RecipePreview,
    },

    props: {
      title: {
        type: String,
        required: true,
      },
    },

    data() {
      return {
        emptyResult: false,
        recipes: [],
      };
    },

    mounted() {
      if (this.title == "Random Recipes") {
        this.getRandomRecipes();
      }

      if (this.title == "Last Watched Recipes") {
        this.getLastWatchedRecipes();
      }

      if (this.title == "Favorite Recipes") {
        this.getFavoriteRecipes();
      }

      if (this.title == "My Recipes") {
        this.getMyRecipes();
      }

      if (this.title == "Family Recipes") {
        this.getFamilyRecipes();
      }
    },

    created() {
      const userLoggedIn = this.$root.store.username;
      if (!userLoggedIn) {
        this.clearState();
      } 
      else {
        this.restoreState();
      }
    },

    methods: {
      toggleFavorite(recipeId, isFavorite) {
        const recipe = this.recipes.find((recipe) => recipe.id === recipeId);
        if (recipe) {
          recipe.isFavorite = isFavorite;
          localStorage.setItem(`favoriteState:${recipe.id}`, isFavorite);
        }
      },

      isFavoriteRecipe(recipeId) {
        return localStorage.getItem(`favoriteState:${recipeId}`) === "true";
      },

      toggleViewed(recipeId, isViewed) {
        const recipe = this.recipes.find((recipe) => recipe.id === recipeId);
        if (recipe) {
          recipe.isViewed = isViewed;
          localStorage.setItem(`viewedState:${recipe.id}`, isViewed);
        }
      },

      isRecipeViewed(recipeId) {
        return localStorage.getItem(`viewedState:${recipeId}`) === "true";
      },

      clearState() {
        this.recipes.forEach((recipe) => {
          recipe.isViewed = false;
          recipe.isFavorite = false;
        });

        this.$nextTick(() => {
          Object.values(this.$refs.previews).forEach((previewComponent) => {
            if (previewComponent) {
              previewComponent.updateIsViewed_IsFavorite(false);
            }
          });
        });
      },

      restoreState() {
        this.recipes.forEach((recipe) => {
          recipe.isFavorite = localStorage.getItem(`favoriteState:${recipe.id}`) === "true";
          recipe.isViewed = localStorage.getItem(`viewedState:${recipe.id}`) === "true";
        });
      },

      // ################################################################################
      // ################################################################################

      async getRandomRecipes() {
        this.recipes = [];
        try {
          const response = await this.axios.post(
            this.$root.store.server_domain + "/recipes/randomRecipes",
            { withCredentials: true }
          );

          this.getRecipesList(response);
        } catch (error) {
          console.log(error);
        }
      },

      async getLastWatchedRecipes() {
        try {
          const response = await this.axios.get(
            this.$root.store.server_domain + "/users/lastWatchedRecipes",
            { withCredentials: true }
          );

          this.getRecipesList(response);
        } catch (error) {
          console.log(error);
        }
      },

      async getFavoriteRecipes() {
        try {
          const response = await this.axios.get(
            this.$root.store.server_domain + "/users/favorites",
            { withCredentials: true }
          );

          this.getRecipesList(response);
        } catch (error) {
          console.log(error);
        }
      },

      async getMyRecipes() {
        try {
          const response = await this.axios.get(
            this.$root.store.server_domain + "/users/myAllRecipes",
            { withCredentials: true }
          );

          this.getRecipesList(response);
        } catch (error) {
          console.log(error);
        }
      },

      async getFamilyRecipes() {
        try {
          const response = await this.axios.get(
            this.$root.store.server_domain + "/users/familyRecipes",
            { withCredentials: true }
          );

          this.getRecipesList(response);
        } catch (error) {
          console.log(error);
        }
      },

      async searchQuery(query, number, cuisine, diet, intolerance, sortFilter) {
        this.emptyResult = false;
        this.recipes = [];
        let temp = [];
        if (cuisine == "ALL") {
          cuisine = undefined;
        }

        if (diet == "None") {
          diet = undefined;
        }

        if (intolerance == "None") {
          intolerance = undefined;
        }

        try {
          const response = await this.axios.post(
            this.$root.store.server_domain + "/recipes/search",
            {
              params: {
                query: query,
                number: number,
                cuisine: cuisine,
                diet: diet,
                intolerance: intolerance,
              },
            }
          );

          if (response.data.length != 0) {
            for (let i = 0; i < response.data.length; i++) {
              temp.push(response.data[i]);
            }
          } else {
            this.emptyResult = true;
          }

          if (sortFilter == "Default") {
          } 
          
          else if (sortFilter == "Prepare Time") {
            temp.sort((a, b) => parseInt(a.readyInMinutes) - parseInt(b.readyInMinutes));
          } 
          
          else {
            // Stars
            temp.sort((a, b) => parseFloat(a.popularity) - parseFloat(b.popularity));
          }

          this.recipes = temp;
          return;
          
        } catch (error) {
          console.log(error);
        }
      },

      async getRecipesList(response) {
        const recipes = response.data;
        for (let i = 0; i < recipes.length; i++) {
          try {
            const check = await fetch(recipes[i].image);
            if (!check.ok) {
              recipes[i].image = "https://img.freepik.com/free-vector/404-error-background-with-orange-piece-flat-style_23-2147761281.jpg";
            }
          } catch (error) {
            recipes[i].image = "https://img.freepik.com/free-vector/404-error-background-with-orange-piece-flat-style_23-2147761281.jpg";
          }
        }
        this.recipes.push(...recipes);
      },
    },
  };

</script>
  
  
<!-- #######################################################################################################
################################################# css ################################################## -->
  
<style lang="scss" scoped>

  .container {
    min-height: 400px;
  }

</style>
  