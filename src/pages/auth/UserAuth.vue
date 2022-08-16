<template>
  <div>
    <div class="foreground">
      <base-dialog
        v-if="!!error"
        title="An error occurred"
        :desc="error"
        @close="handleError"
      ></base-dialog>
    </div>
    <div class="foreground">
      <base-dialog
        v-if="isLoading"
        title="Authenticating"
        desc="Please wait..."
      >
        <base-spinner></base-spinner
      ></base-dialog>
    </div>
    <div v-if="!isLoading" :class="[error ? 'background' : null]">
      <base-card>
        <form @submit.prevent="submitForm">
          <div class="form-control">
            <label for="email">E-Mail</label>
            <input type="email" id="email" v-model.trim="email" />
          </div>
          <div class="form-control">
            <label for="password">Password</label>
            <input type="password" id="password" v-model.trim="password" />
          </div>
          <p v-if="!formIsValid">
            Invalid email address or password length is less than 6 characters
          </p>
          <base-button>{{ submitButtonCaption }}</base-button>
          <base-button type="button" mode="flat" @click="switchAuthMode">{{
            switchModeButtonCaption
          }}</base-button>
        </form>
      </base-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface authDetails {
  email: string;
  password: string;
}

export default defineComponent({
  data() {
    return {
      email: "" as string,
      password: "" as string,
      formIsValid: true as boolean,
      mode: "login" as string,
      isLoading: false as boolean,
      error: null as string | null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Sign Up";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Sign up instead";
      } else {
        return "Login instead";
      }
    },
  },
  methods: {
    async submitForm() {
      //eslint-disable-next-line
      var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!this.email.match(mailFormat) || this.password.length < 6) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;

      const actionPayload: authDetails = {
        email: this.email,
        password: this.password,
      };

      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", actionPayload);
        } else {
          await this.$store.dispatch("signup", actionPayload);
        }
        const redirectURL: string =
          "/" + (this.$route.query.redirect || "coaches");
        this.$router.replace(redirectURL);
      } catch (error) {
        if (error instanceof Error) {
          this.error =
            error.message || "Failed to Authenticate. Please try again later.";
        }
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    handleError() {
      this.error = null;
    },
  },
});
</script>

<style scoped>
form {
  margin: 1rem;

  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
