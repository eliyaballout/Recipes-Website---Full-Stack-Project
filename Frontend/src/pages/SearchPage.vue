<template>
  <div class="container">
    <div id="background"></div>
    <div class="d-flex align-items-center mb-3">
      <div class="flex-grow-1 mr-2">
        <b-form-input
          v-model="text"
          placeholder="Search"
          @focus="openRecentSearches"
          class="w-100"
        ></b-form-input>
      </div>

      <!-- Radio buttons for sort type selection -->
      <b-form-group
        class="sort-type-radio"
        id="sortTypeGroup"
        v-slot="{ ariaDescribedby }"
      >
        <label class="section-label">Sort By:</label>
        <b-form-radio-group
          id="sortTypeGroupRadios"
          v-model="selectedSortType"
          :options="sortOptions"
          :aria-describedby="ariaDescribedby"
          name="sortType"
        ></b-form-radio-group>
        <label class="section-label">Results Per Page:</label>
        <b-form-radio-group
          id="resultsPerPageGroupRadios"
          v-model="resultsPerPage"
          :options="resultsPerPageOptions"
          :aria-describedby="ariaDescribedby"
          name="resultsPerPage"
        ></b-form-radio-group>
      </b-form-group>

      <!-- Search button -->
      <div>
        <button
          @click="search"
          :disabled="text.length === 0"
          class="btn btn-primary ml-2"
        >
          Search
        </button>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <label for="cuisine" class="highlight-label">Cuisine:</label>
        <b-form-select
          v-model="selectedCuisine"
          :options="cuisineOptions"
          placeholder="Select Cuisine"
          class="mb-3"
        ></b-form-select>
      </div>
      <div class="col-md-4">
        <label for="diet" class="highlight-label">Diet:</label>
        <b-form-select
          v-model="selectedDiet"
          :options="dietOptions"
          placeholder="Select Diet"
          class="mb-3"
        ></b-form-select>
      </div>
      <div class="col-md-4">
        <label for="intolerance" class="highlight-label">Intolerance:</label>
        <b-form-select
          v-model="selectedIntolerance"
          :options="intoleranceOptions"
          placeholder="Select Intolerance"
          class="mb-3"
        ></b-form-select>
      </div>
    </div>

    <div
      v-if="showRecentSearches && recentSearches.length > 0"
      class="mt-3 position-relative"
    >
      <small
        class="text-danger font-weight-bold"
        style="text-shadow: 2px 2px 4px rgba(248, 244, 5, 0.89)"
      >
        Recent Searches
      </small>

      <div class="d-flex justify-content-between align-items-center mt-3">
        <button
          class="btn btn-danger btn-sm close-button"
          @click="closeRecentSearches"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <button @click="clearRecentSearches" class="btn btn-danger btn-sm">
          Clear Recent Searches
        </button>
      </div>

      <ul class="list-group mt-3" ref="recentSearchesList">
        <li
          v-for="search in recentSearches"
          :key="search"
          class="list-group-item recent-search-item"
          @click="selectRecentSearch(search)"
        >
          {{ search }}
        </li>
      </ul>
    </div>

    <table width="100%">
      <br /><br />
      <tr>
        <td width="100%">
          <div v-show="searchInitiated">
            <RecipePreviewList
              ref="previewList"
              title="Search Result"
            ></RecipePreviewList>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<!-- #######################################################################################################
############################################ scripts ################################################## -->
<script>
import {
  cuisineOptions,
  dietOptions,
  intoleranceOptions,
  resultsPerPageOptions,
} from "../assets/searchOptions.js";
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  name: "SearchPage",
  components: {
    RecipePreviewList,
  },

  data() {
    return {
      text: "",
      searchInitiated: false,
      recentSearches: [],
      showRecentSearches: false,
      selectedCuisine: undefined,
      cuisineOptions, // Use the imported cuisineOptions
      selectedDiet: undefined,
      dietOptions, // Use the imported dietOptions
      selectedIntolerance: undefined,
      intoleranceOptions, // Use the imported intoleranceOptions
      resultsPerPage: undefined,
      resultsPerPageOptions, // Use the imported resultsPerPageOptions
      selectedSortType: "Default",
      sortOptions: [
        { text: "Default", value: "Default" },
        { text: "Prepare Time", value: "Prepare Time" },
        { text: "Most Popular", value: "Most Popular" },
      ],
    };
  },
  mounted() {
    this.recentSearches = this.getRecentSearches();
    this.resultsPerPage = 5;
  },

  methods: {
    saveSearch(query) {
      const searches = localStorage.getItem("recentSearches");
      const existingSearches = searches ? JSON.parse(searches) : [];
      existingSearches.unshift(query);
      const limitedSearches = existingSearches.slice(0, 10);
      localStorage.setItem("recentSearches", JSON.stringify(limitedSearches));
      this.recentSearches = limitedSearches;
    },
    getRecentSearches() {
      const searches = localStorage.getItem("recentSearches");
      return searches ? JSON.parse(searches) : [];
    },
    async search() {
      console.log("Search initiated with query:", this.text);
      this.closeRecentSearches();
      if (!this.recentSearches.includes(this.text)) {
        this.saveSearch(this.text);
      }
      // Get the selected values for cuisine, diet, and intolerance
      const cuisineType = this.selectedCuisine;
      const dietType = this.selectedDiet;
      const intoleranceType = this.selectedIntolerance;
      const sortBy = this.selectedSortType;

      this.$refs.previewList.searchQuery(
        this.text,
        this.resultsPerPage,
        cuisineType,
        dietType,
        intoleranceType,
        sortBy
      );
      this.searchInitiated = true;
    },

    openRecentSearches(event) {
      event.stopPropagation();
      if (this.recentSearches.length > 0) {
        this.showRecentSearches = true;
      }
    },
    closeRecentSearches() {
      this.showRecentSearches = false;
    },
    clearRecentSearches() {
      localStorage.removeItem("recentSearches");
      this.recentSearches = [];
    },
    selectRecentSearch(search) {
      this.text = search; // Update the search bar with the selected recent search
    },
  },
};
</script>

<!-- #######################################################################################################
################################################# css ################################################## -->

<style lang="scss">
.list-group {
  position: absolute;
  width: calc(100% - 1rem);
  z-index: 1;
  max-width: 100%;
}

.container {
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

.close-button {
  margin-right: 0.5rem;
}

.recent-search-item {
  cursor: pointer;
}
.highlight-label {
  font-weight: bold;
}
.section-label {
  font-weight: bold;
}
</style>
