<template>
  <div v-show="isShow" class="in_loading">
    <div class="in_loading_pic">
      <span :style="lineWidth"></span>
    </div>
    <div class="in_loading_num">{{num}}%</div>
  </div>
</template>

<script>
export default {
  props: ['num', 'isShow', 'lineWidth']
};
</script>