<template>
  <div
    class="h-20 border border-primary-100 flex items-center justify-center bg-primary-50"
  >
  <div class="flex w-[92%] px-5 items-center justify-between h-full">
    <p class="font-display text-3xl hover:cursor-pointer" @click="router.push('/')">Filmios</p>
    <div class="flex justify-end h-full text-white">
      <div class="gap-4 items-center h-full hidden sm:flex">
        <a
          class="flex min-w-14 hover:cursor-pointer h-full uppercase hover:border-b-2 hover:border-secondary items-center border-b-2 justify-center border-transparent"
          v-for="item in NavigationList.ITEMS"
          :key="item.value"
          @click="router.push(`/${item.path}`)"
        >
          {{ item.label }}</a
        >
      </div>
      <div class="sm:hidden flex items-center">
        <DropdownMenu :list="NavigationList.ITEMS">
          <i class="fa-solid fa-bars"></i>
      </DropdownMenu>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import NavigationList from '@/shared/utils/constants/navigation';
import { useRouter } from 'vue-router';
import DropdownMenu from '../DropdownMenu/DropdownMenu.vue';

const router = useRouter();
</script>
