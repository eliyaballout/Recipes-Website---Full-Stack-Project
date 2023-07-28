<template>
  <div class="container">

    <div id="background"></div>

    <div v-if="recipe">
      <table width="100%"> 
        <tr>

          <td width="55%">
            <h1 style="text-align: center; font-weight: bolder;font-size: 45px; font-family:Georgia, 'Times New Roman', Times, serif;">{{ recipe.title }}</h1>
            <br><br>
            
            <h2 v-if="isFromFamily"><span style="font-weight: bold;">Made by:</span> <span style="color: red; font-weight: bold;">{{ recipe.owner }}</span></h2>
            <h2 v-if="isFromFamily"><span style="font-weight: bold;">Prepared in:</span> <span style="color: rgb(149, 0, 255); font-weight: bold;">{{ recipe.whenToPrepare }}</span><br><br><br></h2>

            <h2><span style="font-weight: bold;">Total Time:</span> <span style="color: red; font-weight: bold;">{{ recipe.readyInMinutes }}</span> minutes</h2>
            <h2 v-if="!isFromFamily && !isFromMyRecipes"><span style="color: red; font-weight: bold;">{{ recipe.popularity }}</span> likes</h2>
            <h2 v-if="!isFromFamily"><span style="font-weight: bold;">Servings: </span> <span style="color: red; font-weight: bold;">{{ recipe.servings }}</span></h2><br><br>
           
            <div class="centered-list">
              <ul>
                <li v-if="recipe.vegetarian">
                  <span :style="recipe.vegetarian ? 'color: green' : 'color: red'">
                    <img src="@/assets/vegetarian.png" width="47" height="47">
                    {{ recipe.vegetarian ? 'Vegetarian' : ''}}
                  </span>
                </li>

                <li v-if="recipe.vegan">
                  <span :style="recipe.vegan ? 'color: purple;' : 'color: red;'">
                    <img src="@/assets/vegan.png" width="47" height="47">
                    {{ recipe.vegan ? 'vegan' : 'Not vegan' }}
                  </span><br>
                </li>

                <li v-if="recipe.glutenFree">
                  <span :style="recipe.glutenFree ? 'color: blue' : 'color: red;'">
                    <img src="@/assets/glutenFree.png" width="47" height="47">
                    {{ recipe.glutenFree ? 'No gluten' : 'With gluten' }}
                  </span>
                </li>
              </ul>
            </div>
          </td>
          
          <td width="45%">
            <img :src="recipe.image" class="center" />
          </td>

        </tr>

        <tr>
          <td colspan="2">
            <br><br>
            <hr>
            <br>
          </td>
        </tr>

        <tr>
          <td colspan="2">
            <div class="recipe-body">

              <div class="wrapper">
                <div class="wrapped">
                  <h3><u>Ingredients:</u></h3> <br>
                  <ul v-if="!isFromFamily && !isFromMyRecipes">
                    <li v-for="(r, index) in recipe.extendedIngredients" :key="index + '_' + r.id" style="font-weight: bold; font-size: x-large; color: red;">
                      <h4 style="font-size:x-large; color: black; font-weight: bold;">{{ r.original }}</h4>
                    </li>
                  </ul>

                  <ul v-else>
                    <li v-for="(value, key) in recipe.ingredients" :key="key" style="font-weight: bold; font-size: x-large; color: red;">
                      <h4 style="font-size:x-large; color: black; font-weight: bold;">{{ value }}</h4>
                    </li>
                  </ul>

                </div>

                <div class="wrapped">
                  <h3><u>Instructions:</u></h3> <br>
                  <ol v-if="!isFromFamily && !isFromMyRecipes">
                    <li v-for="s in recipe._instructions" :key="s.number" style="font-weight: bold; font-size: x-large; color: red;">
                      <h4 style="font-size:x-large; color: black; font-weight: bold;">{{ s.step }}</h4>
                    </li>
                  </ol>

                  <ol v-else>
                    <li style="font-weight: bold; font-size: x-large; color: red;">
                      <h4 style="font-size:x-large; color: black; font-weight: bold;">{{ recipe.instructions }}</h4>
                    </li>
                  </ol>

                </div>
              </div>
            </div>
          </td>
        </tr>

      </table>
    </div>

  </div>
</template>


<!-- #######################################################################################################
############################################ scripts ################################################## -->

<script>

  export default {
    name: "RecipeViewPage",
    data() {
      return {
        isFromFamily: false,
        isFromMyRecipes: false,
        recipe: null        
      };
    },
    
    async created() {
      this.isFromFamily = this.$route.params.family === true;
      this.isFromMyRecipes = this.$route.params.myRecipe === true;

      try {
        let response;

        try {
          if (this.isFromFamily){
            response = await this.axios.get(
              this.$root.store.server_domain + "/users/familyRecipes/" + this.$route.params.id,
              { withCredentials: true }
            );
          }

          else if (this.isFromMyRecipes){
            response = await this.axios.get(
              this.$root.store.server_domain + "/users/myAllRecipes/" + this.$route.params.id,
              { withCredentials: true }
            );
          }

          else{
            response = await this.axios.get(
              this.$root.store.server_domain + "/recipes/" + this.$route.params.recipeId,
              { withCredentials: true }
            );
          }
          
          if (response.status !== 200) this.$router.replace("/NotFound");
        } catch (error) {
          console.log("error.response.status", error.response.status);
          this.$router.replace("/NotFound");
          return;
        }

        if (this.isFromFamily || this.isFromMyRecipes){
          this.recipe = response.data[0];
        }

        else{
          let {
            analyzedInstructions,
            instructions,
            extendedIngredients,
            popularity,
            readyInMinutes,
            image,
            title
          } = response.data;

          let _instructions = analyzedInstructions
            .map((fstep) => {
              fstep.steps[0].step = fstep.name + fstep.steps[0].step;
              return fstep.steps;
            })
            .reduce((a, b) => [...a, ...b], []);

          let _recipe = {
            instructions,
            _instructions,
            analyzedInstructions,
            extendedIngredients,
            popularity,
            readyInMinutes,
            image,
            title
          };

          this.recipe = _recipe;
        }
        
      } catch (error) {
        console.log(error);
      }
    }
  };

</script>


<!-- #######################################################################################################
################################################# css ################################################## -->

<style scoped>

  .container{
    margin-top: 80px;
    max-width: 100%;  
  }

  #background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    margin: 0;
    background-image: url("../assets/RecipeView.jpg");
    background-size: cover;
    background-position: center;
    z-index: -1;
    opacity: 0.9;
  }

  h2 {
    text-align: center;
    font-size:x-large;
  }

  .centered-list {
    text-align: center;
    font-size:x-large;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .centered-list ul {
    list-style:disc;
    text-align: center;
  }

  .centered-list li {
    margin-bottom: 10px;
  }

  hr {
    border: none;
    border-top: 4px solid;
    font-weight: bold;
  }

  h3 {
    font-size: 28px;
    color: red;
    font-weight: bold;
  }

  .wrapper {
    display: flex;
  }

  .wrapped {
    width: 50%;
  }

  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  }

</style>