import { computed, ref } from 'vue';

export function useSearch() {

  const inputValue = ref('');
  const isInputFilled = computed(() => inputValue.value !== "");

  const clearSearchField = () => {
    inputValue.value = '';
  };

  return {
    inputValue,
    isInputFilled,
    clearSearchField,
  };
}
