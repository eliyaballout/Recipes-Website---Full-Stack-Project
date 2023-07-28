<template>
  <div>
    <b-card no-body style="max-width: 20rem">
      <a style="cursor: pointer"
      @click="handleClick(recipe.id)">
        <RecipePreviewImage :recipeObject="recipe"> </RecipePreviewImage>
      </a>
      <b-card-body>
        <b-card-title :style="getTitleStyle">{{ recipe.title }}</b-card-title>
        <b-card-sub-title>
          Recipe <br />
          <span v-if="isFamily"
            >Made by:
            <span style="color: red; font-weight: bold;">{{
              recipe.owner
            }}</span
            ><br
          /></span>
          <span v-if="isFamily"
            >Prepared in:
            <span style="color: rgb(149, 0, 255); font-weight: bold;">{{
              recipe.whenToPrepare
            }}</span></span
          > </b-card-sub-title
        ><br />
        <b-card-text>
          <span style="color: red; font-weight: bold">{{
            recipe.readyInMinutes
          }}</span>
          minutes |
          <span v-if="!isFamily && !isMyRecipe">
            <span style="color: red; font-weight: bold">{{
              recipe.popularity
            }}</span>
            likes 
          </span>
          <br /><br />
          <span :style="recipe.vegetarian ? 'color: green' : 'color: red'">
            {{ recipe.vegetarian ? "Vegetarian" : "Not vegetarian" }}
          </span>
          |

          <span :style="recipe.vegan ? 'color: purple;' : 'color: red;'">
            {{ recipe.vegan ? "vegan" : "Not vegan" }}
          </span>
          |

          <span :style="recipe.glutenFree ? 'color: blue' : 'color: red;'">
            {{ recipe.glutenFree ? "No gluten" : "With gluten" }}
          </span>
        </b-card-text>

        <b-button
          @click="toggleFavorite(recipe.id)"
          variant="link"
          size="sm"
          class="favorite-button"
          v-if="!isFamily && !isMyRecipe"
        >
          <b-icon
            :icon="isFavorite ? 'heart-fill' : 'heart'"
            class="favorite-icon"
          />
        </b-button>
      </b-card-body>
    </b-card>
  </div>
</template>


<!-- #######################################################################################################
############################################ scripts ################################################## -->

<script>
import RecipePreviewImage from "./RecipePreviewImage.vue";
export default {
  name: "RecipePreview",
  components: {
    RecipePreviewImage,
  },

  data() {
    return {
      isViewed: false,
      isFavorite: false
    };
  },

  props: {
    recipe: {
      type: Object,
      required: true,
    },

    isFamily: {
      type: Boolean,
      required: false,
      default: false,
    },

    isMyRecipe: {
      type: Boolean,
      required: false,
      default: false,
    },
    
  },

  created() {
    this.isViewed =
      localStorage.getItem(`viewedState:${this.recipe.id}`) === "true";
    this.isFavorite =
      localStorage.getItem(`favoriteState:${this.recipe.id}`) === "true";
  },

  computed: {
    getTitleStyle() {
      return {
        color: this.isViewed ? "rgb(38, 0, 255)" : "black",
      };
    },
  },


  methods: {
    handleClick(recipeID) {
      this.navigateToRecipe(recipeID);
      this.toggleViewed(recipeID);
    },

    async navigateToRecipe(recipeId) {
      if (this.isFamily){
        let id = this.recipe.recipe_id
        this.$router.push({ name: "familyRecipe", params: { id , family: this.isFamily } });
      }

      else if (this.isMyRecipe){
        let id = this.recipe.recipe_id
        this.$router.push({ name: "MyRecipe", params: { id , myRecipe: this.isMyRecipe } });
      }

      else {
        this.$router.push({ name: "recipe", params: { recipeId } });
      }
      
    },

    async toggleFavorite(recipeID) {
      if (this.$root.store.username) {
        this.isFavorite = !this.isFavorite;
        this.$emit("toggle-favorite", recipeID, this.isFavorite);
        localStorage.setItem(
          `favoriteState:${this.recipe.id}`,
          this.isFavorite
        );

        if (this.isFavorite) {
          try {
            const response = await this.axios.post(
              this.$root.store.server_domain + "/users/favorites",
              { recipeId: recipeID },
              {withCredentials: true}
            );

            if (response.status === 200) {
              this.$root.toast(
                "Add to favorites",
                "Recipe was added to favorites successfully!",
                "success"
              );
            }
          } catch (error) {
            this.$root.toast(
              "Add to favorites",
              "Recipe was not added!",
              "danger"
            );
          }
        }
      } else {
        this.$root.toast(
          "Add to favorites",
          "You must login to add favorites!",
          "danger"
        );
      }
    },

    async toggleViewed(recipeID) {
      if (this.$root.store.username) {

        if (!this.isViewed && !this.isFamily && !this.isMyRecipe){
          this.isViewed = !this.isViewed;
          this.$emit('toggle-viewed', recipeID, this.isViewed);
          localStorage.setItem(`viewedState:${this.recipe.id}`, this.isViewed);

          try {
            const response = await this.axios.post(
              this.$root.store.server_domain + "/users/lastWatchedRecipes",
              {recipeId: recipeID},
              {withCredentials: true}
            );

            if (response.status === 200){
              this.$root.toast("Add to watch list", "Recipe was added to watch list successfully!", "success");
            }
          } catch(error){
            console.log(error);
            this.$root.toast("Add to watch list", "Recipe was not added!", "danger");
          }
        }
      } 
    },

    updateIsViewed_IsFavorite(flag) {
      this.isViewed = flag;
      this.isFavorite = flag;
    },
  },
};
</script>


<!-- #######################################################################################################
################################################# css ################################################## -->

<style scoped>
.favorite-icon {
  font-size: 1.5rem;
  color: red;
}
</style>
