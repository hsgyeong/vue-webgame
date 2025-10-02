<template>
  <tr>                                          <!--반복문이 있으면 키를 넣어줘야 함-->
    <td-component v-for="(cellData, index) in rowData" :key="index" :cell-data="cellData" :cell-index="index" :row-index="rowIndex"></td-component>
  </tr>
</template>

<script>
import TdComponent from "./TdComponent.vue";

export default {
  components: {
    TdComponent,
  },
  data() {
    return {
      parent: '부모',
    }
  },
  props: {
    rowData: Array,
    rowIndex: Number,
  }
}
</script>