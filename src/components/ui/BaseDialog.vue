<template>
  <teleport to="body">
    <transition name="dialog">
      <div>
        <dialog open>
          <h2>{{ title }}</h2>
          <h4>{{ desc }}</h4>
          <base-button @click="$emit('close')">Close</base-button>
        </dialog>
      </div>
    </transition>
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
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 0;
  transform: scale(1);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}
.dialog-leave-active {
  transition: all 0.3s ease-in;
}
</style>
