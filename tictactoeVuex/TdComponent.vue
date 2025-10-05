<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
import { mapState } from 'vuex';
import {CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER} from './store';
export default {
    props: {
      cellData: String,
      rowIndex: Number,
      cellIndex: Number,
    },
    computed: {
      ...mapState({     // mapState를 통해 vuex의 state를 간단하게 가져올 수 있다.
        tableData: state => state.tableData,
        turn: state => state.turn,
        cellData(state) {
          return state.tableData[this.rowIndex][this.cellIndex];
        }
      }),
    //  tableData() {
    //    return this.$store.state.tableData; // vuex의 state를 쓰기 위해서는 computed에 반드시 연결해야 한다.
    //  },
    //  turn() {
    //    return this.$store.state.turn;
    //  }
    },
    methods: {
      onClickTd() {
        //  const this = this.$root.$data;

        if (this.cellData) return;

        this.$store.commit(CLICK_CELL, { row: this.rowIndex, cell: this.cellIndex });

        const currentTurn = this.turn;

        let win = false;
        if (this.tableData[this.rowIndex][0] === currentTurn && this.tableData[this.rowIndex][1] === currentTurn && this.tableData[this.rowIndex][2] === currentTurn) {
          win = true;
        }
        if (this.tableData[0][this.cellIndex] === currentTurn && this.tableData[1][this.cellIndex] === currentTurn && this.tableData[2][this.cellIndex] === currentTurn) {
          win = true;
        }
        if (this.tableData[0][0] === currentTurn && this.tableData[1][1] === currentTurn && this.tableData[2][2] === currentTurn) {
          win = true;
        }
        if (this.tableData[0][2] === currentTurn && this.tableData[1][1] === currentTurn && this.tableData[2][0] === currentTurn) {
          win = true;
        }
        if(win) {   // 이긴 경우
          // this.winner = currentTurn; // 승자 기록
          this.$store.commit(SET_WINNER, this.turn);

          // this.turn = 'O';            // 데이터 초기화
          // this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
          this.$store.commit(RESET_GAME);
        } else {  // 무승부
          let all = true;
          this.tableData.forEach((row) => {   // 무승부 검사
            row.forEach((cell) => {
              if (!cell) {
                all = false;
              }
            });
          });
          if (all) {    // 무승부
            // this.turn = 'O';
            this.$store.commit(NO_WINNER);
            this.$store.commit(RESET_GAME);
            // this.winner = '';
            // this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
          } else {
            // this.turn = currentTurn === 'O' ? 'X' : 'O';
            this.$store.commit(CHANGE_TURN);
          }
        }
      }
    }
}
</script>