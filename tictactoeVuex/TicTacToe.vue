<template>
  <div>{{turn}}님의 턴입니다.</div>
<!--  <table-component v-bind:table-data="tableData" :turn="turn"/> -->
<!--  자식 컴포넌트에서 화면에 표시되어야 할 내용을 부모 컴포넌트에 넣어줌으로써 부모 컴포넌트의 데이터나, 메서드나, computed에 접근할 수 있다.-->
  <table-component>
    <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
      <td @click="onClickTd(rowIndex, cellIndex)" v-for="(cellData, cellIndex) in rowData" :key="cellIndex">{{cellData}}</td>
    </tr>
  </table-component>
  <div v-if="winner">{{winner}}님의 승리!</div>
</template>

<script>
import { mapState } from 'vuex';
import TableComponent from "./TableComponent.vue";

export default {
  components: {
    TableComponent: TableComponent,
  },
  computed: {
    ...mapState(['winner', 'turn']),
//    ...mapState({
//      winner(state) {
//        return state.winner;
//      },
//      turnSstate: 'turn';
//    }),
//    tableData() {
//      return this.$store.state.tableData;
//    },
//    turn() {
//      return this.$store.state.turn;
//    },
//    winner() {
//      return this.$store.state.winner;
//    }
  }
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