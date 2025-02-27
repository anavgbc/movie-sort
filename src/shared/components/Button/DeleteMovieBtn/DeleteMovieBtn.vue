<template>
  <button
    @click="emit('onClick')"
    class="absolute top-1 right-1 bg-red-800 hover:bg-red-900 z-20 rounded-full w-6 h-6 flex items-center justify-center shadow-md"
  >
    <i class="fa-solid fa-minus fa-xs" />
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['onClick']);
</script>
