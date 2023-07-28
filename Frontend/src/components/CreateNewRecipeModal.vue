<template>
  <div class="container">
    <div class="modal-container">
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Create New Recipe"
        @show="resetModal"
        @hidden="resetModal"
        hide-footer
      >
        <form
          ref="form"
          @submit.stop.prevent="handleSubmit"
          @reset.prevent="resetModal"
        >
          <b-form-group
            label="Title"
            label-for="title-input"
            invalid-feedback="Title is required"
            :state="titleState"
          >
            <b-form-input
              id="title-input"
              v-model="title"
              :state="titleState"
              placeholder="British Cake"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Ready in Minutes"
            label-for="minutes-input"
            invalid-feedback="Ready in Minutes is required"
            :state="minutesState"
          >
            <b-form-input
              id="minutes-input"
              v-model="readyInMinutes"
              :state="minutesState"
              type="number"
              placeholder="120"
              required
            ></b-form-input>
          </b-form-group>

          <div class="form-row">
            <div class="col-sm-4">
              <b-form-group label="Vegetarian">
                <b-form-checkbox v-model="vegetarian" name="vegetarian"
                  >Vegetarian</b-form-checkbox
                >
              </b-form-group>
            </div>

            <div class="col-sm-4">
              <b-form-group label="Vegan">
                <b-form-checkbox v-model="vegan" name="vegan"
                  >Vegan</b-form-checkbox
                >
              </b-form-group>
            </div>

            <div class="col-sm-4">
              <b-form-group label="Gluten Free">
                <b-form-checkbox v-model="glutenFree" name="glutenFree"
                  >Gluten Free</b-form-checkbox
                >
              </b-form-group>
            </div>
          </div>

          <b-form-group
            label="Servings"
            label-for="servings-input"
            invalid-feedback="Servings is required"
            :state="servingsState"
          >
            <b-form-input
              id="servings-input"
              v-model="servings"
              :state="servingsState"
              type="number"
              placeholder="10"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Instructions"
            label-for="instructions-textarea"
            invalid-feedback="Instructions are required"
            :state="instructionsState"
          >
            <b-form-textarea
              id="instructions-textarea"
              v-model="instructions"
              :state="instructionsState"
              name="instructions"
              placeholder="e.g., 1. Wash the fruits. ..."
              required
            ></b-form-textarea>
          </b-form-group>

          <b-form-group
            label="Ingredients (comma-separated)"
            label-for="ingredients-input"
            invalid-feedback="Ingredients are required"
            :state="ingredientsState"
          >
            <b-form-input
              id="ingredients-input"
              v-model="ingredients"
              :state="ingredientsState"
              name="ingredients"
              placeholder="Eggs,Sugar,..."
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Image URL"
            label-for="image-url-input"
            invalid-feedback="Invalid image URL"
            :state="imageUrlState"
          >
            <b-form-input
              id="image-url-input"
              v-model="imageUrl"
              :state="imageUrlState"
              type="url"
              required
              placeholder="https://example.com/image.jpg"
            ></b-form-input>
          </b-form-group>

          <div class="button-container">
            <b-button type="reset" variant="primary">Clear All</b-button>
            <b-button type="submit" variant="primary">Submit</b-button>
          </div>
        </form>
        <b-button class="mt-3" block @click="$bvModal.hide('modal-prevent-closing')">Close Me</b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateNewRecipeModal",
  data() {
    return {
      title: "",
      readyInMinutes: null,
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      servings: null,
      instructions: "",
      ingredients: "",
      imageUrl: "",
      titleState: null,
      minutesState: null,
      servingsState: null,
      instructionsState: null,
      ingredientsState: null,
      imageUrlState: null,
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.titleState = valid;
      this.minutesState = valid;
      this.servingsState = valid;
      this.instructionsState = valid;
      this.ingredientsState = valid;
      this.imageUrlState = valid;
      return valid;
    },
    resetModal() {
      this.title = "";
      this.readyInMinutes = null;
      this.vegetarian = false;
      this.vegan = false;
      this.glutenFree = false;
      this.servings = null;
      this.instructions = "";
      this.ingredients = "";
      this.imageUrl = "";
      this.titleState = null;
      this.minutesState = null;
      this.servingsState = null;
      this.instructionsState = null;
      this.ingredientsState = null;
      this.imageUrlState = null;
    },
    async handleOk(bvModalEvent) {
      bvModalEvent.preventDefault();
      this.handleSubmit();
    },

    async handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }

      if (this.$root.store.username) {
        // Parse comma-separated ingredients into JSON array
        const ingredientsArray = this.ingredients
          .split(',')
          .map((ingredient) => ingredient.trim());

        // Create a recipe object with the form data
        const recipe = {
          title: this.title,
          readyInMinutes: this.readyInMinutes,
          vegetarian: this.vegetarian,
          vegan: this.vegan,
          glutenFree: this.glutenFree,
          servings: this.servings,
          instructions: this.instructions,
          ingredients: ingredientsArray,
          imageUrl: this.imageUrl,
        };

        try {
          const response = await this.axios.post(
            this.$root.store.server_domain +'/recipes/createRecipe', 
            recipe,
            {withCredentials: true}
          );

          if (response.status === 201) {
            console.log('Recipe added successfully!');
            this.$root.toast(
              "Add New Recipe",
              "Recipe was added to my recipes successfully!",
              "success"
            );
          }

          // Reset the form and hide the modal
          this.resetModal();
          this.$nextTick(() => {
            this.$bvModal.hide('modal-prevent-closing');
          });
        } catch (error) {
          console.error("An error occurred", error);
          this.$root.toast(
            "Add New Recipe",
            "Recipe was not added!",
            "danger"
          );
        }
      } else {
        this.$root.toast(
          "Add New Recipe",
          "You must login to add a recipe!",
          "danger"
        );
      }
    },
  },
};
</script>

<style>

.modal-container {
  position: absolute;
  top: 10%; /* 10% from the top of the window */
  left: 0;
  right: 0;
  margin: 0 auto;
  /* max-width: 90%; */
}

#modal-prevent-closing {
  margin-top: 50px;
  max-width: 100%; 
  /* margin-top: 8%;
  max-width: 100%; */
}
.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>



