<template>
  <Dialog :open="open" @update:open="onOpenChange">
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
        :onSubmit="onSubmit"
        :onCancel="() => onOpenChange(false)"
      />
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Ticket } from "@/lib/tickets";

defineProps<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket?: Ticket;
  onSubmit: (data: any) => Promise<void>;
}>();
</script>
