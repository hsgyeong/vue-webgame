<template>
  <table>             <!--행수 만큼 반복문-->              <!--tr(row)에 데이터를 넘겨주고, 인덱스도 넘겨준다.-->
    <tr-component v-for="(rowData, index) in tableData" :key="index" :row-data="rowData" :row-index="index" :turn="turn">
    </tr-component>
  </table>
</template>

<script>
import TrComponent from './TrComponent';
export default {
  props: {
    tableData: Array,
  },
  components: {
    TrComponent,
  }
}
</script>