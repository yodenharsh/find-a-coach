<template>
  <teleport to="body">
    <dialog open>
      <h2>{{ title }}</h2>
      <h4>{{ desc }}</h4>
      <base-button @click="$emit('close')">Close</base-button>
    </dialog>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: false,
      default: "",
    },
    desc: {
      type: String,
      required: false,
      default: "",
    },
  },
  emits: ["close"],
});
</script>

<style scoped>
dialog {
  margin-top: 10rem;
}
</style>
