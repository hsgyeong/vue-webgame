<template>
  <div>
    <input type="number" placeholder="세로" :value="row" @change="onChangeRow">
    <input type="number" placeholder="가로" :value="cell" @change="onChangeCell">
    <input type="number" placeholder="지뢰" :value="mine" @change="onChangeMine">
    <button @click="onClickBtn">시작</button>
  </div>
</template>
<script>
  import {START_GAME} from "./store";
  // 데이터를 여러 컴포넌트에서 같이 사용하면 vuex에서 관리하고, 해당 컴포넌트에서만 사용한다면 지역적인 데이터로 만드는 것이 좋다. 공통적인 데이터만 vuex에 state로 만들기
  export default {
    data() {
      return {
        row: 10,
        cell: 10,
        mine: 20,
      }
    },
    methods: {
      onChangeRow(e) {
        this.row = e.target.value;
      },
      onChangeCell(e) {
        this.cell = e.target.value;
      },
      onChangeMine(e) {
        this.mine = e.target.value;
      },
      onClickBtn() {
        this.$store.commit(START_GAME, {row: this.row, cell: this.cell, mine: this.mine});
      }
    }
  }
</script>