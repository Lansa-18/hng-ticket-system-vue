<template>
  <div
    class="bg-white shadow-sm rounded-lg p-4 sm:p-5 hover:shadow-md transition-shadow border border-gray-100"
  >
    <div
      class="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-4"
    >
      <div class="flex-1 min-w-0">
        <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-1">
          {{ ticket.title }}
        </h3>
        <p class="text-sm text-gray-600 line-clamp-2">
          {{ ticket.description }}
        </p>
      </div>
    </div>
    <div class="mt-3 sm:mt-4 flex flex-row justify-end gap-3 sm:gap-4">
      <button
        @click="$emit('edit', ticket)"
        class="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
      >
        Edit
      </button>
      <button
        @click="$emit('delete', ticket)"
        class="text-xs sm:text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MinimalTicket } from "@/lib/tickets";

const props = defineProps<{
  ticket: MinimalTicket;
}>();

const emit = defineEmits<{
  (e: "edit", ticket: MinimalTicket): void;
  (e: "delete", ticket: MinimalTicket): void;
}>();
</script>
