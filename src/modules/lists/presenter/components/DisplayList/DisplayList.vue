<template>
  <div
    class="h-[80%] flex justify-start gap-3 flex-wrap"
    v-if="lists.length > 0"
  >
    <ListCard
      v-for="item in lists"
      :list="item"
      :key="item.id"
      @click="!isEditMode && emit('onClick', item)"
      :is-editable="isEditMode"
      @onDelete="emit('onDelete', item)"
    />
  </div>
  <EmptyState v-else />
</template>

<script setup lang="ts">
import { List } from '@/shared/interfaces/List';
import ListCard from '../Card/ListCard/ListCard.vue';
import EmptyState from '../EmptyState/EmptyState.vue';

interface Props {
  lists: List[];
  isEditMode: Boolean;
}

defineProps<Props>();

const emit = defineEmits(['onClick', 'onDelete']);
</script>
