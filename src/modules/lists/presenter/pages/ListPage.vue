<template>
  <div class="bg-primary w-full h-full flex flex-col justify-start gap-5 p-5 px-12">
    <PageControl
      title="Suas listas"
      btnText="Criar lista"
      @click="isOpenCreateListDialog = true"
    >
    <MyButton class="p-0 h-full w-8 px-6" variant="outline">
      <i class="fa-solid fa-pen"></i>
      </MyButton>
    </PageControl>
    <div class="h-[80%] flex justify-start gap-3 flex-wrap" v-if="lists">
      <ListCard
        v-for="list in lists"
        :list="list"
        :key="list.id"
        @click="router.push(`/lists/${list.id}`)"
      />
    </div>
    <div v-else class="flex flex-col gap-2 items-center justify-center h-[80%]">
      <img src="@/assets/images/movie-list.svg" class="w-64 h-64" />
      <p class="font-display text-gray-400">Não existe nada aqui. Crie sua primeira lista!</p>
      <p class="text-sm font-display text-gray-500 font-medium">Ex.: Filmes para assistir em 2025</p>
    </div>
  </div>

  <CreateListDialog
    :movieList="[]"
    v-model:open="isOpenCreateListDialog"
    @createList="createList"
  />
</template>

<script setup lang="ts">
import { ListService } from '@/shared/client/services/listService';
import MyButton from '@/shared/components/Button/MyButton/MyButton.vue';
import CreateListDialog from '@/shared/components/Dialog/CreateListDialog.vue';
import { token } from '@/shared/utils/token';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import ListCard from '../components/Card/ListCard/ListCard.vue';
import PageControl from '../components/Card/PageControl/PageControl.vue';

const router = useRouter();
const isOpenCreateListDialog = ref(false);

const listService = new ListService(token);

const lists = ref();
const images = ref();

const getLists = async () => {
  try{
    lists.value = await listService.getLists();
  }catch(err){
    console.log(err);
    toast.error('Erro ao buscar listas');
};
}

const createList = async (listData: any) => {

  const payload = {...listData }
  const response = await listService.createList(payload);
  console.log('response: ', response)
  if (response) {
    isOpenCreateListDialog.value = false;
    getLists();
    toast.success('Lista criada com sucesso');
  }
};

onMounted(() => {
  getLists();
  console.log(lists.value);
});
</script>
