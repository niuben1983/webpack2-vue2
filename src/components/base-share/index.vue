<template>
  <div v-show="foo">
    <div class="mask2" @click.stop="close"></div>
    <div class="zsh_shareLayer">
        <ul class="clearfix" id="zsh_shareLayer">
            <li v-if="btn_wx" @click="shareToWeiXin">
                <a href="javascript:void(0);"><span class="zsh_wx"></span><span>微信</span></a>
            </li>
            <li v-if="btn_pyq" action="wx_timeline">
                <a href="javascript:void(0);"><span class="zsh_pyq"></span><span>朋友圈</span></a>
            </li>
            <!-- <li action="qq">
                <a href="javascript:void(0);"><span class="zsh_qq"></span><span>QQ</span></a>
            </li> -->
            <li @click="shareToSinaWeiBo">
                <a href="javascript:void(0);"><span class="zsh_wb"></span><span>微博</span></a>
            </li>
            <li @click="shareToQZone">
                <a href="javascript:void(0);"><span class="zsh_kj"></span><span>QQ空间</span></a>
            </li>
        </ul>
        <button type="button" class="zsh_cancel">取消</button>
    </div>
    <!-- 微信提示层 -->
    <div class="wx_fixed_tip wx_share_tip">
        <p>1、在Safari浏览器中点击“<img src="./img/share_img1.jpg" class="share_img1">”</p>
        <p>2、在弹出的浮层中点击更多“<img src="./img/share_img2.jpg" class="share_img2">”</p>
        <p>3、微信设置为“<img src="./img/share_img3.jpg" class="share_img3">”状态</p>
        <p>4、完成以上操作即可查看“微信”图标</p>
        <p>
            <img src="./img/share_img4.jpg" class="share_img4">
            <img src="./img/share_img4.jpg" class="share_img4">
            <img src="./img/share_img5.jpg" class="share_img5" >
            <img src="./img/share_img2.jpg" class="share_img2">
            点击完成分享
        </p>
    </div>
    <!-- 分享提示 -->
    <div class="tips share_tip">
        <p>点击 ••• 即可将内容“发送给朋友”或“分享到朋友圈”</p>
        <i></i>
    </div>
  </div>
</template>

<script>
import "./css.css";
import { toWinxin } from "./nativeShare";

export default {
  props: ["foo"],
  data() {
    return {
      btn_pyq: true,
      btn_wx: true,
      share_info: {
        title: document.title,
        desc: document.title,
        link: window.location.href,
        imgUrl: "http://jsx.qichedaquan.com/h5/img/logo2.png"
      }
    };
  },
  methods: {
    //关闭share层
    close() {
      this.$emit("update:foo", false);
    },
    shareToSinaWeiBo() {
      let img = this.share_info.imgUrl || "";
      let title = this.share_info.title + "@行圆汽车大全";
      var urlx = `http://v.t.sina.com.cn/share/share.php?c=&url=${encodeURIComponent(
        this.share_info.link
      )}&pic=${img}&type=1&title=${encodeURI(title)}&content=${encodeURI(
        this.share_info.desc
      )}&rnd=${new Date().valueOf()}`;
      window.open(urlx);
    },
    shareToQZone() {
      var urlx = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=${encodeURI(
        this.share_info.title
      )}&url=${encodeURIComponent(this.share_info.link)}&desc=${encodeURI(
        this.share_info.desc
      )}`;
      window.open(urlx);
    },
    shareToWeiXin() {
        toWinxin();
    },

    isqqBrowser() {
      var ua = navigator.userAgent.toLowerCase();
      var isqqBrowser = ua.split("MQQBrowser/").length > 1;
      return isqqBrowser;
    },
    isucBrowser() {
      var ua = navigator.userAgent.toLowerCase();
      var isucBrowser = ua.split("UCBrowser/").length > 1;
      return isucBrowser;
    }
  },
  created() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf("micromessenger") != -1;
    var isSafari = ua.indexOf("safari") > 0 && ua.indexOf("chrome") < 0;

    if (this.isqqBrowser() && this.isqqBrowser() && !isSafari) {
      this.btn_pyq = false;
      this.btn_wx = false;
    }
  },
  mounted() {}
};
</script>