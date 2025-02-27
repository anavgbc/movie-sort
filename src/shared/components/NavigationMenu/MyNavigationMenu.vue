<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem >
        <NavigationMenuTrigger>
          <slot />
        </NavigationMenuTrigger>
        <NavigationMenuContent v-for="item in list" :key="item.value" @click="router.push(`/${item.path}`)">
          <!-- <NavigationMenuLink>Link</NavigationMenuLink> -->
          <p>{{ item.label }}</p>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>

<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';

import { useRouter } from 'vue-router';

const router = useRouter();

defineProps<{
  list: Array<{ value: number; label: string; path: string }>;
}>();
</script>
