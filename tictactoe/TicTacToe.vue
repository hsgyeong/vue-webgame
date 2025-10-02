<template>
  <div>{{turn}}님의 턴입니다.</div>
  <table-component v-bind:table-data="tableData" :turn="turn"/>
  <div v-if="winner">{{winner}}님의 승리!</div>
</template>

<script>
import TableComponent from "./TableComponent.vue";

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