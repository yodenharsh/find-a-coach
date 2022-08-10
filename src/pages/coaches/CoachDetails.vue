<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hour</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2>Interested? Reach out now!</h2>
        <base-button link :to="contactLink"> Contact </base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge
        v-for="area in selectedCoach.areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>
      <p>{{ description }}</p></base-card
    >
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
export default defineComponent({
  props: ["id"],
  data() {
    return {
      selectedCoach: {
        firstName: "Please",
        lastName: "Wait",
        areas: ["Loading"],
        hourlyRate: 0,
        description: "loading",
      },
    };
  },
  computed: {
    fullName(): string {
      return this.selectedCoach.firstName + " " + this.selectedCoach.lastName;
    },
    contactLink() {
      return this.$route.path + "/" + this.id + "/contact";
    },
    areas() {
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
    ...mapGetters({
      coaches: "coaches/coaches",
    }),
  },
  created() {
    this.selectedCoach = this.$store.getters["coaches/coaches"].find(
      (coach: { id: string }) => coach.id === this.id
    );
  },
});
</script>
