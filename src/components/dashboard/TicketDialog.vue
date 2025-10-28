<template>
  <Dialog
    class="p-4"
    :open="modelValue"
    @update:open="emit('update:modelValue', $event)"
  >
    <DialogContent
      class="w-[80%] sm:max-w-[500px] sm:mx-0 p-4 sm:p-6 rounded-none sm:rounded-lg"
    >
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
import { MinimalTicket, type Ticket } from "@/lib/tickets";
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
  ticket?: MinimalTicket;
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
  console.log("[TicketDialog] submit event received:", data);
  emit("submit", data);
};
</script>
