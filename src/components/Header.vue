<template>
  <header class="bg-white border-b shadow-sm">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <div class="text-2xl font-bold">TrackiT</div>
      <nav class="space-x-4">
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/dashboard/tickets">Tickets</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts"></script>
