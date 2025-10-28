<template>
  <div class="space-y-4 sm:space-y-6">
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <div>
        <h1 class="text-xl sm:text-2xl font-semibold text-gray-900">Tickets</h1>
        <p class="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
          View and manage all your support tickets
        </p>
      </div>
      <Button
        @click="openCreateDialog"
        class="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        Create New Ticket
      </Button>
    </div>

    <TicketDialog
      v-model="dialogOpen"
      :ticket="editingTicket"
      @submit="handleDialogSubmit"
    />

    <div class="space-y-4">
      <div
        v-if="loading"
        class="text-center py-8 bg-white rounded-lg shadow-sm border border-gray-100"
      >
        <div class="text-sm sm:text-base text-gray-600">Loading tickets...</div>
      </div>
      <div
        v-else-if="tickets.length === 0"
        class="text-center py-8 bg-white rounded-lg shadow-sm border border-gray-100"
      >
        <div class="text-sm sm:text-base text-gray-600">
          No tickets found. Create your first ticket to get started.
        </div>
      </div>
      <div v-else class="grid grid-cols-1 gap-3 sm:gap-4">
        <TicketCard
          v-for="ticket in tickets"
          :key="ticket.id"
          :ticket="ticket"
          @edit="setEditingTicket"
          @delete="handleDeleteTicket"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { Button } from "@/components/ui/button";
import TicketDialog from "@/components/dashboard/TicketDialog.vue";
import TicketCard from "@/components/dashboard/TicketCard.vue";
import { ticketService } from "@/lib/tickets";
import { useToast } from "vue-toastification";
import type { Ticket, CreateTicketData, UpdateTicketData, MinimalTicket } from "@/lib/tickets";

const auth = useAuthStore();
const toast = useToast();
const { user } = auth;

const tickets = ref<Ticket[]>([]);
const loading = ref(true);
const dialogOpen = ref(false);
const editingTicket = ref<MinimalTicket | undefined>();

const setDialogOpen = (open: boolean) => {
  dialogOpen.value = open;
  if (!open) editingTicket.value = undefined;
};

const setEditingTicket = (ticket: MinimalTicket) => {
  editingTicket.value = ticket;
  dialogOpen.value = true;
};

const openCreateDialog = () => {
  editingTicket.value = undefined;
  dialogOpen.value = true;
};

const loadTickets = async () => {
  if (!user) return;

  loading.value = true;
  try {
    const fetchedTickets = await ticketService.getTickets(user.id);
    tickets.value = fetchedTickets;
  } catch (error) {
    toast.error("Failed to load tickets");
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const handleCreateTicket = async (data: CreateTicketData) => {
  if (!user) return;

  try {
    console.log("[TicketsView] handleCreateTicket called with:", data);
    const newTicket = await ticketService.createTicket({
      ...data,
      userId: user.id,
    });
    tickets.value = [...tickets.value, newTicket];
    setDialogOpen(false);
    toast.success("Ticket created successfully");
  } catch (error) {
    toast.error("Failed to create ticket");
    throw error;
  }
};

const handleUpdateTicket = async (data: UpdateTicketData) => {
  if (!user || !editingTicket.value) return;

  try {
    const updatedTicket = await ticketService.updateTicket(
      editingTicket.value.id,
      data
    );
    tickets.value = tickets.value.map((t) =>
      t.id === updatedTicket.id ? updatedTicket : t
    );
    setDialogOpen(false);
    toast.success("Ticket updated successfully");
  } catch (error) {
    toast.error("Failed to update ticket");
    throw error;
  }
};

const handleDeleteTicket = async (ticket: MinimalTicket) => {
  if (!user) return;

  try {
    await ticketService.deleteTicket(ticket.id, user.id);
    tickets.value = tickets.value.filter((t) => t.id !== ticket.id);
    toast.success("Ticket deleted successfully");
  } catch (error) {
    toast.error("Failed to delete ticket");
    throw error;
  }
};

const handleDialogSubmit = (data: {
  title: string;
  description: string;
  status: string;
}) => {
  if (editingTicket.value) {
    handleUpdateTicket(data as UpdateTicketData);
  } else {
    handleCreateTicket(data as CreateTicketData);
  }
};

onMounted(() => {
  if (user) {
    loadTickets();
  }
});
</script>
