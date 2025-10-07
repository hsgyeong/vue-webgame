import { createApp } from 'vue'
import MineSweeper from './MineSweeper.vue';
import store from './store';

// use(store)를 반드시 추가해야 Vuex store를 연결할 수 있다.
createApp(MineSweeper).use(store).mount('#root')

