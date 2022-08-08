<template>
  <TheHeader></TheHeader>
  <router-view> </router-view>
</template>

<script lang="ts">
import TheHeader from "./components/TheHeader.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { TheHeader },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}
</style>
