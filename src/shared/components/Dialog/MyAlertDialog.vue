<template>
  <AlertDialog v-model:open="isOpen">
    <AlertDialogContent class="bg-primary-50 text-white border-none">
      <AlertDialogHeader>
        <AlertDialogTitle>{{ content.title }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ content.message }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel class="bg-red-900 border-none"
          >Cancelar</AlertDialogCancel
        >
        <AlertDialogAction
          @click="emit('onConfirm')"
          class="bg-secondary-100"
          >{{ content.confirmText }}</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

interface Props {
  content: any;
}

defineProps<Props>();

const emit = defineEmits(['onConfirm']);

const isOpen = defineModel({ type: Boolean });
</script>
