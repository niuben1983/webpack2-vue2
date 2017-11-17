<template>
  <div>

    <button class="btn" @click="showShare">分享按钮</button>

    <share :foo.sync="flagShare" v-bind="share_info"></share>
    
  </div>
</template>

<script>
import Vue from "vue";
import util from "../../lib/util";

import share from "../../components/base-share/index";
Vue.use(util);

export default {
  data() {
    return {
      flagShare: false,
      share_info: {
        title: '这是分享标题',
        desc: '这是分享描述',
        link: location.href,
        imgUrl: "http://jsx.qichedaquan.com/h5/img/logo2.png",
        imgTitle: '这是分享图片的标题',
        from: "汽车大全"
      }
    };
  },
  computed: {},
  methods: {
    hideShare() {
      this.flagShare = false;
    },
    showShare() {
      this.flagShare = true;
    }
  },
  components: {
    share
  },
  created() {},
  mounted() {}
};
</script>