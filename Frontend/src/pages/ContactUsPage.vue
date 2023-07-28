<template>
  <div class="container">
    
    <div id="background"></div>

    <h1 class="title">Contact Us</h1> <br>

    <div class="section">

      <h2 class="section-title">Our Team:</h2> <br>

      <div class="team">
        <div v-for="member in team" :key="member.name" class="member-card">
          <a :href="member.github">
            <img :src="member.img" :alt="member.name" class="avatar img-fluid" />
            <h3 class="member-name">{{ member.name }}</h3>
          </a>
        </div>
      </div>

      <br><br><br><br>

      <h2 class="section-title">If you have any questions contact us at:</h2> <br>

      <div class="team">
        <div v-for="member in team" :key="member.name" class="member-card">
          <a :href="member.mail">
            <img :src="member.mailImg" :alt="member.name" class="mail img-fluid" />
            <h3 class="member-name">{{ member.name }}</h3>
          </a>
        </div>
      </div>

      <br><br><br>

    </div>
  </div>
  
</template>


<!-- #######################################################################################################
############################################ scripts ################################################## -->

<script>

export default {
  name: "ContactUsPage",
  data(){
    return {
      team: [
        {
          name: "Eliya Ballout",
          img: "https://avatars.githubusercontent.com/u/315572677?v=4",
          github: "https://github.com/eliyaballout",
          mail: "mailto:eliyabal@post.bgu.ac.il",
          mailImg: "https://brandeps.com/icon-download/M/Mail-icon-vector-14.svg"
        },
        {
          name: "Muhammad Odetallah",
          img: "https://avatars.githubusercontent.com/u/318872215?v=4",
          github: "https://github.com/mu99ot",
          mail: "mailto:odetalla@post.bgu.ac.il",
          mailImg: "https://brandeps.com/icon-download/M/Mail-icon-vector-14.svg"
        }
      ]
    }
  },
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

.section {
  text-align: center;
  margin-top: 40px;
}

.section-title {
  font-size: 30px;
  margin-bottom: 10px;
  color: #e32b2b;
  font-weight: bold;
}

.team {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.member-card {
  width: 200px;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.avatar {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
}

.member-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.mail {
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-bottom: 10px;
}

.contactUs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

</style>