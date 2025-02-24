import { ref } from 'vue';

export enum DialogTypes {
  ADD = 'addDialog',
  CREATE = 'createDialog',
};

export function useDialog() {
  const dialogState = ref<{ [key in DialogTypes]?: boolean }>({});

  const openDialog = (dialogName: DialogTypes) => {
    dialogState.value[dialogName] = true;
  };

  const closeDialog = (dialogName: DialogTypes) => {
    dialogState.value[dialogName] = false;
  };

  const toggleDialog = (dialogName: DialogTypes) => {
    dialogState.value[dialogName] = !dialogState.value[dialogName];
  };

  const isDialogOpen = (dialogName: DialogTypes) => {
    return dialogState.value[dialogName] || false;
  };

  return {
    dialogState,
    openDialog,
    closeDialog,
    toggleDialog,
    isDialogOpen,
  };
}
