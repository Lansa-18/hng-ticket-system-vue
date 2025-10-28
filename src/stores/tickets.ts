import { defineStore } from "pinia";
import { ref } from "vue";

export const useTicketsStore = defineStore("tickets", () => {
  const tickets = ref<
    Array<{ id: string; title: string; description: string }>
  >([]);

  function addTicket(t: { id: string; title: string; description: string }) {
    tickets.value.push(t);
  }

  function removeTicket(id: string) {
    tickets.value = tickets.value.filter((t) => t.id !== id);
  }

  return { tickets, addTicket, removeTicket };
});
