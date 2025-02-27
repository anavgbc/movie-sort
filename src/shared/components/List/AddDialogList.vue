<template>
  <ul class="w-full h-[65%] min-h-60 overflow-y-auto" v-if="!isListEmpty">
    <li
      v-for="item in displayLists"
      :key="item.id"
      class="my-3 hover:cursor-pointer shadow-sm text-white px-3 bg-primary-100 hover:bg-primary-50 py-3 rounded-md flex justify-between items-center font-display text-sm font-normal"
      @click="emit('addToList', item)"
      :class="{
        'bg-secondary-100' : isItemSelected(item),
      }"
    >
      <div class="flex gap-2 items-center">
        <i class="fa-solid fa-list fa-sm"></i>
        {{ item.name }}
      </div>
      <button
        class="text-white text-xs w-10 py-1 bg-[#51488999] rounded-md flex items-center justify-center gap-2 px-2"
      >
        <i class="fa-solid fa-inbox fa-sm"></i>
        <p>{{ item.movies.length }}</p>
      </button>
    </li>
  </ul>
  <EmptyList v-else />
</template>
<script setup lang="ts">
import { List } from '@/shared/interfaces/List';
import { computed } from 'vue';
import EmptyList from '../EmptyList/EmptyList.vue';

interface Props {
  displayLists: List[];
  selectedList: List;
}
const props = defineProps<Props>();

const isListEmpty = computed(() => !props.displayLists.length);
const isItemSelected = (item: any) => props.selectedList === item;

const emit = defineEmits(['addToList']);
</script>
