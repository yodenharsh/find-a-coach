<template>
  <TheHeader></TheHeader>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script lang="ts">
import TheHeader from "./components/TheHeader.vue";
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
export default defineComponent({
  components: { TheHeader },
  methods: {
    ...mapActions({
      tryLogin: "tryLogin",
    }),
  },
  computed: {
    ...mapGetters({
      didAutoLogout: "didAutoLogout",
    }),
  },
  watch: {
    didAutoLogout(curr, old) {
      if (curr && curr !== old) {
        this.$router.replace("/coaches");
      }
    },
  },
  created() {
    this.tryLogin();
  },
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
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
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
