<template>
  <form @submit.prevent="submit">
    <input
      v-model="title"
      placeholder="Title"
      class="w-full p-2 border rounded mb-2"
    />
    <textarea
      v-model="description"
      placeholder="Description"
      class="w-full p-2 border rounded mb-2"
    />
    <button class="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const title = ref("");
const description = ref("");

const submit = () => {
  // emit or store action
};
</script>
