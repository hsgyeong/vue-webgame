import { createRouter, createWebHistory } from 'vue-router';
import NumberBaseball from '../numberbaseball/NumberBaseball';
import RockScissorsPaper from '../rockscissorspaper/RockScissorsPaper';
import ResponseCheck from '../responsecheck/ResponseCheck';
import LottoGenerator from '../lotto/LottoGenerator';

const routes = [
   { path: '/number-baseball', component: NumberBaseball },
   { path: '/response-check', component: ResponseCheck },
   { path: '/rock-scissors-paper', component: RockScissorsPaper },
   { path: '/lotto-generator', component: LottoGenerator },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;

