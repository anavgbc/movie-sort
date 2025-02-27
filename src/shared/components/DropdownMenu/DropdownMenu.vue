<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <slot />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-0 bg-primary-100 border-none">
      <template v-for="item in list" :key="item.value">
        <Dialog v-if="item.dialog">
          <DialogTrigger as-child>
            <DropdownMenuItem
              class="text-white hover:bg-[#5e5974] px-6 py-3 hover:cursor-pointer flex items-center"
            >
              <i :class="item.icon" class="text-[#514889]" v-if="item.icon" />
              {{ item.label }}
            </DropdownMenuItem>
          </DialogTrigger>
        </Dialog>
        <DropdownMenuItem
          v-else
          @click="emit('onClick', item.value)"
          class="text-white hover:bg-[#5e5974] px-6 py-3 hover:cursor-pointer flex items-center"
        >
          <i :class="item.icon" class="text-[#514889]" v-if="item.icon" />
          {{ item.label }}
        </DropdownMenuItem>
      </template>
    </DropdownMenuContent>
  </DropdownMenu>
</template>


<script setup lang="ts">

defineProps<{
  list: any[];
}>();

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Dialog, DialogTrigger } from '../ui/dialog';

const emit = defineEmits(['onClick']);
</script>
