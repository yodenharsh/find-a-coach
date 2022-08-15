<template>
  <div>
    <div class="foreground" v-if="!!error">
      <base-dialog
        title="ERROR"
        :desc="'Please send this message to the company: ' + error"
        @close="closeDialog"
      ></base-dialog>
      <p>Should appear</p>
    </div>
    <section v-if="!error" :class="[error ? 'background' : null]">
      <base-card>
        <header>
          <h2>Requests received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests && !isLoading">
          <request-item
            v-for="request in requests"
            :key="request.id"
            :email="request.userEmail"
            :message="request.message"
          ></request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3></base-card
      >
    </section>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  data() {
    return {
      isLoading: false as boolean,
      error: null as string | null,
    };
  },
  components: { RequestItem },
  computed: {
    ...mapGetters({
      requests: "requests/requests",
      hasRequests: "requests/hasRequests",
    }),
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("requests/fetchRequests");
      } catch (error) {
        if (error instanceof Error) {
          this.error = error.message || "something failed";
        }
      }
      this.isLoading = false;
    },
    closeDialog() {
      this.error = null;
      this.loadRequests();
    },
  },
  created() {
    this.loadRequests();
  },
});

import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import RequestItem from "../../components/requests/RequestItem.vue";
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
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
