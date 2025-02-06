<template>
  <div class="flex items-center justify-center">
    <div
      class="border-4 border-t-transparent rounded-full animate-spin"
      :class="{
        'spinner border-transparent' : variant === 'glow',
        [sizeMapper[size || 'md']]: true,
        'border-secondary-100': !variant
      }"
    />
  </div>
</template>

<script setup lang="ts">

interface Props {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'glow';
}
defineProps<Props>();

const sizeMapper = {
  sm: 'w-8 h-8',
  md: 'w-9 h-9',
  lg: 'w-12 h-12',
};
</script>

<style scoped>
@keyframes neonGlow {
  0% {
    box-shadow: 0 0 5px #8673f8, 0 0 10px #8673f8, 0 0 20px #8673f8;
  }
  50% {
    box-shadow: 0 0 10px #b9a7ff, 0 0 20px #b9a7ff, 0 0 30px #b9a7ff;
  }
  100% {
    box-shadow: 0 0 5px #8673f8, 0 0 10px #8673f8, 0 0 20px #8673f8;
  }
}

.spinner {
  animation: spin 1s linear infinite, neonGlow 1.5s ease-in-out infinite alternate;
}
</style>

<!-- <style scoped>
@keyframes neonGlowRotate {
  0% {
    box-shadow: 0 -4px 10px #8673f8, 0 -8px 20px #8673f8, 0 -12px 30px #8673f8;
  }
  25% {
    box-shadow: 4px 0 10px #b9a7ff, 8px 0 20px #b9a7ff, 12px 0 30px #b9a7ff;
  }
  50% {
    box-shadow: 0 4px 10px #8673f8, 0 8px 20px #8673f8, 0 12px 30px #8673f8;
  }
  75% {
    box-shadow: -4px 0 10px #b9a7ff, -8px 0 20px #b9a7ff, -12px 0 30px #b9a7ff;
  }
  100% {
    box-shadow: 0 -4px 10px #8673f8, 0 -8px 20px #8673f8, 0 -12px 30px #8673f8;
  }
}

.spinner {
  animation: spin 1s linear infinite, neonGlowRotate 1s linear infinite;
}
</style> -->