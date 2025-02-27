import { ref } from 'vue';

export function useEditMode() {
  const isEditMode = ref<boolean>(false);

  const setEditMode = (value: boolean) => {
    isEditMode.value = value;
  }

  const toggleEditMode = () => {
    isEditMode.value = !isEditMode.value;
  }

  return {
    setEditMode,
    isEditMode,
  };
}
