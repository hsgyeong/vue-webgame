<template>
  <div>
    <mine-form></mine-form>
      <div>{{timer}}</div>
      <table-component />
      <div>{{result}}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TableComponent from "./TableComponent.vue";
import MineForm from "./MineForm.vue";
import { INCREMENT_TIMER } from "./store";

let interval;

export default {
  components: {
    TableComponent: TableComponent,
    MineForm: MineForm,
  },
  computed: {
    ...mapState(['timer', 'result', 'halted']),
  },
  methods: {

  },
  watch: {
    halted(value, oldValue) {
      if (value === false) {          // false일때 게임 시작
        interval = setInterval(() => {
          this.$store.commit(INCREMENT_TIMER);
        }, 1000)              // 게임 시작시 1초마다 타이머 올려주기
      } else {    // 게임 중단
        clearInterval(interval);     // 메모리 누수 막기 위해 정리
      }
    }
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