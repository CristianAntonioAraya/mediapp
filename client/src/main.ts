import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import router from './router/router.ts';

const app = createApp(App);
app.use(router); // Usa el enrutador
app.mount('#app');