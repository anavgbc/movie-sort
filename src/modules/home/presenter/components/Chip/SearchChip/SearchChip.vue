<template>
  <MyButton
    :class="{
      'bg-secondary-100 text-white hover:bg-secondary-100': isActive,
      'hover:bg-primary-100': !isActive
    }"
    variant="outline"
    class="rounded-3xl px-5 text-xs py-0 h-[1.8rem] font-normal"
  >
    {{ label }}
  </MyButton>
</template>

<script setup lang="ts">
import MyButton from '@/shared/components/Button/MyButton/MyButton.vue';

defineProps<{
  isActive: boolean;
  label: string;
}>();

</script>