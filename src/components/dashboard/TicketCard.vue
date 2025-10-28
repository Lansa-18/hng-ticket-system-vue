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
      <div class="flex items-center gap-2">
        <span
          :class="[
            'px-2.5 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full whitespace-nowrap',
            getStatusColor(ticket.status),
          ]"
        >
          {{ ticket.status.replace("-", " ") }}
        </span>
      </div>
    </div>

    <div
      class="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
    >
      <div class="text-xs sm:text-sm text-gray-500 space-y-1">
        <p>Created: {{ formatDate(ticket.createdAt) }}</p>
        <p>Last Updated: {{ formatDate(ticket.updatedAt) }}</p>
      </div>

      <div class="flex items-center gap-3 sm:gap-4">
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
  </div>
</template>

<script setup lang="ts">
import { type Ticket } from "@/lib/tickets";

const props = defineProps<{
  ticket: Ticket;
}>();

const emit = defineEmits<{
  (e: "edit", ticket: Ticket): void;
  (e: "delete", ticket: Ticket): void;
}>();

function getStatusColor(status: string) {
  switch (status) {
    case "open":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20";
    case "in-progress":
      return "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20";
    case "closed":
      return "bg-gray-100 text-gray-700 ring-1 ring-gray-600/20";
    default:
      return "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20";
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
</script>
