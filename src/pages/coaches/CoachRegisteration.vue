<template>
  <section :class="[!validOrNot ? 'background' : null]">
    <base-card>
      <h2>Register as a coach now!</h2>
      <CoachForm @valid="changeClass" @save-data="saveData"></CoachForm>
    </base-card>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CoachForm from "../../components/coaches/CoachForm.vue";

interface form {
  first: string;
  last: string;
  desc: string;
  rate: number;
  areas: string[];
}

export default defineComponent({
  components: { CoachForm },
  data() {
    return {
      validOrNot: true,
    };
  },
  methods: {
    changeClass(isValid: boolean) {
      this.validOrNot = isValid;
    },
    saveData(data: form) {
      this.$store.dispatch("coaches/registerCoach", data);
      this.$router.replace("/coaches"); //replace doesn't let you go back to page where you came from
      //this.$router.push("/coaches");
    },
  },
});
</script>

<style scoped>
.background {
  filter: blur(4px);
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
