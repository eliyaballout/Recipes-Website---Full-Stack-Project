<template>
  <div class="container">

    <div id="background"></div>

    <table width="100%">
      <tr>
        <th id="title">My Recipes</th>
      </tr> <br>

      <tr>

        <td width="100%">
          <RecipePreviewList title="My Recipes"></RecipePreviewList>
        </td>
        
      </tr>
    </table>

  </div>
</template>


<!-- #######################################################################################################
############################################ scripts ################################################## -->

<script>

import RecipePreviewList from "../components/RecipePreviewList";
export default {
  name: "MyRecipesPage",
  components: {
    RecipePreviewList,
  }
};

</script>


<!-- #######################################################################################################
################################################# css ################################################## -->

<style lang="scss">

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
background-image: url("../assets/background.jpg");
background-size: cover;
background-position: center;
z-index: -1;
opacity: 0.9;
}

#title {
  color:rgb(0, 0, 0);
  text-align: center;
  font-size:40px;
  font-weight: bolder;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

</style>