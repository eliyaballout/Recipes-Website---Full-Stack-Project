<template>
  <div>

    <div id="background"></div>
    <login-form></login-form>
    
  </div>
</template>


<!-- #######################################################################################################
############################################ scripts ################################################## -->

<script>

  import LoginForm from "../components/LoginForm";
  export default {
    name: "LoginPage",
    components: {
      LoginForm
    }
    
  };

</script>


<!-- #######################################################################################################
################################################# css ################################################## -->

<style lang="scss" scoped>

  #background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    margin: 0;
    background-image: url("../assets/Authbg.jpg");
    background-size: cover;
    background-position: center;
    z-index: -1;
    opacity: 0.9;
  }

</style>
