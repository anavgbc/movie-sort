<template>
  <div class="w-full flex flex-col gap-3">
    <p class="font-medium text-lg">{{ title }}</p>
    <div class="w-full justify-between flex">
      <div class="w-1/3">
      <SearchField placeholder="Pesquisar por..." @searchValue="(val) => emit('onSearch', val)"/>
      </div>
      <div class="flex gap-2">
        <MyButton variant="outline" @click="emit('click')">
          <i :class="btnIcon" />
        </MyButton>
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
  btnIcon: string;
}

defineProps<Props>();

const emit = defineEmits(['click', 'onSearch']);
</script>
