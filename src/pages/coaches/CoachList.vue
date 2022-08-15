<template>
  <div>
    <div v-if="!!error" class="foreground">
      <base-dialog
        title="ERROR"
        :desc="'Please contact the company and send this message : ' + error"
        @close="closeDialog"
      ></base-dialog>
    </div>
    <div :class="[error ? 'background' : null]">
      <coach-filters @change-filter="setFilters"></coach-filters>
      <section>
        <base-card>
          <div class="controls">
            <base-button mode="outline" @click="loadCoaches(true)"
              >Refresh</base-button
            >
            <base-button link to="/auth" v-if="!isLoading && !isAuthenticated"
              >Login or Sign up</base-button
            >
            <base-button
              link
              to="/register"
              v-if="isAuthenticated && !isCoach && !isLoading"
              >Register as coach</base-button
            >
            <!--link = true-->
          </div>
          <div v-if="isLoading">
            <base-spinner></base-spinner>
          </div>
          <ul v-else-if="hasCoaches && !isLoading">
            <coach-item
              v-for="coach in filteredCoaches"
              :key="coach.id"
              :id="coach.id"
              :first-name="coach.firstName"
              :last-name="coach.lastName"
              :rate="coach.hourlyRate"
              :areas="coach.areas"
            ></coach-item>
          </ul>
          <h3 v-else>No coaches available</h3>
        </base-card>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilters from "../../components/coaches/CoachFilter.vue";

interface filters {
  frontend: boolean;
  backend: boolean;
  career: boolean;
}

export default defineComponent({
  components: { CoachItem, CoachFilters },
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      } as filters,
      isLoading: false as boolean,
      error: null as string | null,
    };
  },
  computed: {
    ...mapGetters({
      coachesList: "coaches/coaches",
      hasCoaches: "coaches/hasCoaches",
      isAuthenticated: "isAuthenticated",
    }),
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter((coach: { areas: string | string[] }) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
  },
  methods: {
    setFilters(updatedFilters: {
      frontend: boolean;
      backend: boolean;
      career: boolean;
    }) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches", {
          forceRefresh: refresh,
        });
      } catch (error) {
        if (error instanceof Error) {
          this.error = error.message || "something went wrong :(";
        }
      }
      this.isLoading = false;
    },
    closeDialog() {
      setInterval(() => {
        this.error = null;
      }, 1500);
      this.loadCoaches(true);
    },
  },
  created() {
    this.loadCoaches();
  },
});
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}

.foreground {
  backdrop-filter: blur(10px);
}

.background {
  filter: blur(4px);
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
