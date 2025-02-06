<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <slot />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-0">
      <DropdownMenuItem
        @click="item.id === 1 ? emit('delete') : emit('edit')"
        v-for="item in menuList"
        :key="item.id"
        class="hover:bg-[#5e5974] px-6 py-3 hover:cursor-pointer flex items-center"
      >
        <i :class="item.icon" class="text-[#514889]" />
        {{ item.title }}</DropdownMenuItem
      >
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

const emit = defineEmits(['edit', 'delete']);

const menuList = [
  {
    id: 1,
    title: 'Excluir',
    icon: 'fa-regular fa-trash-can',
  },
  {
    id: 2,
    title: 'Editar',
    icon: 'fa-regular fa-pen-to-square',
  },
];
</script>
