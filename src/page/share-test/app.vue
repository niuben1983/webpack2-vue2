<template>
  <div>

    <button class="btn" @click="showShare">分享按钮</button>

    <share :foo.sync="flagShare"></share>
    
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
        flagShare: false
    };
  },
  computed: {
  },
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
  created() {
  },
  mounted() {
  }
};
</script>