<template>
  <div>                               <!-- 자바스크립트에서 css부분을 표현할 때에는 하이픈의 뒷부분을 대문자로 사용한다. ex) background-image -> backgroundImage -->
    <div id="computer"  v-bind:style="computedStyleObject"></div>
    <div>
      <button @click="onClickButton('바위')">바위</button> <!-- 인자를 넣어서 매개변수로 받는 행위도 가능 -->
      <button @click="onClickButton('가위')">가위</button>
      <button @click="onClickButton('보')">보</button>
    </div>
    <div>{{result}}</div>
    <div>현재 {{score}} 점</div>
    <lifecycle-example v-if="true" />
  </div>
</template>

<script>
  // 의미가 불분명한 변수들은 이름을 붙여주는 것이 좋다.
  const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
  };

  const scores = {
    가위: 1,
    바위: 0,
    보: -1,
  };

  const computerCoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function (v) {
      return v[1] === imgCoord;
    })[0];
  };

  let interval = null;
  export default {
    data() {
      return {
        imgCoord: rspCoords.바위,
        result: '',
        score: 0,
      }
    },
    computed: {
      computedStyleObject() {
        return {
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`
        }
      }
    },
    methods: {
      changeHand() {
        interval = setInterval(() => {
          if (this.imgCoord === rspCoords.바위) {
            this.imgCoord = rspCoords.가위;
          } else if (this.imgCoord === rspCoords.가위) {
            this.imgCoord = rspCoords.보;
          } else if (this.imgCoord === rspCoords.보) {
            this.imgCoord = rspCoords.바위;
          }
        }, 100)
      },
       async onClickButton(choice) {
        clearInterval(interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerCoice(this.imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
          this.result = '비겼습니다.';
        } else if ([-1, 2].includes(diff)) {
          this.result = '이겼습니다.';
          this.score += 1;
        } else {
          this.result = '졌습니다.';
          this.score -= 1;
        }
        setTimeout(() => {
          this.changeHand();
        }, 1000);
      },
    },
    beforeCreate() {
      console.log('beforeCreate');
    },
    created() {   /* 처음 컴포넌트가 보여지게 될 때. 보여지기는 하지만 화면에 나타나기 전 */
      console.log('created');
    },
    beforeMount() {
      console.log('beforeMounte');
    },
    async mounted() {   /* 화면에 나타난 후 */
      console.log('mounted');
      this.changeHand();
    },
    beforeUpdate() {
      console.log('beforeUpdate');
    },
    updated() {
      console.log('updated');
    },
    beforeUnmount() {
      console.log('beforeUnmount');
      clearInterval(interval);  /* component가 사라진 후에도 setInterval은 계속 실행되기 때문에 쌓이면 메모리 누수가 발생한다. clearInterval로 멈춰서 최종 정리해줘야 한다.   */
    },
    unmounted() {
      console.log('unmounted');
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