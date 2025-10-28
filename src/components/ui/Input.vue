<template>
  <div class="relative">
    <input
      :type="type"
      :value="modelValue"
      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-900"
      :class="className"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      v-bind="$attrs"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  type?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>
