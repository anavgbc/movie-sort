<template>
  <Button
    class="bg-secondary-100 text-white rounded-md"
    :class="{
      'bg-gradient-md border-none': variant === 'solid',
      'bg-transparent border-secondary-100 border text-white hover:bg-primary-100':
        variant === 'outline',
      'bg-transparent text-secondary border-none': variant === 'ghost',
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
