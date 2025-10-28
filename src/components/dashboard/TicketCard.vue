<template>
  <div
    class="bg-white shadow-sm rounded-lg p-4 flex flex-col gap-4 border border-gray-200"
  >
    <div class="flex items-start justify-between gap-4">
      <div class="space-y-1 flex-1">
        <h3 class="font-medium text-gray-900">{{ ticket.title }}</h3>
        <p class="text-sm text-gray-600">{{ ticket.description }}</p>
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          class="h-8 w-8 p-0 text-gray-600 hover:text-blue-600"
          @click="$emit('edit', ticket)"
        >
          <Pencil class="h-4 w-4" />
          <span class="sr-only">Edit</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          class="h-8 w-8 p-0 text-gray-600 hover:text-red-600"
          @click="$emit('delete', ticket)"
        >
          <Trash2 class="h-4 w-4" />
          <span class="sr-only">Delete</span>
        </Button>
      </div>
    </div>
    <div class="flex items-center justify-between">
      <div
        :class="[
          'px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
          {
            'bg-green-100 text-green-800': ticket.status === 'open',
            'bg-yellow-100 text-yellow-800': ticket.status === 'in-progress',
            'bg-gray-100 text-gray-800': ticket.status === 'closed',
          },
        ]"
      >
        {{ ticket.status }}
      </div>
      <span class="text-xs text-gray-500">
        {{ new Date(ticket.createdAt).toLocaleDateString() }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Ticket } from "@/lib/tickets";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-vue-next";

defineProps<{
  ticket: Ticket;
}>();

defineEmits<{
  (e: "edit", ticket: Ticket): void;
  (e: "delete", ticket: Ticket): void;
}>();
</script>
