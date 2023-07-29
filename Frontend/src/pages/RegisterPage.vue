<template>
  <div class="container">

    <div id="background"></div>

    <h1 class="title" style="text-align: center; font-weight: bolder;">Register</h1> <br><br>

    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">

      <!-- ################### username ################### -->
      <b-form-group id="input-group-username" label-cols-sm="3" label="Username:" label-for="username">

        <b-form-input id="username" v-model="$v.form.username.$model" type="text" :state="validateState('username')"></b-form-input>
        
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required.
        </b-form-invalid-feedback>
        
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long.
        </b-form-invalid-feedback>
        
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username alpha.
        </b-form-invalid-feedback>

      </b-form-group>


      <!-- ################### firstName ################### -->
      <b-form-group id="input-group-firstName" label-cols-sm="3" label="First Name:" label-for="firstName">

        <b-form-input id="firstName" v-model="$v.form.firstName.$model" type="text" :state="validateState('firstName')"></b-form-input>
        
        <b-form-invalid-feedback v-if="!$v.form.firstName.required">
          First name is required.
        </b-form-invalid-feedback>
        
        <b-form-invalid-feedback v-else-if="!$v.form.firstName.length">
          First name length should be at least 2 characters long.
        </b-form-invalid-feedback>
        
        <b-form-invalid-feedback v-if="!$v.form.firstName.alpha">
          Fisrt name alpha.
        </b-form-invalid-feedback>

      </b-form-group>


      <!-- ################### lastName ################### -->
      <b-form-group id="input-group-lastName" label-cols-sm="3" label="Last Name:" label-for="lastName">

        <b-form-input id="lastName" v-model="$v.form.lastName.$model" type="text" :state="validateState('lastName')"> </b-form-input>
        
        <b-form-invalid-feedback v-if="!$v.form.lastName.required">
          Last name is required.
        </b-form-invalid-feedback>
        
        <b-form-invalid-feedback v-else-if="!$v.form.lastName.length">
          Last name length should be at least 2 characters long.
        </b-form-invalid-feedback>
        
        <b-form-invalid-feedback v-if="!$v.form.lastName.alpha">
          Last name alpha.
        </b-form-invalid-feedback>

      </b-form-group>


      <!-- ################### email ################### -->
      <b-form-group id="input-group-email" label-cols-sm="3" label="Email:" label-for="email">

        <b-form-input id="email" v-model="$v.form.email.$model" type="text" :state="validateState('email')"></b-form-input>
        
        <b-form-invalid-feedback v-if="!$v.form.email.required">
          Email is required.
        </b-form-invalid-feedback>
        
        <b-form-invalid-feedback v-else-if="!$v.form.email.length">
          Email length should be at least 2 characters long.
        </b-form-invalid-feedback>
        
        <b-form-invalid-feedback v-if="!$v.form.email.email">
          Email is not valid.
        </b-form-invalid-feedback>

      </b-form-group>


      <!-- ################### country ################### -->
      <b-form-group id="input-group-country" label-cols-sm="3" label="Country:" label-for="country">

        <b-form-select id="country" v-model="$v.form.country.$model" :options="countries" :state="validateState('country')"></b-form-select>
        
        <b-form-invalid-feedback>
          Country is required.
        </b-form-invalid-feedback>

      </b-form-group>


      <!-- ################### password ################### -->
      <b-form-group id="input-group-Password" label-cols-sm="3" label="Password:" label-for="password">

        <b-form-input id="password" type="password" v-model="$v.form.password.$model" :state="validateState('password')"></b-form-input>
        
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required.
        </b-form-invalid-feedback>
        
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br/>
          For that, your password should be also:
        </b-form-text>

        <b-form-invalid-feedback v-if="!$v.form.password.isValid">
          Password must contain at least one number and one special letter.
        </b-form-invalid-feedback>
        
        <b-form-invalid-feedback v-if="$v.form.password.required && !$v.form.password.length">
          Have length between 5-10 characters long.
        </b-form-invalid-feedback>

      </b-form-group>


      <!-- ################### confirm password ################### -->
      <b-form-group id="input-group-confirmedPassword" label-cols-sm="3" label="Confirm Password:" label-for="confirmedPassword">
        
        <b-form-input id="confirmedPassword" type="password" v-model="$v.form.confirmedPassword.$model" :state="validateState('confirmedPassword')"> </b-form-input>
        
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required.
        </b-form-invalid-feedback>
        
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword">
          The confirmed password is not equal to the original password.
        </b-form-invalid-feedback>

      </b-form-group>


      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button type="submit" variant="primary" style="width:250px;" class="ml-5 w-75">Register</b-button>
      

      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here!</router-link>
      </div><br><br>

    </b-form>

    <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>
      Register failed: {{ form.submitError }}
    </b-alert>

  </div>
</template>


<!-- #######################################################################################################
############################################ scripts ################################################## -->

<script>

  import countries from "../assets/countries";
  import {
    required,
    minLength,
    maxLength,
    alpha,
    sameAs,
    email
  } from "vuelidate/lib/validators";

  export default {
    name: "Register",
    data() {
      return {
        form: {
          username: "",
          firstName: "",
          lastName: "",
          country: null,
          password: "",
          confirmedPassword: "",
          email: "",
          submitError: undefined
        },
        countries: [{ value: null, text: "", disabled: true }],
        errors: [],
        validated: false
      };
    },

    validations: {
      form: {
        username: {
          required,
          length: (u) => minLength(3)(u) && maxLength(8)(u),
          alpha
        },
        firstName: {
          required,
          length: (u) => minLength(3)(u) && maxLength(8)(u),
          alpha
        },
        lastName: {
          required,
          length: (u) => minLength(3)(u) && maxLength(8)(u),
          alpha
        },
        email: {
          isValid: function(val) {
            const isNumber = /[0-9]/.test(val);
            const isChar = /[!@#$%^&*]/.test(val);
            return isNumber && isChar;
          },
          required,
          length: (e) => minLength(2)(e),
          email
        },
        country: {
          required
        },
        password: {
          required,
          length: (p) => minLength(5)(p) && maxLength(10)(p)
        },
        confirmedPassword: {
          required,
          sameAsPassword: sameAs("password")
        }
      }
    },

    mounted() {
      this.countries.push(...countries);
    },

    methods: {
      validateState(param) {
        const { $dirty, $error } = this.$v.form[param];
        return $dirty ? !$error : null;
      },

      async Register() {
        try {
          const response = await this.axios.post(
            this.$root.store.server_domain + "/Register",
            {
              username: this.form.username,
              first_name: this.form.firstName,
              last_name: this.form.lastName,
              email: this.form.email,
              country: this.form.country,
              password: this.form.password
            }
          );

          this.$router.push("/login");
        } catch (err) {
          this.$root.toast("Register", err.response.data.message, "danger");
        }
      },

      onRegister() {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
        this.Register();
      },

      onReset() {
        this.form = {
          username: "",
          firstName: "",
          lastName: "",
          country: null,
          password: "",
          confirmedPassword: "",
          email: ""
        };
        this.$nextTick(() => {
          this.$v.$reset();
        });
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
    max-width: 500px;
    border-radius: 10px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    box-shadow: 
      1px 5px 4px rgba(0, 0, 0, 0.3), 
      0 0 10px rgba(255, 255, 255, 0.6),
      0 0 30px rgb(255, 0, 0);

  }

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
