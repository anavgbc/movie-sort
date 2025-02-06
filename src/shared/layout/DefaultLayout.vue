<script setup lang="ts">
import MyHeader from '../components/Header/MyHeader.vue';
</script>

<template>
  <main
    class="w-screen h-screen bg-primary max-w-screen max-h-screen flex flex-col text-white"
  >
    <MyHeader />
    <div class="w-full overflow-y-auto flex flex-col overflow-x-hidden h-[95%]">
      <router-view />
    </div>
  </main>
</template>
