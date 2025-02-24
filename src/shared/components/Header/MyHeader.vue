<template>
  <div
    class="h-20 border border-primary-100 flex items-center justify-center bg-primary-50"
  >
  <div class="flex w-[97%] items-center justify-between h-full">
    <p class="w-2/12 font-display text-3xl pl-12 hover:cursor-pointer" @click="router.push('/')">Filmios</p>
    <div class="flex w-10/12 justify-end h-full">
      <div class="flex gap-4 items-center w-1/3 h-full">
        <a
          class="flex min-w-14 hover:cursor-pointer h-full uppercase hover:border-b-2 hover:border-secondary items-center border-b-2 justify-center border-transparent"
          v-for="item in NavigationList.ITEMS"
          :key="item.value"
          @click="router.push(`/${item.path}`)"
        >
          {{ item.label }}</a
        >
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import NavigationList from '@/shared/utils/constants/navigation';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
