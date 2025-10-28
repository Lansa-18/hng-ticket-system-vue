<template>
  <div class="space-y-4">
    <TicketCard v-for="t in tickets" :key="t.id" :ticket="t" />
  </div>
</template>

<script setup lang="ts">
import TicketCard from "./TicketCard.vue";
import { useTicketsStore } from "@/stores/tickets";

const store = useTicketsStore();
const tickets = store.tickets;
</script>
