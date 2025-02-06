<template>
  <div class="w-full flex flex-col gap-3">
    <p class="font-medium text-lg">{{ title }}</p>
    <div class="w-full justify-between flex">
      <SearchField placeholder="Pesquisar por..." class="w-1/3" />
      <div class="flex gap-2">
        <MyButton @click="emit('click')">{{ btnText }}</MyButton>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MyButton from '@/shared/components/Button/MyButton/MyButton.vue';
import SearchField from '@/shared/components/Input/SearchField/SearchField.vue';

interface Props {
  title: string;
  btnText: string;
}

defineProps<Props>();

const emit = defineEmits(['click']);
</script>
