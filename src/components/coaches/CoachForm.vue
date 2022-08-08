<template>
  <div class="foreground" v-if="!isValid">
    <base-dialog
      title="Invalid information"
      desc="Please enter valid information"
      @close="closeDialog"
    ></base-dialog>
  </div>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="firstname">First name</label>
      <input type="text" id="firstname" v-model.trim="firstName" />
    </div>
    <div class="form-control">
      <label for="lastname">Last name</label>
      <input type="text" id="lastname" v-model.trim="lastName" />
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <textarea id="description" rows="5" v-model.trim="description"></textarea>
    </div>
    <div class="form-control">
      <label for="rate">Hourly rate</label>
      <input type="number" id="rate" v-model.number="rate" />
    </div>
    <div class="form-control">
      <h3>Areas of expertise</h3>
      <div>
        <input type="checkbox" id="frontend" value="frontend" v-model="areas" />
        <label for="frontend">Front-end development</label>
      </div>
      <div>
        <input type="checkbox" id="backend" value="backend" v-model="areas" />
        <label for="backend">Back-end development</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career" v-model="areas" />
        <label for="career">Career advisory</label>
      </div>
    </div>
    <base-button> Register </base-button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface form {
  first: string;
  last: string;
  desc: string;
  rate: number;
  areas: string[];
}

export default defineComponent({
  data() {
    return {
      firstName: "" as string,
      lastName: "" as string,
      description: "" as string,
      rate: 0 as number,
      areas: [] as string[],
      isValid: true as boolean,
    };
  },
  emits: ["valid"],
  methods: {
    submitForm() {
      if (
        this.firstName === "" ||
        this.lastName === "" ||
        this.description === "" ||
        this.areas === []
      ) {
        this.isValid = false;
        this.$emit("valid", this.isValid);
      } else {
        const formData: form = {
          first: this.firstName,
          last: this.lastName,
          desc: this.description,
          rate: this.rate,
          areas: this.areas,
        };
      }
    },
    closeDialog() {
      this.isValid = true;
      this.$emit("valid", this.isValid);
    },
  },
});
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

.foreground {
  backdrop-filter: blur(10px);
}
</style>