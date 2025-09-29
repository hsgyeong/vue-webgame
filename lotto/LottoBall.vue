<template>
  <div class="ball" :style="styelObject">{{number}}</div>
</template>

<script>
  export default{
    name: 'LottoBall',
/*                        props -> LottoGenerator 컴포넌트가 LottoBall 컴포넌트를 사용하는데 부모가 자식한테 데이터를 넘겨줄 수 있다.
    props: {
      number: Number,
    },
*/
    props: ['number'],
    computed: {
      styleObject() {
        let background;
        if (this.number < 10) {
          background = 'red';
        } else if (this.number <= 20) {
          background = 'orange';
        } else if (this.number <= 30) {
          background = 'yellow';
        } else if (this.number <= 40) {
          background = 'green';
        } else {
          background = 'blue';
        }
        return {
          background,
        };
      }
    },
  }
</script>

<style>
  .ball {
    display: inline-block;
    border: 1px solid black;
    border-radius: 20px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    text-align: center;
    margin-right: 20px;
  }
</style>