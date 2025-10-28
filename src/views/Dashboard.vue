<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1 container mx-auto p-6">
      <h1 class="text-2xl font-semibold mb-4">Dashboard</h1>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>
