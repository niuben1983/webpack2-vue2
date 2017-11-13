<template>
  <div>

    <div @click="flagShare = !flagShare" style="width:100%; line-heihgt: 10rem; background:#f00">按钮</div>

    <share :foo.sync="flagShare"></share>
    
  </div>
</template>

<script>
import Vue from "vue";
import util from "../../lib/util";
import { BaseWxSahre, wxConfig, wxShare } from "../../lib/wx";
import { stat, bdtag } from "../../lib/stat";

const config = CONFIG;

import timeLine from "../../components/index/time-line";
import end from "../../components/index/end";
import share from "../../components/index/share";
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