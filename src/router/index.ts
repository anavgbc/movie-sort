import Home from '@/modules/home/presenter/pages/HomePage.vue';
import ListDetails from '@/modules/lists/presenter/pages/ListDetails.vue';
import ListPage from '@/modules/lists/presenter/pages/ListPage.vue';
import FavoritesMovies from '@/modules/movie/presenter/pages/FavoritesMovies.vue';
import MovieDetails from '@/modules/movie/presenter/pages/MovieDetails.vue';
import SorterPage from '@/modules/sorter/presenter/pages/SorterPage.vue';
import DefaultLayout from '@/shared/layout/DefaultLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
      {
        path: '/lists',
        name: 'lists',
        component: ListPage,
      },
      {
        path: '/favorites',
        name: 'favorites',
        component: FavoritesMovies,
      },
      {
        path: '/lists/:id',
        name: 'list',
        component: ListDetails,
      },
      {
        path: '/movie/:id',
        name: 'movie',
        component: MovieDetails,
      },
      {
        path: '/sorter',
        name: 'sorter',
        component: SorterPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
