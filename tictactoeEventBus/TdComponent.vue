<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
import EventBus from './EventBus';
export default {
    props: {
      cellData: String,
      rowIndex: Number,
      cellIndex: Number,
      turn : String,
    },
    methods: {
      onClickTd() {
        EventBus.emit("clickTd", {
          rowIndex: this.rowIndex,
          cellIndex: this.cellIndex,
        });
      }
    }
}
</script>