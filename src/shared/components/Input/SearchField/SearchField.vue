<template>
  <div class="relative">
    <Input
      class="border border-primary-100 w-full rounded-lg pr-5 hover:border-secondary"
      :placeholder="placeholder"
      :class="[variant === 'outline' ? 'bg-transparent' : 'bg-primary-50']"
      v-model="inputValue"
      @input="emit('searchValue', inputValue)"
      @focus="emit('onFocus')"
      @blur="emit('onBlur')"
    />
    <Button
      class="bg-transparent absolute right-2 top-1 rounded-md p-0 h-8 w-3 px-6"
      :class="isInputFilled ? 'cursor-pointer' : 'cursor-default'"
      @click="isInputFilled && emit('clear')"
    >
      <i
        v-if="!isInputFilled"
        class="fa-solid fa-magnifying-glass text-gray-600"
        :class="[isHovered && 'text-white']"
      />
      <i
        v-else
        class="fa-solid fa-x text-gray-600"
        :class="[isHovered && 'text-white']"
      />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { useSearch } from '@/modules/home/presenter/composables/useSearch';
import { Input } from '@/shared/components/ui/input';
import { ref } from 'vue';
import Button from '../../ui/button/Button.vue';

const isHovered = ref(false);

const { inputValue, isInputFilled } = useSearch();

interface Props {
  placeholder?: string;
  variant?: 'outline' | 'solid';
}

defineProps<Props>();
const emit = defineEmits(['searchValue', 'onFocus', 'onBlur', 'clear']);
</script>
