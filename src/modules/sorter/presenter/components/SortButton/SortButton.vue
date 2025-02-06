<template>
  <Button class="rounded-full bg-secondary border border-primary-100 w-[150px] h-[150px] shadow-inner sorter-buton">
    <i class="fa-solid fa-shuffle fa-xl" />
    </Button>
</template>

<script setup lang="ts">
import Button from '@/shared/components/ui/button/Button.vue';

</script>

<style scoped>
.sorter-buton{
  transition: all 0.2s ease-in-out;
  box-shadow: -4px -4px 8px rgba(255, 255, 255, 0.1), 
  6px 6px 10px rgba(0, 0, 0, 0.5);


  /* box-shadow: 0 0 10px #8673f8, 
              0 0 20px #8673f8, 
              -4px -4px 8px rgba(255, 255, 255, 0.1), 
              6px 6px 10px rgba(0, 0, 0, 0.5); */
}

.sorter-buton:hover{
  box-shadow: inset -4px -4px 8px rgba(255, 255, 255, 0.1), 
  inset 6px 6px 10px rgba(0, 0, 0, 0.5);
  

  /* box-shadow: inset 0 0 10px #b9a7ff, 
              inset 0 0 20px #b9a7ff, 
              inset -4px -4px 8px rgba(255, 255, 255, 0.1), 
              inset 6px 6px 10px rgba(0, 0, 0, 0.5); */
}

.sorter-buton:active {
  box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.2), 
              inset 4px 4px 8px rgba(0, 0, 0, 0.6);


              /* box-shadow: inset 0 0 15px #d1c4ff, 
              inset -2px -2px 6px rgba(255, 255, 255, 0.2), 
              inset 4px 4px 8px rgba(0, 0, 0, 0.6); */
  transform: translateY(2px);
}
</style>
