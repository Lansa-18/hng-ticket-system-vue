<template>
  <div class="min-h-screen">
    <div
      class="relative bg-blue-600 min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      <!-- Decorative Circles -->
      <div
        class="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-white opacity-20"
      ></div>
      <div
        class="absolute bottom-40 left-[5%] w-48 h-48 rounded-full bg-blue-400 opacity-25"
      ></div>
      <div
        class="absolute top-40 left-[15%] w-32 h-32 rounded-full bg-white opacity-10"
      ></div>
      <div
        class="absolute -top-10 right-[20%] w-24 h-24 rounded-full bg-blue-300 opacity-20"
      ></div>

      <!-- Animated circle with gradient -->
      <div
        class="absolute top-1/4 right-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-white/10 to-blue-400/10 animate-pulse"
      />

      <div
        class="container mx-auto px-4 relative z-10 text-center text-white max-w-[1440px]"
      >
        <h1 class="text-5xl md:text-6xl font-bold mb-6">TrackiT</h1>
        <h2 class="text-3xl md:text-4xl font-semibold mb-4 text-blue-100">
          Streamline Your Support
        </h2>
        <p class="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-blue-50">
          Manage your support tickets efficiently with our powerful and
          intuitive ticket management system
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/auth/login"
            class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Login
          </router-link>
          <router-link
            to="/auth/signup"
            class="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors border border-white/20"
          >
            Get Started
          </router-link>
        </div>
      </div>

      <!-- Wave Background -->
      <Wave />
    </div>
    <Features />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Wave from "@/components/ui/Wave.vue";
import Features from "@/components/Features.vue";
import Footer from "@/components/Footer.vue";
</script>

<style>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
