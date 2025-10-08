
import { createStore } from 'vuex';

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
    MINE: -7,                   // 지뢰
    NORMAL: -1,                 // 빈칸
    QUESTION: -2,
    FLAG: -3,                   // 깃발
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0,                  // 0 이상이면 다 opened
}

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    // 기본적으로 빈칸
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for(let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    // 셔플정렬로 랜덤하게 지뢰를 심는다.
    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    return data;
}

export default createStore({
    state: {
        tableData: [

        ],
        data: {
            row: 0,
            cell: 0,
            mine: 0,
        },
        timer: 0,
        halted: true,       // 중단된
        result: '',
        openedCount: 0,
    },  // vue의 data와 비슷
    getters: {

    },  // vue의 computed와 비슷
    mutations: {
        [START_GAME](state, { row, cell, mine }) {
            state.data = {
                row,
                cell,
                mine,
            };
            state.tableData = plantMine(row, cell, mine);
            state.timer = 0;
            state.halted = false;       // 시작
            state.openedCount = 0;
            state.result = '';
        },
        [OPEN_CELL](state, { row, cell }) {
            let openedCount = 0;
            const checked = [];
            function checkAround(row, cell) {     // 주변 8칸 지뢰인지 검색
                const checkRowOrCellIsUndefined =  row < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length;
                if (checkRowOrCellIsUndefined) {
                    return;
                }
                if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(state.tableData[row][cell])) {
                    return;
                }
                if (checked.includes(row + '/' + cell)) {
                    return;
                } else {
                    checked.push(row + '/' + cell);
                }
                let around = [];
                if (state.tableData[row - 1]) {
                    around = around.concat([
                        state.tableData[row - 1][cell - 1], state.tableData[row - 1][cell], state.tableData[row - 1][cell + 1]
                    ]);
                }
                around = around.concat([
                    state.tableData[row][cell - 1], state.tableData[row][cell + 1]
                ]);
                if (state.tableData[row + 1]) {
                    around = around.concat([
                        state.tableData[row + 1][cell - 1], state.tableData[row + 1][cell], state.tableData[row + 1][cell + 1]
                    ]);
                }
                const counted = around.filter((v)=> {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                });

                if (state.tableData[row][cell] === CODE.NORMAL) {
                    openedCount += 1;
                }

                const count = counted.length;
                const changeTable = [...state.tableData];
                changeTable[row] = [...state.tableData[row]];
                changeTable[row][cell] = count;
                state.tableData = changeTable;

                if (counted.length === 0 && row > -1) {     // 주변 칸에 지뢰가 하나도 없을 경우
                    const near = [];
                    if (row - 1 > -1) {
                        near.push([row - 1, cell - 1]);
                        near.push([row - 1, cell]);
                        near.push([row - 1, cell + 1]);
                    }
                    near.push([row, cell - 1]);
                    near.push([row, cell + 1]);
                    if (row + 1 < state.tableData.length) {
                        near.push([row + 1, cell - 1]);
                        near.push([row + 1, cell]);
                        near.push([row + 1, cell + 1]);
                    }
                    near.forEach((n) => {
                        if (state.tableData[n[0]][n[1]] !== CODE.OPENED) {
                            checkAround(n[0], n[1]);
                        }
                    });
                }
            }
            checkAround(row, cell);

            state.openedCount += openedCount;

            if (state.data.row * state.data.cell - state.data.mine === state.openedCount) {
                state.halted = true;
                state.result = `${state.timer}초만에 승리하셨습니다.`;
            }
        },
        [CLICK_MINE](state, { row, cell }) {
            state.halted = true;
            const changeTableData = [...state.tableData];
            changeTableData[row] = [...state.tableData[row]];
            changeTableData[row][cell] = CODE.CLICKED_MINE;

            state.tableData = changeTableData;
        },
        [FLAG_CELL](state, { row, cell }) {
            const changeTableData = state.tableData.map((r, rowIndex) =>
                r.map((c, cellIndex) => {
                    if (rowIndex === row && cellIndex === cell) {
                        return c === CODE.MINE ? CODE.FLAG_MINE : CODE.FLAG;
                    }
                    return c;
                })
            )
            state.tableData = changeTableData;
        },
        [QUESTION_CELL](state, { row, cell }) {
            const changeTableData = state.tableData.map((r, rowIndex) =>
                r.map((c, cellIndex) => {
                    if (rowIndex === row && cellIndex === cell) {
                        return c === CODE.FLAG_MINE ? CODE.QUESTION_MINE : CODE.QUESTION;
                    }
                    return c;
                })
            )
            state.tableData = changeTableData;
        },
        [NORMALIZE_CELL](state, { row, cell }) {
            const changeTableData = state.tableData.map((r, rowIndex) =>
                r.map((c, cellIndex) => {
                    if (rowIndex === row && cellIndex === cell) {
                        return c === CODE.QUESTION_MINE ? CODE.MINE : CODE.NORMAL;
                    }
                    return c;
                })
            )
            state.tableData = changeTableData;
        },
        [INCREMENT_TIMER](state) {
            state.timer += 1;
        },
    },
    actions: {

    },  // 비동기를 사용할때, 또는 여러 뮤테이션을 연달아 실행할 때
});