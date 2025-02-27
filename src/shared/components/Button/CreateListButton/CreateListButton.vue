<template>
  <Button 
    class="flex bg-primary-100 font-display mt-5 shadow-sm hover:cursor-pointer py-6 rounded-md justify-start"
    @click="emit('onClick')"
  >
    <span
      class="bg-secondary-100 rounded-md size-6 px-3 py-2 flex items-center justify-center"
    >
      <i class="fa-solid fa-plus text-white"></i>
    </span>
    <p class="text-sm font-display text-gray-400">Criar nova lista</p>
  </Button>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import Button from '../../ui/button/Button.vue';

const emit = defineEmits(['onClick']);
</script>
