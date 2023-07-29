<template>
  <div class="container">

    <h1 class="title" style="text-align: center; font-weight: bolder;">Login</h1> <br><br>

    <b-form @submit.prevent="onLogin">

      <b-form-group id="input-group-Username" label-cols-sm="3" label="Username:" label-for="Username">    
        <b-form-input id="Username" v-model="$v.form.username.$model" type="text" :state="validateState('username')"></b-form-input>
        <b-form-invalid-feedback>Username is required.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-Password" label-cols-sm="3" label="Password:" label-for="Password">
        <b-form-input id="Password" type="password" v-model="$v.form.password.$model" :state="validateState('password')"> </b-form-input>
        <b-form-invalid-feedback>Password is required.</b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary" style="width:100px;display:block;" class="mx-auto w-100">Login</b-button>

      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register in here</router-link>
      </div><br><br>

    </b-form>
    
    <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>Login failed: {{ form.submitError }}</b-alert>

  </div>
</template>


<!-- #######################################################################################################
############################################ scripts ################################################## -->

<script>

  import { required } from "vuelidate/lib/validators";
  export default {
    name: "LoginForm",
    data() {
      return {
        form: {
          username: "",
          password: "",
          submitError: undefined
        }
      };
    },
    
    validations: {
      form: {
        username: {
          required
        },
        password: {
          required
        }
      }
    },

    methods: {
      validateState(param) {
        const { $dirty, $error } = this.$v.form[param];
        return $dirty ? !$error : null;
      },

      async Login() {
        try {
          this.axios.defaults.withCredentials = true;
          const response = await this.axios.post(
            this.$root.store.server_domain +"/Login",
            {
              username: this.form.username,
              password: this.form.password
            }
          );
          this.axios.defaults.withCredentials = false;

          this.$root.store.login(this.form.username);
          if (!(this.$route.name === "main")){
            this.$router.push("/");
          }
        } catch (err) {
          this.$root.toast("Login", err.response.data.message, "danger");
          this.axios.defaults.withCredentials = false;
        }
      },

      onLogin() {
        this.form.submitError = undefined;
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }

        this.Login();
      }

    }
  };

</script>


<!-- #######################################################################################################
################################################# css ################################################## -->

<style lang="scss" scoped>

  .container {
    background-color: rgb(182, 180, 180);
    margin-top: 120px;
    max-width: 400px;
    border-radius: 10px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    box-shadow: 
      1px 5px 4px rgba(0, 0, 0, 0.3), 
      0 0 10px rgba(255, 255, 255, 0.6),
      0 0 30px rgb(0, 234, 255);
  }

</style>