<template>
  <div
  :class="{'bg-secondary-100 font-medium' : isActive}"
    class="font-display hover:border-gray-500 border-transparent border text-gray-400 hover:border bg-primary-100 rounded-2xl px-5 text-sm py-1 flex items-center justify-center hover:cursor-pointer "
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  isActive: boolean;
};
defineProps<Props>();
</script>
