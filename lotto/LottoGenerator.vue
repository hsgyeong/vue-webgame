<template>
  <div>                               <!-- 자바스크립트에서 css부분을 표현할 때에는 하이픈의 뒷부분을 대문자로 사용한다. ex) background-image -> backgroundImage -->
    <div>당첨 숫자</div>
    <div id="결과창">
      <lotto-ball v-for="ball in winBalls" :key="ball" v-bind:number="ball"></lotto-ball>
    </div>
    <div>보너스</div>
    <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
    <button v-if="redo" @click="onClickRedo">한 번 더!</button>  <!-- redo: 버튼이 보일지 안 보일지 -->
  </div>
</template>

<script>
  import LottoBall from "./LottoBall.vue";

  function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
      shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
  }
  export default {
    components: {
      'lotto-ball': LottoBall,
    },
    data() {
      return {
        winNumbers: getWinNumbers(),
        winBalls: [],
        bonus: null,
        redo: false,
        timeouts: [],
      }
    },
    computed: {

    },
    methods: {
      onClickRedo () {
          this.winNumbers = getWinNumbers();
          this.winBalls = [];
          this.bonus = null;
      },
      showBalls() {
        for (let i = 0; i < this.winNumbers.length - 1; i++) {
          timeouts[i] = setTimeout(() => {
            this.winBalls.push(this.winNumbers[i]);
          }, (i + 1) * 1000);
        }
        timeouts[6] = setTimeout(() => {
          this.bonus = this.winNumbers[6];
          this.redo = true;
        }, 7000);
      },
    },
    mounted() {
      this.showBalls();   // 시작할 때만 실행
    },
    beforeUnmount() {
      timeouts.forEach((t) => { clearTimeout(t) });
    },
    watch: {    /* 어떤 값이 바뀌었는지 감시하는 기능 */
      bonus(value, oldVal) {
        console.log(value, oldVal);
        if (value === null) {
          this.showBalls();
        }
      }
    }
  };
</script>

<style scoped>
  #computer {
    width: 142px;
    height: 200px;
    background-position: 0 0;
  }
</style>