<template>
  <coach-filters @change-filter="setFilters"></coach-filters>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button link to="/register" v-if="!isCoach"
          >Register as coach</base-button
        >
        <!--link = true-->
      </div>
      <ul v-if="hasCoaches">
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
    };
  },
  computed: {
    ...mapGetters({
      coachesList: "coaches/coaches",
      hasCoaches: "coaches/hasCoaches",
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
</style>
