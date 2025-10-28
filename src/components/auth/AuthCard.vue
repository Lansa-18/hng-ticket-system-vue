<template>
  <div
    class="relative min-h-screen flex items-center justify-center bg-blue-600 py-12 px-4 sm:px-6 lg:px-8"
  >
    <!-- Decorative Circles -->
    <div
      class="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-white opacity-20"
    />
    <div
      class="absolute bottom-40 left-[5%] w-48 h-48 rounded-full bg-blue-400 opacity-25"
    />

    <div
      class="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl relative z-10"
    >
      <router-link
        v-if="backLink"
        to="/"
        class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 mb-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="mr-2"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back
      </router-link>

      <div class="space-y-1">
        <h2 class="text-center text-3xl font-extrabold text-gray-900">
          {{ title }}
        </h2>
        <p class="text-center text-sm text-gray-600">
          {{ description }}
        </p>
      </div>

      <CardContent class="p-0">
        <slot></slot>
      </CardContent>
    </div>

    <WaveBackground />
  </div>
</template>

<script setup lang="ts">
import WaveBackground from "../ui/Wave.vue";
import { CardContent } from "@/components/ui/card";

defineProps<{
  title: string;
  description: string;
  backLink?: boolean;
}>();
</script>
