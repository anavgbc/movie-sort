<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <slot />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-0">
      <!-- <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator /> -->
      <DropdownMenuItem
        @click="emit('addToList')"
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

const emit = defineEmits(['addToList']);

const menuList = [
  {
    id: 1,
    title: 'Adicionar a lista',
    icon: 'fa-solid fa-list',
  },
  // {
  //   id: 2,
  //   title: 'Ver detalhes',
  //   icon: 'fa-solid fa-film',
  // },
];
</script>
