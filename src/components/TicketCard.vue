<template>
  <div class="p-4 bg-white rounded shadow">
    <h3 class="font-semibold">{{ ticket.title }}</h3>
    <p class="text-sm text-gray-600">{{ ticket.description }}</p>
    <div class="mt-2 flex gap-2">
      <button class="text-sm text-blue-600">Edit</button>
      <button class="text-sm text-red-600">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  ticket: { id: string; title: string; description: string };
}>();
</script>
