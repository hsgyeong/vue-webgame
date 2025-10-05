
import { createStore } from 'vuex';

// mutation의 이름을 변수로 뺄 수 있다. Object Dynamic Property. export를 붙여 모듈로 만들어서 다른 파일에서도 사용할 수 있음
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

export default createStore({
    state: {
        tableData: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ],
        turn: 'O',
        winner: '',
    },  // vue의 data와 비슷
    getters: {      // 추가적인 작업을 할 때 사용
        turnMessage(state) {
            return this.turn + '님이 승리하셨습니다.';
        }
    },  // vue의 computed와 비슷
    mutations: {    // 함수를 통해 값을 바꾼다. mutation의 함수는 대문자를 사용하는 것이 규칙
        [SET_WINNER](state, winner) {
            state.winner = winner;
        },
        [CLICK_CELL](state, { row, cell }) {
            state.tableData[row][cell] = state.turn;
        },
        [CHANGE_TURN](state) {
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        [RESET_GAME](state) {
            state.turn = 'O';
            state.tableData = [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ];
        },
        [NO_WINNER](state) {
            state.winner = '';
        }
    },  // 동기적으로 state를 수정할 때 사용. state를 뮤테이션을 통해 바꾸는 것을 권장
    actions: {

    },  // 비동기를 사용할때, 또는 여러 뮤테이션을 연달아 실행할 때
});