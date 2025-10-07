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

export default {
  components: {
    TableComponent: TableComponent,
    MineForm: MineForm,
  },
  computed: {
    ...mapState(['timer', 'result']),
  },
  methods: {

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