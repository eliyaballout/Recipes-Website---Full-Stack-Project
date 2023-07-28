<template>
  <div id="app">
    <header class="header">
      <div class="header_search">
        <router-link :to="{ name: 'search' }" id="search"
          >Search
          <i
            class="material-icons search__icon"
            id="search"
            style="margin-top: 5px;"
            >search</i
          ></router-link
        >
        <h1
          style="color:rgb(255, 47, 0); text-align: center; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"
        >
          Flavor Fusion
        </h1>
      </div>

      <div>
        <b-button v-b-toggle.sidebar-border id="btn" @click="toggleSidebar"
          >&#9776;</b-button
        >
        <b-sidebar
          id="sidebar-border"
          sidebar-class="border-right border-danger"
          width="280px"
          shadow
          v-model="sidebarVisible"
          @hidden="resetSidebar"
        >
          <div id="nav">
            <b-nav vertical>
              <div v-if="!$root.store.username">
                <h1
                  style="left: 0; font-size: 40px; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;"
                >
                  Hello Guest,
                </h1>
                ____________________________ <br /><br />
                <b-nav vertical>
                  <router-link
                    :to="{ name: 'register' }"
                    class="navItems"
                    @click.native="closeSidebar"
                    >Register</router-link
                  >
                  <router-link
                    :to="{ name: 'login' }"
                    class="navItems"
                    @click.native="closeSidebar"
                    >Login</router-link
                  >
                </b-nav>
              </div>

              <div v-else>
                <b-dropdown
                  id="dropdown"
                  size="x-lg"
                  :text="getName()"
                  variant="primary"
                  no-flip
                >
                  <b-dropdown-item @click="Logout">Logout</b-dropdown-item>
                </b-dropdown>
                ____________________________ <br /><br /><br />

                <b-dropdown
                  id="dropdown-personal"
                  class="navItems"
                  offset="40"
                  dropright
                  text="Personal"
                  variant="primary"
                  no-flip
                >
                  <b-dropdown-item
                    class="dropdownItems"
                    href="#/favorites"
                    @click.native="closeSidebar"
                    >Favorites</b-dropdown-item
                  >
                  <b-dropdown-item
                    class="dropdownItems"
                    href="#/myRecipes"
                    @click.native="closeSidebar"
                    >My Recipes</b-dropdown-item
                  >
                  <b-dropdown-item
                    class="dropdownItems"
                    href="#/familyRecipes"
                    @click.native="closeSidebar"
                    >La Familia</b-dropdown-item
                  >
                </b-dropdown>

                <b-nav vertical>
                  <a href="#" class="navItems" @click="openModal"
                    >Create new recipe</a
                  >
                </b-nav>
              </div>

              <router-link
                :to="{ name: 'main' }"
                class="navItems"
                @click.native="closeSidebar"
                >Home</router-link
              >
              <router-link
                :to="{ name: 'search' }"
                class="navItems"
                @click.native="closeSidebar"
                >Search</router-link
              >
            </b-nav>
          </div>

          <footer class="footer">
            <b-nav vertical>
              <router-link
                :to="{ name: 'about' }"
                class="navItems"
                @click.native="closeSidebar"
                >About</router-link
              >
              <router-link
                :to="{ name: 'contactUs' }"
                class="navItems"
                @click.native="closeSidebar"
                >Contact Us</router-link
              >
            </b-nav>
          </footer>
        </b-sidebar>
      </div>
    </header>
    <CreateNewRecipeModal v-show="isModalOpen" @close="closeModal" />
    <router-view />
  </div>
</template>

<!-- #######################################################################################################
############################################ scripts ################################################## -->

<script>
import CreateNewRecipeModal from "./components/CreateNewRecipeModal";
export default {
  name: "App",
  components: {
    CreateNewRecipeModal,
  },

  data() {
    return {
      sidebarVisible: false,
      isModalOpen: false,
      isClicked: false,
      textcolor: "",
    };
  },
  
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },

    closeSidebar() {
      this.sidebarVisible = false;
    },

    resetSidebar() {
      this.sidebarVisible = false;
    },

    Logout() {
      this.sidebarVisible = false;
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },

    getName() {
      return this.$root.store.username;
    },

    openModal() {
      this.$root.$emit("bv::show::modal", "modal-prevent-closing");
      this.isModalOpen = true;
      this.sidebarVisible = false;
    },

    closeModal() {
      this.isModalOpen = false;
    },

    changeTextColor(event) {
      event.target.classList.add("dropdownItems");
      this.isClicked = !this.isClicked;
    },
  },

  beforeRouteUpdate(to, from, next) {
    this.resetSidebar();
    next();
  },
};
</script>

<!-- #######################################################################################################
################################################# css ################################################## -->

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: #001aff;
}

.navItems {
  color: #000000;
  text-align: center;
  font-size: 20px;
  padding: 8px 8px 8px 0px;
}

.navItems:hover {
  background: #8b828e;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #ea2a2a, 0 0 25px #443b48, 0 0 50px #726a75,
    0 0 100px #b0a6b5;
}

#sidebar-border {
  background-color: #ff0000;
}

#dropdown-personal {
  display: flex;
  justify-content: center;
}

#dropdown {
  display: flex;
}

#dropdown .dropdown-toggle {
  margin-top: 0;
  background-color: #000000;
  font-size: x-large;
  font-weight: bolder;
}

#dropdown-personal .dropdown-toggle {
  background-color: white;
  font-size: large;
  font-weight: bolder;
  color: #000000;
  padding: 8px 8px 8px 0px;
}

#dropdown-personal .dropdown-toggle-exact-active {
  color: #001aff;
}

.dropdownItems:active .dropdown-item {
  color: #001aff !important;
}

#btn {
  top: 0px;
  margin: 0;
  text-align: left;
  position: fixed;
  font-size: 35px;
  cursor: pointer;
  background-color: transparent;
  color: white;
  border: none;
}

#btn:hover {
  color: #ff0000;
  text-decoration: none;
  cursor: pointer;
}

#search:hover {
  color: #00ff00;
  text-decoration: none;
  cursor: pointer;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  font-weight: bold;
}

.footer a.router-link:hover {
  background: #8b828e;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #ea2a2a, 0 0 25px #443b48, 0 0 50px #726a75,
    0 0 100px #b0a6b5;
}

.footer a.router-link-exact-active {
  color: #001aff;
}

.header {
  z-index: 1050;
  top: 0;
  position: fixed;
  width: 100%;
  background: #545050;
  color: #fff;
  padding: 2px;
}

#search {
  float: right;
  font-size: 20px;
  margin-top: 10px;
  margin-right: 5px;
  color: white;
}
</style>
