<template>
  <button
    :type="type"
    :class="[
      'flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
      className,
    ]"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}>();
</script>
