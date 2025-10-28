<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header />
    <main
      class="flex-1 max-w-[90rem] w-full mx-auto p-4 sm:p-6 lg:p-8"
    >
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
</script>
