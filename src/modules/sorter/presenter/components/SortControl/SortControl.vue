<template>
  <div class="w-full flex justify-between py-3">
    <Button
      variant="ghost"
      class="text-gray-400 font-normal px-0 hover:bg-transparent hover:text-white"
      @click="emit('onBack')"
    >
      <i class="fa-solid fa-arrow-left" />
      Voltar para sortear
    </Button>
    <Button
      class="bg-transparent border-secondary border text-secondary hover:bg-primary-100 text-white rounded-xl font-normal"
      @click="emit('showFilter')"
    >
      Adicionar filtro
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from '@/shared/components/ui/button/Button.vue';

const emit = defineEmits(['onBack', 'showFilter']);
</script>
