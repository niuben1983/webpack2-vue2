<template>
   <div v-show="isShow" class="end">
        <dl class="end_head">
            <dt>汽车大全小程序</dt>
            <dd>― 行圆汽车出品 ―</dd>
        </dl>
        <div class="end_ewm"><img :src="ewm" alt=""></div>
        <div class="end_btns">
            <a href="#" class="end_btn_replay" @click.prevent="replay"></a>
            <a href="#" class="end_btn_share" @click.prevent="showShare"></a>
        </div>
    </div>
</template>

<script>
import pic from '../../img/ewm.jpg'
export default {
  props: ["isShow"],
  data(){
      return {
          ewm: pic
      }
  },
  methods: {
    replay() {
      this.$emit("replay");
    },
    showShare() {
      this.$emit("show-share");
    }
  },
  components: {}
};
</script>