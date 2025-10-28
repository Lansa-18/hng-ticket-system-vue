<template>
  <Dialog :open="modelValue" @update:open="emit('update:modelValue', $event)">
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>
          {{ ticket ? "Edit Ticket" : "Create New Ticket" }}
        </DialogTitle>
        <DialogDescription>
          {{
            ticket
              ? "Make changes to your ticket here."
              : "Fill in the details for your new ticket."
          }}
        </DialogDescription>
      </DialogHeader>
      <TicketForm
        :ticket="ticket"
        @submit="onSubmit"
        @cancel="$emit('update:modelValue', false)"
      />
      <DialogClose />
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { type Ticket } from "@/lib/tickets";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import TicketForm from "./TicketForm.vue";

const props = defineProps<{
  modelValue: boolean;
  ticket?: Ticket;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (
    e: "submit",
    data: { title: string; description: string; status: string }
  ): void;
}>();

const onSubmit = (data: {
  title: string;
  description: string;
  status: string;
}) => {
  emit("submit", data);
};
</script>
