<template>
  <div>
    <div id="screen" v-bind:class="state" @click="onClickScreen">{{message}}</div>
    <template v-show="result.length"> <!-- v-show: result.length가 false이면 display: none이 되고, true면 show / v-if는 태그 자체가 존재하지 않음 -->
      <div>평균 시간: {{ average }}ms</div>
      <button @click="onReset">리셋</button>
    </template>
  </div>
</template>

<script>
  let startTime = 0;
  let endTime = 0;
  let timeout = null;
  export default {
    data() {
      return {
        result: [],
        state: 'waiting',
        message: '클릭해서 시작하세요.'
      }
    },
    computed: {
      average() {
        return this.result.reduce((a, c) => a + c, 0) / this.result.length || 0;  // 데이터를 계산해서 보여주는 부분을 computed로 뺌. (일반 데이터를 가공해서 사용할 경우)
      }
    },
    methods: {
      onReset() {
        this.result = [];
      },
      onClickScreen() {
        if(this.state === 'waiting') {
          this.state = 'ready';
          this.message = '초록색이 되면 클릭하세요.';
          timeout = setTimeout(() => {
            this.state = 'now';
            this.message = '지금 클릭!!';
            startTime = new Date();
          }, Math.floor(Math.random() * 1000) + 2000) // 2~3초
        } else if (this.state === 'ready') {
          clearTimeout(timeout);
          this.state = 'waiting';
          this.message = '너무 성급하시군요! 초록색이 된 후에 클릭하세요.'
        } else if (this.state === 'now') {
          endTime = new Date();
          this.state = 'waiting';
          this.message = '클릭해서 시작하세요.'
          this.result.push(endTime - startTime);
        }
      }
    }
  }
</script>

<style scoped>  /*scoped를 붙이면 해당 컴포넌트 안에서만 css를 사용할 수 있음*/
  #screen {
    width: 300px;
    height: 200px;
    text-align: center;
    user-select: none;
  }
  #screen.waiting {
    background-color: aqua;
  }
  #screen.ready {
    background-color: red;
    color: white;
  }
  #screen.now {
    background-color: greenyellow;
  }
</style>