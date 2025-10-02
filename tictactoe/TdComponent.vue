<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
export default {
    props: {
      cellData: String,
      rowIndex: Number,
      cellIndex: Number,
    },
    methods: {
      onClickTd() {
        const rootData = this.$root.$data;
        const currentTurn = rootData.turn;
        console.log(this.$root.$data);
        this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn;
        this.$root.$data.turn = this.$root.$data.turn === 'O' ? 'X' : 'O';

        let win = false;
        if (rootData.tableData[this.rowIndex][0] === currentTurn && rootData.tableData[this.rowIndex][1] === currentTurn && rootData.tableData[this.rowIndex][2] === currentTurn) {
          win = true;
        }
        if (rootData.tableData[0][this.cellIndex] === currentTurn && rootData.tableData[1][this.cellIndex] === currentTurn && rootData.tableData[2][this.cellIndex] === currentTurn) {
          win = true;
        }
        if (rootData.tableData[0][0] === currentTurn && rootData.tableData[1][1] === currentTurn && rootData.tableData[2][2] === currentTurn) {
          win = true;
        }
        if (rootData.tableData[0][2] === currentTurn && rootData.tableData[1][1] === currentTurn && rootData.tableData[2][0] === currentTurn) {
          win = true;
        }
        if(win) {   // 이긴 경우
          rootData.winner = currentTurn; // 승자 기록
          rootData.turn = 'O';            // 데이터 초기화
          rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
        } else {  // 무승부
          let all = true;
          rootData.tableData.forEach((row) => {   // 무승부 검사
            row.forEach((cell) => {
              if (!cell) {
                all = false;
              }
            });
          });
          if (all) {    // 무승부
            rootData.turn = 'O';
            rootData.winner = '';
            rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
          } else {
            rootData.turn = currentTurn === 'O' ? 'X' : 'O';
          }
        }
      }
    }
}
</script>