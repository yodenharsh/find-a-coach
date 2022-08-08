<template>
  <section :class="[!validOrNot ? 'background' : null]">
    <base-card>
      <h2>Register as a coach now!</h2>
      <CoachForm @valid="changeClass"></CoachForm>
    </base-card>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CoachForm from "../../components/coaches/CoachForm.vue";
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
