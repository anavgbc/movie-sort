<template>
  <Dialog>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Selecionar lista</DialogTitle>
      </DialogHeader>
      <div class="flex flex-col gap-2 py-4 w-full h-[90%]">
        <div
          v-for="item in lists"
          :key="item.name"
          class="flex gap-2 items-center justify-start border border-gray-300 rounded-md py-3 px-2"
        >
          <input
            type="radio"
            class="w-max"
            :id="item.name"
            :value="item"
            v-model="selectedList"
          />
          <label
            :for="item.name"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {{ item.name }} ({{ item.movies.length }})
          </label>
        </div>

        <div
          class="w-full flex flex-col justify-center items-center gap-8 mt-5"
        >
          <Separator label="OU" />
          <Button
            class="bg-secondary text-white px-3"
            @click="emit('randomSort')"
            >Sortear aleatoriamente</Button
          >
        </div>
      </div>
      <DialogFooter>
        <Button
          v-show="selectedList"
          type="submit"
          class="bg-secondary text-white px-3"
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
import Separator from '../ui/separator/Separator.vue';

interface Props {
  lists: any[];
}

defineProps<Props>();

const selectedList = ref<null | any>(null);

const emit = defineEmits(['createList', 'randomSort']);

const handleSubmit = () => {
  if (selectedList.value) {
    console.log('Selecionado:', selectedList.value);
    emit('createList', selectedList.value);
  } else {
    console.warn('Nenhuma lista foi selecionada!');
  }
};
</script>
