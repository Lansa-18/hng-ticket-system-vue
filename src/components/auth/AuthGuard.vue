<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  if (!authStore.checkAuth()) {
    router.replace({
      path: "/auth/login",
      query: { redirect: router.currentRoute.value.fullPath },
    });
  }
});
</script>

<template>
  <slot v-if="authStore.user"></slot>
</template>
