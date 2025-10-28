<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
    <div class="flex justify-between items-start gap-4">
      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-semibold text-gray-900 truncate">
          {{ ticket.title }}
        </h3>
        <p class="mt-1 text-sm text-gray-600">{{ ticket.description }}</p>
        <div class="mt-2 flex items-center gap-2">
          <span
            :class="[
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
              {
                'bg-green-100 text-green-800': ticket.status === 'open',
                'bg-yellow-100 text-yellow-800':
                  ticket.status === 'in-progress',
                'bg-gray-100 text-gray-800': ticket.status === 'closed',
              },
            ]"
          >
            {{ ticket.status }}
          </span>
          <span class="text-xs text-gray-500">
            Created {{ new Date(ticket.createdAt).toLocaleDateString() }}
          </span>
        </div>
      </div>
      <div class="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          @click="$emit('edit', ticket)"
          class="flex items-center"
        >
          <Pencil class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          @click="$emit('delete', ticket)"
          class="flex items-center text-red-600 hover:text-red-700"
        >
          <Trash class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-vue-next";
import type { Ticket } from "@/lib/tickets";

defineProps<{
  ticket: Ticket;
}>();

defineEmits<{
  (e: "edit", ticket: Ticket): void;
  (e: "delete", ticket: Ticket): void;
}>();
</script>
