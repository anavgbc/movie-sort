<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="sm:max-w-[425px] bg-primary">
      <DialogHeader>
        <DialogTitle class="font-display text-gray-400">Adicionar à lista</DialogTitle>
      </DialogHeader>
      <div class="flex flex-col gap-4 py-4 w-full h-[90%]">
        <SearchField placeholder="Procurar por..." variant="outline" />
        <ul class="w-full h-[60%] min-h-60 max-h-64 overflow-y-auto" v-if="lists">
          <li
            v-for="item in lists"
            :key="item.id"
            class="my-3 hover:cursor-pointer shadow-sm border text-white border-[#ededed] hover:border-[#51488938] px-3 py-3 rounded-md flex justify-between items-center font-display text-sm font-normal"
            @click="selectedList = item"
            :class="{
              'bg-[#9690b730] border-[#51488938]': selectedList === item,
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

        <div v-else class="h-[60%] min-h-60 max-h-64 flex flex-col gap-1 items-center justify-center">
          <img src="@/assets/images/empty-state.svg" class="h-24 w-24" />
          <p class="font-display text-gray-500 text-sm">Ops! Nada aqui.</p>
          <p class="font-display text-gray-500 text-sm">Crie sua primeira lista.</p>
        </div>

        <div
          class="flex bg-primary-50 gap-2 font-display px-3 shadow-sm hover:cursor-pointer py-3 rounded-md items-center"
          @click="emit('createList')"
        >
          <span
            class="bg-secondary rounded-md size-6 px-3 py-2 flex items-center justify-center"
          >
            <i class="fa-solid fa-plus text-white"></i>
          </span>
          <p class="text-sm font-display text-gray-400">Criar nova lista</p>
        </div>
      </div>
      <DialogFooter>
        <Button
          type="submit"
          class="bg-secondary text-white"
          :disabled="!selectedList"
          @click="handleSubmit"
        >
          Salvar
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { ref } from 'vue';
import SearchField from '../Input/SearchField/SearchField.vue';

const isOpen = defineModel({ type: Boolean });

interface Props {
  lists: any[];
}

defineProps<Props>();
const emit = defineEmits(['addToList', 'createList']);

const selectedList = ref<any>(null);

const handleSubmit = () => {
  emit('addToList', selectedList.value);
  isOpen.value = false;
};
</script>
