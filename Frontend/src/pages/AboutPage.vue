<template>
  <div class="container">

    <div id="background"></div>

    <h1 class="title">About Us</h1>

    <br><br>

    <div class="content">

      <p style="font-size: larger; font-weight: bold; text-align: center;">
        Welcome to Flavor Fusion! <br>
        We are passionate about cooking and sharing delicious recipes with food enthusiasts like you.
        Whether you're a seasoned chef or a beginner in the kitchen, our goal is to inspire and guide you on your culinary journey.
        From mouthwatering appetizers to delectable main courses and delightful desserts, we have a wide range of recipes to satisfy every palate. <br>
        Our team of experienced chefs and food enthusiasts curate and test each recipe to ensure they are easy to follow and yield fantastic results. <br>
        Join us as we explore the flavors of different cuisines, discover unique cooking techniques, and embrace the joy of creating incredible dishes. <br>
        Get ready to tantalize your taste buds and elevate your cooking skills with our collection of amazing recipes. Happy cooking!
      </p>

      <br><br>

      <div class="about-section">

        <h2 class="section-title">Our previous projects:</h2> <br>

        <div class="previous-projects">
          <a href="https://web-development-environments-2023.github.io/208082768/" class="link">First Assignment - Eliya</a><br>
          <a href="https://web-development-environments-2023.github.io/206986762/" class="link">First Assignment - Muhammad</a><br>
          <a href="https://web-development-environments-2023.github.io/assignment2-208082768_206986762/#" class="link">Second Assignment - Space Invaders Game!</a><br><br>
        </div>

      </div><br>

    </div>
  </div>

</template>


<!-- #######################################################################################################
############################################ scripts ################################################## -->

<script>

  export default {
    name: "AboutPage",
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
    background-image: url("../assets/about.jpg");
    background-size: cover;
    background-position: center;
    z-index: -1;
    opacity: 0.9;
  }

  .title {
    color:rgb(0, 0, 0);
    text-align: center;
    font-size:45px;
    font-weight: bolder;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }

  .content {
    font-size: 18px;
    line-height: 1.6;
    color: #160303;
  }

  .about-section {
    text-align: center;
    margin-top: 40px;
  }

  .section-title {
    font-size: 30px;
    margin-bottom: 10px;
    color: #e32b2b;
    font-weight: bold;
  }

  .link {
    font-size: 20px;
    font-weight: bold;
    line-height: 1.6;
    color: #ffffff;
    text-decoration: none;
    display: inline-block;
    padding: 5px 10px;
    background-color: #000000;
    border: 0px solid #ddd;
    border-radius: 10px;
    transition: background-color 0.3s ease;
    margin-bottom: 10px;
  }

  .link:hover {
    background-color: #e0e0e0;
    color: #333;
  }

</style>