<template>
  <div>{{turn}}님의 턴입니다.</div>
  <table-component v-bind:table-data="tableData" :turn="turn"/>
  <div v-if="winner">{{winner}}님의 승리!</div>
</template>

<script>
import TableComponent from "./TableComponent.vue";
import EventBus from "./EventBus";

export default {
  components: {
    TableComponent: TableComponent,
  },
  data() {
    return {
      tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
      ],
      turn: 'O',
      winner: '',
    }
  },
  methods: {
    onClickTd(rowIndex, cellIndex) {
     //  const this = this.$root.$data;
      const currentTurn = this.turn;

      this.tableData = this.tableData.map((row, r) =>
        row.map((cell, c) => (r === rowIndex && c === cellIndex ? currentTurn : cell))
      );

      let win = false;
      if (this.tableData[rowIndex][0] === currentTurn && this.tableData[rowIndex][1] === currentTurn && this.tableData[rowIndex][2] === currentTurn) {
        win = true;
      }
      if (this.tableData[0][cellIndex] === currentTurn && this.tableData[1][cellIndex] === currentTurn && this.tableData[2][cellIndex] === currentTurn) {
        win = true;
      }
      if (this.tableData[0][0] === currentTurn && this.tableData[1][1] === currentTurn && this.tableData[2][2] === currentTurn) {
        win = true;
      }
      if (this.tableData[0][2] === currentTurn && this.tableData[1][1] === currentTurn && this.tableData[2][0] === currentTurn) {
        win = true;
      }
      if(win) {   // 이긴 경우
        this.winner = currentTurn; // 승자 기록
        this.turn = 'O';            // 데이터 초기화
        this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
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
          this.turn = 'O';
          this.winner = '';
          this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
        } else {
          this.turn = currentTurn === 'O' ? 'X' : 'O';
        }
      }
    }
  },
  mounted() {
    EventBus.on("clickTd", ({ rowIndex, cellIndex }) =>
      this.onClickTd(rowIndex, cellIndex)
    );
  }, beforeUnmount() {
    EventBus.off("clickTd");
  },
};
</script>

<style>
  table {
    border-collapse: collapse;
  }
  td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
  }
</style>