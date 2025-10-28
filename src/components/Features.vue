<template>
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-4 max-w-[1440px]">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
        Everything you need to manage support
      </h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <div
            class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4"
          >
            <component :is="feature.icon" class="h-6 w-6 text-blue-600" />
          </div>
          <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ClipboardList, Clock, BarChart3, Shield } from "lucide-vue-next";
const features = [
  {
    title: "Easy Ticket Management",
    description:
      "Create, update, and track support tickets with an intuitive interface",
    icon: ClipboardList,
  },
  {
    title: "Real-time Updates",
    description: "Stay informed with instant notifications and status changes",
    icon: Clock,
  },
  {
    title: "Detailed Analytics",
    description:
      "Get insights into your support performance with comprehensive statistics",
    icon: BarChart3,
  },
  {
    title: "Secure & Reliable",
    description:
      "Your data is protected with enterprise-grade security measures",
    icon: Shield,
  },
];
</script>
