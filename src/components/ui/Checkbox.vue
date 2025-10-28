<template>
  <div class="flex items-center space-x-2">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', !modelValue)"
      class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      :id="id"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
  id?: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
</script>
