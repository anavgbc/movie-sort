<template>
  <Dialog v-model:open="isOpen">
    <DialogContent
      class="w-[90%] sm:max-w-[425px] bg-primary h-[80%] sm:h-[620px] flex flex-col justify-between"
    >
      <DialogHeader>
        <DialogTitle class="font-display text-gray-400"
          >Adicionar à lista</DialogTitle
        >
      </DialogHeader>
      <div class="flex flex-col gap-4 pt-4 w-full h-[85%] text-white">
        <SearchField
          placeholder="Procurar por..."
          variant="outline"
          v-model="searchValue"
          @searchValue="handleSearch"
        />
        <DialogList
          :displayLists="displayList"
          :selectedList="selectedList"
          @addToList="selectList"
        />
       <CreateListButton @onClick="emit('createList')" />
      </div>
      <DialogFooter>
        <Button
          type="submit"
          class="bg-secondary-100 text-white"
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
import { DialogTypes, useDialog } from '@/shared/composables/useDialog';
import { filterList } from '@/shared/helpers/filterList';
import { ref } from 'vue';
import CreateListButton from '../Button/CreateListButton/CreateListButton.vue';
import SearchField from '../Input/SearchField/SearchField.vue';
import DialogList from '../List/AddDialogList.vue';

interface Props {
  lists: any[];
}

const isOpen = defineModel({ type: Boolean });

const { toggleDialog } = useDialog();

const props = defineProps<Props>();

const emit = defineEmits(['addToList', 'createList']);

const displayList = ref<any>(props.lists);
const selectedList = ref<any>([]);
const searchValue = ref<string>('');

const selectList = (item: any) => {
  selectedList.value === item
    ? (selectedList.value = [])
    : (selectedList.value = item);
};

const handleSearch = (val: string) => {
  displayList.value = filterList(props.lists, val);
};

const handleSubmit = () => {
  emit('addToList', selectedList.value);
  toggleDialog(DialogTypes.ADD);
};
</script>
