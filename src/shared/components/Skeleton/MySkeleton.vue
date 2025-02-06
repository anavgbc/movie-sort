<script lang="ts" setup>
import { Skeleton } from '@/shared/components/ui/skeleton';
</script>

<template>
  <div class="flex flex-col space-y-3">
    <Skeleton class="w-40 h-[14rem] rounded-md bg-primary-100" />
    <div class="space-y-2">
      <Skeleton class="h-4 w-40 bg-primary-100" />
    </div>
  </div>
</template>
