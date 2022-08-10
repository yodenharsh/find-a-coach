<template>
  <div class="foreground" v-if="!isValid">
    <base-dialog
      title="Invalid information"
      desc="Please enter valid information"
      @close="closeDialog"
    ></base-dialog>
  </div>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">First name</label>
      <input
        type="text"
        id="firstname"
        @blur="clearValidity('firstName')"
        v-model.trim="firstName.val"
      />
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Last name</label>
      <input
        type="text"
        id="lastname"
        @blur="clearValidity('lastName')"
        v-model.trim="lastName.val"
      />
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      ></textarea>
    </div>
    <div
      class="form-control"
      @blur="clearValidity('rate')"
      :class="{ invalid: !rate.isValid }"
    >
      <label for="rate">Hourly rate</label>
      <input type="number" id="rate" v-model.number="rate.val" />
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">Front-end development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="backend">Back-end development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
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

interface strInput {
  val: string;
  isValid: boolean;
}
interface numInput {
  val: number;
  isValid: boolean;
}
interface strArrayInput {
  val: string[];
  isValid: boolean;
}

export default defineComponent({
  data() {
    return {
      firstName: {
        val: "",
        isValid: true,
      } as strInput,
      lastName: {
        val: "",
        isValid: true,
      } as strInput,
      description: {
        val: "",
        isValid: true,
      } as strInput,
      rate: {
        val: -1,
        isValid: true,
      } as numInput,
      areas: {
        val: [],
        isValid: true,
      } as strArrayInput,
      isValid: true as boolean,
    };
  },
  emits: ["valid", "save-data"],
  methods: {
    clearValidity(input: string) {
      if (input === "areas") this.areas.isValid = true;
      if (input === "firstName") this.firstName.isValid = true;
      if (input === "lastName") this.lastName.isValid = true;
      if (input === "description") this.description.isValid = true;
      if (input === "rate") this.rate.isValid = true;
    },

    submitForm() {
      if (!this.isFormValid()) {
        this.$emit("valid", this.isValid);
      } else {
        const formData: form = {
          first: this.firstName.val,
          last: this.lastName.val,
          desc: this.description.val,
          rate: this.rate.val,
          areas: this.areas.val,
        };
        this.$emit("save-data", formData);
      }
    },
    closeDialog() {
      this.isValid = true;
      this.$emit("valid", this.isValid);
    },
    isFormValid(): boolean {
      this.isValid = true;
      if (this.firstName.val == "") {
        this.firstName.isValid = false;
        this.isValid = false;
      }
      if (this.lastName.val === "") {
        this.lastName.isValid = false;
        this.isValid = false;
      }
      if (this.description.val === "") {
        this.description.isValid = false;
        this.isValid = false;
      }
      if (this.rate.val < 0) {
        this.rate.isValid = false;
        this.isValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.isValid = false;
      }
      return this.isValid;
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
