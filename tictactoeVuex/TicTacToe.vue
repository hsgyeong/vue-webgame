<template>
  <div>{{turn}}님의 턴입니다.</div>
  <table-component v-bind:table-data="tableData" :turn="turn"/>
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