<template>
  <div>
    <div class="in_title"></div>
    <div class="in_des"></div>

    <div style="color:#fff;">{{ test }}</div>

    <video id="video" ref="video" :style="videoStyle" webkit-playsinline="true" playsinline="true" type="video/mp4" preload="auto" x5-video-player-type="h5" src="http://static.qcdqcdn.com/special/sizhao/img/video.mp4"></video>

    <a href="#" v-show="showLook" class="in_link" @click.prevent="play()"></a>
    <time-line :is-show="showLoad" :num="time" :line-width="lineWidth"></time-line>
    
    <end :is-show="showEnd" @replay="replay" @show-share="showShare"></end>

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
      test: config.API,
      showLoad: true,
      showLook: false,
      showEnd: false,
      flagShare: false,
      time: 0,
      timerJD: false,
      videoStyle: {
        width: "1px",
        height: "1px",
        zIndex: -1,
        display: "none"
      }
    };
  },
  computed: {
    lineWidth() {
      return { width: this.time + "%" };
    }
  },
  methods: {
    play() {
      let track = !!this.getUrlParam("shareback")
        ? "xyzsizhao_share_start_click"
        : "xyzsizhao_start_click";
      this.showLook = false;
      this.showEnd = false;
      this.showVideo();
      bdtag(track);
    },
    replay() {
      this.showLook = false;
      this.showEnd = false;
      this.showVideo();
      bdtag("xyzsizhao_restart_click");
    },
    timer() {
      if (90 < this.time && this.time < 95) {
        this.time++;
        this.timerJD = setTimeout(this.timer, 500);
        return;
      }
      if (this.time < 100) {
        this.time++;
        this.timerJD = setTimeout(this.timer, 10);
      } else {
        this.showLoad = false;
        this.showLook = true;
      }
    },
    showVideo() {
      this.videoStyle = {
        width: window.innerWidth + "px",
        height: window.innerHeight + "px",
        zIndex: 1,
        display: "block"
      };
      this.$refs.video.play();
    },
    hideVideo() {
      this.videoStyle = {
        width: "1px",
        height: "1px",
        zIndex: -1,
        display: "none"
      };
    },
    videoStatus() {
      var _self = this;
      this.$refs.video.addEventListener(
        "ended",
        () => {
          _self.hideVideo();

          // 播放结束
          _self.showEnd = true;
        },
        false
      );
    },
    hideShare() {
      this.flagShare = false;
    },
    showShare() {
      this.flagShare = true;
      bdtag("xyzsizhao_share_click");
    }
  },
  components: {
    timeLine,
    end,
    share
  },
  created() {
    stat();
  },
  mounted() {
    this.timer();
    this.videoStatus();
    BaseWxSahre();
  }
};
</script>