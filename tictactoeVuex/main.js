import { createApp } from 'vue'
import TicTacToe from './TicTacToe.vue';
import store from './store';

// use(store)를 반드시 추가해야 Vuex store를 연결할 수 있다.
createApp(TicTacToe).use(store).mount('#root')

