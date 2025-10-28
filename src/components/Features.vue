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
            <svg
              class="w-6 h-6 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="feature.iconPath"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    title: "Easy Ticket Management",
    description:
      "Create, update, and track support tickets with an intuitive interface",
    iconPath:
      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    title: "Real-time Updates",
    description: "Stay informed with instant notifications and status changes",
    iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Detailed Analytics",
    description:
      "Get insights into your support performance with comprehensive statistics",
    iconPath:
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    title: "Secure & Reliable",
    description:
      "Your data is protected with enterprise-grade security measures",
    iconPath:
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
];
</script>
