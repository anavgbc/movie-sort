<template>
  <Button
    class="bg-secondary text-white rounded-md"
    :class="{
      'bg-gradient-md': variant === 'solid',
      'bg-transparent border-secondary border text-white hover:bg-primary-100':
        variant === 'outline',
      'bg-transparent text-secondary': variant === 'ghost',
    }"
  >
    <slot />
  </Button>
</template>

<script setup lang="ts">
import Button from '@/shared/components/ui/button/Button.vue';

interface Props {
  variant?: 'outline' | 'solid' | 'ghost';
}

defineProps<Props>();
</script>
