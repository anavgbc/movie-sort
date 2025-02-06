import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './shared/styles/style.css';

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount('#app');
