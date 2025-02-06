<template>
  <div class="w-full h-full flex flex-col p-5 gap-4">
    <PageControl :title="list.name" btnText="Sortear Filme" v-if="list">
      <MenuDropdown @delete="deleteList">
        <MyButton variant="ghost">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </MyButton>
      </MenuDropdown>
    </PageControl>
    <p class="text-sm text-gray-500">Criado em: {{ list?.created_at }}</p>
    <div></div>
    <div class="w-full flex flex-wrap gap-4" v-if="list">
      <MovieCard v-for="movie in list.movies" :movie="movie" :key="movie.id" />
    </div>
  </div>

  <CreateListDialog
    :movieList="list?.movies"
    v-model:isOpen="isOpenCreateListDialog"
    @createList="console.log('create')"
  />
</template>

<script setup lang="ts">
import { ListService } from '@/shared/client/services/listService';
import MyButton from '@/shared/components/Button/MyButton/MyButton.vue';
import MovieCard from '@/shared/components/Cards/MovieCard/MovieCard.vue';
import CreateListDialog from '@/shared/components/Dialog/CreateListDialog.vue';
import { token } from '@/shared/utils/token';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import PageControl from '../components/Card/PageControl/PageControl.vue';
import MenuDropdown from '../components/Menu/MenuDropdown/MenuDropdown.vue';

const router = useRouter();

const listId = useRoute().params.id;

const isOpenCreateListDialog = ref(false);

const listService = new ListService(token);
const list = ref<any>(null);

const getCurrentList = async () => {
  list.value = await listService.getList(listId as string);
  console.log(list.value);
};

const deleteList = async () => {
  const response = await listService.deleteList(listId as string);

  if (response) {
    toast.success('Lista deletada com sucesso');
    router.push('/lists');
  }
};

onMounted(() => {
  getCurrentList();
});
</script>
