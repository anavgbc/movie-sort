<template>
  <div class="relative">
    <Input
      class="border border-primary-100 w-full rounded-lg pr-5 hover:border-secondary"
      :placeholder="placeholder"
      :class="[variant === 'outline' ? 'bg-transparent' : 'bg-primary-50']"
      v-model="inputValue"
      @input="(value) => emit('searchValue', value)"
      @focus="emit('onFocus')"
      @blur="emit('onBlur')"
    />
    <Button
      class="bg-transparent absolute right-2 top-1 rounded-md p-0 h-8 w-3 px-6" 
      :class="isFilled ? 'cursor-pointer' : 'cursor-default'"
      @click="isFilled && emit('clear')"
    >
      <i
      v-if="!isFilled"
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
import { Input } from '@/shared/components/ui/input';
import { ref } from 'vue';
import Button from '../../ui/button/Button.vue';

const isHovered = ref(false);

const inputValue = defineModel({ type: String });

interface Props {
  placeholder?: string;
  variant?: 'outline' | 'solid';
  isFilled?: boolean;
}

defineProps<Props>();
const emit = defineEmits(['searchValue', 'onFocus', 'onBlur', 'clear']);
</script>
