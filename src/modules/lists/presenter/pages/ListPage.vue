<template>
  <div
    class="bg-primary w-full h-full flex flex-col justify-start gap-5 p-5 px-12"
  >
    <PageControl
      title="Suas listas"
      btnIcon="fa-solid fa-plus"
      @click="openDialog(DialogTypes.CREATE)"
      @onSearch="handlefilter"
    >
      <MyButton
        class="p-0 h-full w-8 px-6"
        :variant="isEditMode ? 'solid' : 'outline'"
        @click="isEditMode = !isEditMode"
      >
        <i v-if="!isEditMode" class="fa-solid fa-pen" />
        <i v-else class="fa-solid fa-check" />
      </MyButton>
    </PageControl>
    <DisplayList
      :lists="displayLists"
      :isEditMode="isEditMode"
      @onClick="handleRedirect"
      @onDelete="handleOpenAlert"
    />
  </div>
  <CreateListDialog
    v-if="isDialogOpen(DialogTypes.CREATE)"
    v-model:open="dialogState"
    @createList="handleCreateList"
  />

  <MyAlertDialog
    v-model="alertDialogState"
    v-if="alertDialogState"
    :content="alertDialog.DELETE_LIST"
    @onConfirm="handleDeleteList"
  />
</template>

<script setup lang="ts">
import MyButton from '@/shared/components/Button/MyButton/MyButton.vue';
import CreateListDialog from '@/shared/components/Dialog/CreateListDialog.vue';
import MyAlertDialog from '@/shared/components/Dialog/MyAlertDialog.vue';
import { DialogTypes, useDialog } from '@/shared/composables/useDialog';
import { useLists } from '@/shared/composables/useLists';
import { filterList } from '@/shared/helpers/filterList';
import { List } from '@/shared/interfaces/List';
import { useListStore } from '@/shared/store/Lists';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PageControl from '../components/Card/PageControl/PageControl.vue';
import DisplayList from '../components/DisplayList/DisplayList.vue';
import { alertDialog } from '../utils/constants/alertDialog';

const router = useRouter();

const { createList, getLists, deleteList } = useLists();
const {
  dialogState,
  toggleDialog,
  isDialogOpen,
  openDialog,
  alertDialogState,
  toggleDialogAlert,
} = useDialog();

const listStore = useListStore();

const displayLists = ref(listStore.getLists);

const handlefilter = (val: string) => {
  displayLists.value = filterList(listStore.getLists, val)
};

const isEditMode = ref(false);

const getData = async () => {
  await getLists();
  displayLists.value = listStore.getLists;
};

const handleOpenAlert = (list: List) => {
  listStore.setSelectedList(list);
  toggleDialogAlert();
};

const handleRedirect = (list: List) => {
  router.push(`/lists/${list.id}`);
};

const handleDeleteList = async () => {
  toggleDialogAlert();
  const { id } = listStore.getSelectedList;
  if (!id) return;
  await deleteList(id);
  getData();
  isEditMode.value = false;
};

const handleCreateList = async (payload: any) => {
  await createList(payload);
  getLists();
  toggleDialog(DialogTypes.CREATE);
};
onMounted(() => {
  getData();
});
</script>
