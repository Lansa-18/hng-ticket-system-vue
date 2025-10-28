<!-- src/pages/dashboard/DashboardPage.vue -->
<template>
  <div class="space-y-4 sm:space-y-6">
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <div>
        <h1 class="text-xl sm:text-2xl font-semibold text-gray-900">
          Welcome back, {{ user?.name }}!
        </h1>
        <p class="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
          Here's an overview of your ticket management system.
        </p>
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
      <div class="bg-white shadow-sm rounded-lg p-4 sm:p-6">
        <h3 class="text-sm sm:text-lg font-medium text-gray-900">
          Total Tickets
        </h3>
        <p class="text-2xl sm:text-3xl font-bold text-blue-900 mt-2">
          {{ loading ? "..." : stats.total }}
        </p>
      </div>
      <div class="bg-white shadow-sm rounded-lg p-4 sm:p-6">
        <h3 class="text-sm sm:text-lg font-medium text-gray-900">Open</h3>
        <p class="text-2xl sm:text-3xl font-bold text-green-600 mt-2">
          {{ loading ? "..." : stats.open }}
        </p>
      </div>
      <div class="bg-white shadow-sm rounded-lg p-4 sm:p-6">
        <h3 class="text-sm sm:text-lg font-medium text-gray-900">
          In Progress
        </h3>
        <p class="text-2xl sm:text-3xl font-bold text-yellow-600 mt-2">
          {{ loading ? "..." : stats.inProgress }}
        </p>
      </div>
      <div class="bg-white shadow-sm rounded-lg p-4 sm:p-6">
        <h3 class="text-sm sm:text-lg font-medium text-gray-900">Resolved</h3>
        <p class="text-2xl sm:text-3xl font-bold text-gray-700 mt-2">
          {{ loading ? "..." : stats.closed }}
        </p>
      </div>
    </div>

    <div class="bg-white shadow-sm rounded-lg p-4 sm:p-6">
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4"
      >
        <h2 class="text-lg sm:text-xl font-semibold text-gray-900">
          Recent Activity
        </h2>
        <router-link
          to="/dashboard/tickets"
          class="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap"
        >
          View All Tickets →
        </router-link>
      </div>
      <div class="border-t border-gray-200 pt-4">
        <div v-if="loading" class="text-center py-4 text-sm sm:text-base">
          Loading...
        </div>
        <div
          v-else-if="stats.total === 0"
          class="text-center py-6 sm:py-8 text-sm sm:text-base text-gray-600"
        >
          No tickets found. Create your first ticket to get started.
        </div>
        <template v-else>
          <div class="text-sm sm:text-base text-gray-600 mb-4">
            You have {{ stats.open }} open ticket{{
              stats.open !== 1 ? "s" : ""
            }}
            that need{{ stats.open === 1 ? "s" : "" }} attention.
          </div>
          <div class="space-y-3">
            <div
              v-for="ticket in tickets"
              :key="ticket.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div class="flex-1">
                <h3 class="font-medium text-gray-900">{{ ticket.title }}</h3>
                <p class="text-sm text-gray-600 mt-1">
                  {{ ticket.description }}
                </p>
              </div>
              <div
                :class="[
                  'px-3 py-1 text-sm font-medium rounded-full',
                  {
                    'bg-green-100 text-green-800': ticket.status === 'open',
                    'bg-yellow-100 text-yellow-800':
                      ticket.status === 'in-progress',
                    'bg-gray-100 text-gray-800': ticket.status === 'closed',
                  },
                ]"
              >
                {{ ticket.status }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { ticketService, type Ticket } from "@/lib/tickets";

const auth = useAuthStore();
const { user } = auth;

const stats = ref({
  total: 0,
  open: 0,
  inProgress: 0,
  closed: 0,
});

const tickets = ref<Ticket[]>([]);
const loading = ref(true);

onMounted(async () => {
  if (user) {
    loading.value = true;
    try {
      const [statsData, ticketsData] = await Promise.all([
        ticketService.getTicketStats(user.id),
        ticketService.getTickets(user.id),
      ]);
      stats.value = statsData;
      tickets.value = ticketsData;
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      loading.value = false;
    }
  }
});
</script>
