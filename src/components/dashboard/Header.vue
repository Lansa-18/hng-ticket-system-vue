<!-- src/components/dashboard/Header.vue -->
<template>
  <header class="bg-white shadow">
    <div class="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-6 gap-4 sm:gap-0"
      >
        <div
          class="flex items-center w-full sm:w-auto justify-between sm:justify-start space-x-4 sm:space-x-8"
        >
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900">TrackiT</h2>
          <nav class="flex sm:hidden">
            <router-link
              to="/dashboard"
              class="text-gray-700 hover:text-blue-600 px-2 py-1 text-sm font-medium"
            >
              Dashboard
            </router-link>
            <router-link
              to="/dashboard/tickets"
              class="text-gray-700 hover:text-blue-600 px-2 py-1 text-sm font-medium"
            >
              Tickets
            </router-link>
          </nav>
        </div>

        <nav class="hidden sm:flex space-x-4">
          <router-link
            to="/dashboard"
            class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
          >
            Dashboard
          </router-link>
          <router-link
            to="/dashboard/tickets"
            class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
          >
            Tickets
          </router-link>
        </nav>

        <div
          class="flex items-center justify-between w-full sm:w-auto space-x-4"
        >
          <span class="text-lg sm:text-xl font-bold text-gray-700 truncate">
            {{ user?.name }}
          </span>
          <Button
            variant="default"
            @click="handleLogout"
            class="flex items-center px-3 py-2 sm:px-4 sm:py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <i class="ri-logout-box-line text-lg"></i>
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { Button } from "@/components/ui/button";

const router = useRouter();
const auth = useAuthStore();

const handleLogout = () => {
  auth.logout();
  router.push("/");
};

const { user } = auth;
</script>
