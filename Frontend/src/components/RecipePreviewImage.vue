<template>
  <div class="image">
    <b-card
      overlay
      :img-src="recipeObject.image"
      img-alt="Image"
      class="card-image-link"
    >
      <b-card-text class="middle">
        <div class="text">Click here!</div>
      </b-card-text>
    </b-card>
  </div>
</template>

<!-- #######################################################################################################
############################################ scripts ################################################## -->

<script>
export default {
  props: {
    recipeObject: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async handleClick(recipeID) {
      this.$emit("handle-click", recipeID);
    },
  },
};
</script>


<!-- #######################################################################################################
################################################# css ################################################## -->


<style scoped>
.card-image-link {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
  transition: 0.5s ease;
  backface-visibility: hidden;
}

.image:hover .card-image-link {
  opacity: 0.3;
}

.middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.image:hover .middle {
  opacity: 1;
}

.text {
  background-color: #04aa6d;
  color: white;
  font-size: 16px;
  padding: 16px 32px;
}
</style>