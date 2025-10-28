<template>
  <form @submit.prevent="onSubmit" class="space-y-4 mt-4">
    <div class="space-y-2">
      <Label for="title">Title</Label>
      <Input
        id="title"
        v-model="form.title"
        :disabled="isSubmitting"
        placeholder="Enter ticket title"
      />
      <p v-if="errors.title" class="text-sm text-destructive">
        {{ errors.title }}
      </p>
    </div>

    <div class="space-y-2">
      <Label for="description">Description</Label>
      <Textarea
        id="description"
        v-model="form.description"
        :disabled="isSubmitting"
        rows="4"
        placeholder="Enter ticket description"
      />
      <p v-if="errors.description" class="text-sm text-destructive">
        {{ errors.description }}
      </p>
    </div>

    <div class="space-y-2">
      <Label for="status">Status</Label>
      <Select v-model="form.status" :disabled="isSubmitting">
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="open">Open</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>
      <p v-if="errors.status" class="text-sm text-destructive">
        {{ errors.status }}
      </p>
    </div>

    <div class="flex justify-end space-x-3">
      <Button
        type="button"
        variant="outline"
        @click="$emit('cancel')"
        :disabled="isSubmitting"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        :disabled="isSubmitting"
        class="bg-blue-700 hover:bg-blue-500"
      >
        {{
          isSubmitting
            ? "Saving..."
            : ticket
              ? "Update Ticket"
              : "Create Ticket"
        }}
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { z } from "zod";
import type { Ticket, TicketStatus } from "@/lib/tickets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const props = defineProps<{
  ticket?: Ticket;
}>();

const emit = defineEmits<{
  (
    e: "submit",
    data: { title: string; description: string; status: TicketStatus }
  ): void;
  (e: "cancel"): void;
}>();

const isSubmitting = ref(false);

const ticketSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters"),
  status: z.enum(["open", "in-progress", "closed"] as const),
});

const form = reactive({
  title: props.ticket?.title ?? "",
  description: props.ticket?.description ?? "",
  status: props.ticket?.status ?? ("open" as TicketStatus),
});

const errors = reactive({
  title: "",
  description: "",
  status: "",
});

const validateForm = () => {
  const result = ticketSchema.safeParse(form);
  if (!result.success) {
    const formattedErrors = result.error.format();
    errors.title = formattedErrors.title?._errors[0] ?? "";
    errors.description = formattedErrors.description?._errors[0] ?? "";
    errors.status = formattedErrors.status?._errors[0] ?? "";
    return false;
  }
  return true;
};

const onSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  try {
    await emit("submit", form);
  } catch (error) {
    console.error("Form submission error:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
