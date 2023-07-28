<template>
  <div class="container">

    <div id="background"></div>

    <table width="100%">
      <tr>
        <th>Explore this recipes</th>
        <th></th>
        <th>Last watched recipes</th>
      </tr> 
      
      <tr>

        <td width="48%">
          <RecipePreviewList ref="previews" title="Random Recipes"></RecipePreviewList> <br><br>
          <b-button variant="danger" size="lg" style="margin-left: 50%;" @click="callGetRandom">Get More!</b-button> <br><br><br>
        </td>

        <td width="4%"></td>

        <div v-if="!$root.store.username">
          <td class="box" style="width:48%;">
            <h1 class="message" style="background-color: rgba(255, 255, 255, 0.815); color: darkred;">You have to login to view this:</h1>
            <LoginForm class="overlay" style="border-radius: 10px;"></LoginForm>
            <RecipePreviewList title="Random Recipes" class="blur"></RecipePreviewList>
          </td>
        </div>

        <div v-else>
          <td width="48%">
            <RecipePreviewList title="Last Watched Recipes"></RecipePreviewList>
          </td>
        </div>    

      </tr>
    </table>

  </div>
</template>


<!-- #######################################################################################################
############################################ scripts ################################################## -->

<script>

  import RecipePreviewList from "../components/RecipePreviewList";
  import LoginForm from "../components/LoginForm";
  export default {
    components: {
      RecipePreviewList,
      LoginForm
    },

    methods: {
      callGetRandom(){
        this.$refs.previews.getRandomRecipes();
      }
    }
  };

</script>


<!-- #######################################################################################################
################################################# css ################################################## -->

<style lang="scss" scoped>

  .container{
    margin-top: 80px;
    max-width: 100%;  
  }

  th {
    color:white;
    font-size:25px;
    font-weight: bold;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }

  #background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    margin: 0;
    background-image: url("../assets/main1.jpg");
    background-size: cover;
    background-position: center;
    z-index: -1;
    opacity: 0.9;
  }

  .blur {
    -webkit-filter: blur(5px);
    filter: blur(5px);
  }

  ::v-deep .blur .recipe-preview {
    pointer-events: none;
    cursor: default;
  }

  .box {
    width: 70%;
    position: absolute;
    opacity: 1;
  }

  .overlay {
    width: 70%;
    position: absolute;
    opacity: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -150%);
    z-index:9;
  }

  .message {
    font-size: 35px;
    font-weight: bolder;
    position: absolute;
    opacity: 1;
    z-index:9;
  }

</style>
