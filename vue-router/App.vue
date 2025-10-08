<template>
  <div>
    <div> <!-- router는 눈속임. 페이지가 바뀌는 것이 아니라 실제로는 컴포넌트가 바뀜 -->
      <router-link to="/number-baseball?pages=3&offset=10&limit=1&sort=createdAt">숫자야구</router-link>
      <router-link to="/response-check">반응속도</router-link>
      <router-link to="/rock-scissors-paper">가위바위보</router-link>
      <router-link to="/lotto-generator">로또생성기</router-link>
    </div>
    <router-view></router-view>   <!-- 바뀌는 화면 -->
  </div>
</template>

<script>
import router from './routes';

export default {
  router,
};
</script>

