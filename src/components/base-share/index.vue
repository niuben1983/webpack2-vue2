<template>
  <div v-show="foo">
    <div class="mask2" @click.stop="close"></div>
    <div class="zsh_shareLayer" v-if="hasShare" v-show="sShare">
        <ul class="clearfix" id="zsh_shareLayer">
            <li v-if="btn_wx" @click="shareToWeiXin">
                <a href="javascript:void(0);"><span class="zsh_wx"></span><span>微信</span></a>
            </li>
            <li v-if="btn_pyq" @click="shareToPYQ">
                <a href="javascript:void(0);"><span class="zsh_pyq"></span><span>朋友圈</span></a>
            </li>
            <li @click="shareToSinaWeiBo">
                <a href="javascript:void(0);"><span class="zsh_wb"></span><span>微博</span></a>
            </li>
            <li v-if="btn_qq" @click="shareToQQ">
                <a href="javascript:void(0);"><span class="zsh_qq"></span><span>QQ</span></a>
            </li>
            <li @click="shareToQZone">
                <a href="javascript:void(0);"><span class="zsh_kj"></span><span>QQ空间</span></a>
            </li>
        </ul>
        <button type="button" class="zsh_cancel" @click.stop="close">取消</button>
    </div>
    <!-- 微信提示层 -->
    <div class="wx_fixed_tip wx_share_tip" v-if="hasShare" v-show="sWeiXinTips">
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
    <div class="tips share_tip" v-if="hasWeixin">
        <p>点击 ••• 即可将内容“发送给朋友”或“分享到朋友圈”</p>
        <i></i>
    </div>
  </div>
</template>

<script>
import { BaseWxSahre, wxConfig, wxShare } from "../../lib/wx";
import "./css.css";

export default {
  props: {
    foo: Boolean,
    title: {
      type: String,
      default: () => {
        return document.title+'1111';
      }
    },
    desc: {
      type: String,
      default: () => {
        return document.title;
      }
    },
    link: {
      type: String,
      default: () => {
        return location.href;
      }
    },
    imgUrl: {
      type: String,
      default: () => {
        return "http://jsx.qichedaquan.com/h5/img/logo2.png";
      }
    },
    imgTitle: {
      type: String,
      default: () => {
        return location.href;
      }
    },
    from: {
      type: String,
      default: () => {
        return "汽车大全";
      }
    }
  },
  data() {
    return {
      btn_pyq: true,
      btn_wx: true,
      btn_qq: false,
      hasWeixin: false,
      sWeiXinTips: false,
      hasShare: false,
      sShare: false,
      isWeixin: false,
      isSafari: false,
      isqqBrowser: 0,
      isucBrowser: 0,
      qApiSrc: {
        lower: "//3gimg.qq.com/html5/js/qb.js",
        higher: "//jsapi.qq.com/get?api=app.share"
      },
      bLevel: {
        qq: { forbid: 0, lower: 1, higher: 2 },
        uc: { forbid: 0, allow: 1 }
      },
      version: {
        uc: "",
        qq: ""
      },
      ucAppList: {
        sinaWeibo: ["kSinaWeibo", "SinaWeibo", 11, "新浪微博"],
        weixin: ["kWeixin", "WechatFriends", 1, "微信好友"],
        weixinFriend: ["kWeixinFriend", "WechatTimeline", "8", "微信朋友圈"],
        QQ: ["kQQ", "QQ", "4", "QQ好友"],
        QZone: ["kQZone", "QZone", "3", "QQ空间"]
      }
    };
  },
  methods: {
    //关闭share层
    close() {
      this.$emit("update:foo", false);
      this.viewInit();
    },
    shareToSinaWeiBo() {
      if (this.isqqBrowser || this.isucBrowser) {
        this.share("sinaWeibo");
        return;
      }
      let img = this.imgUrl || "";
      let title = this.title + "@" + this.from;
      var urlx = `http://v.t.sina.com.cn/share/share.php?c=&url=${encodeURIComponent(
        this.link
      )}&pic=${img}&type=1&title=${encodeURI(title)}&content=${encodeURI(
        this.desc
      )}&rnd=${new Date().valueOf()}`;
      window.open(urlx);
    },
    shareToQZone() {
      if (this.isqqBrowser || this.isucBrowser) {
        this.share("QZone");
        return;
      }
      var urlx = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=${encodeURI(
        this.title
      )}&url=${encodeURIComponent(this.link)}&desc=${encodeURI(this.desc)}`;
      window.open(urlx);
    },
    shareToWeiXin() {
      if (this.isqqBrowser || this.isucBrowser) {
        this.share("weixin");
      } else if (this.isSafari) {
        this.sWeiXinTips = true;
        this.sShare = false;
      }
    },
    shareToPYQ() {
      if (this.isqqBrowser || this.isucBrowser) {
        this.share("weixinFriend");
      } else if (this.isSafari) {
        this.sWeiXinTips = true;
        this.sShare = false;
      }
    },
    shareToQQ() {
      this.share("QQ");
    },
    shareInit() {
      let UA = navigator.appVersion.toLowerCase();
      let platform_os = this.getPlantform();
      this.version.qq = this.isqqBrowser
        ? this.getVersion(UA.split("mqqbrowser/")[1])
        : 0;
      this.version.uc = this.isucBrowser
        ? this.getVersion(UA.split("ucbrowser/")[1])
        : 0;
      if (
        (this.isqqBrowser &&
          this.version.qq < 5.4 &&
          platform_os == "iPhone") ||
        (this.isqqBrowser && this.version.qq < 5.3 && platform_os == "Android")
      ) {
        this.isqqBrowser = this.bLevel.qq.forbid;
      } else {
        if (
          this.isqqBrowser &&
          this.version.qq < 5.4 &&
          platform_os == "Android"
        ) {
          this.isqqBrowser = bLevel.qq.lower;
        } else {
          if (
            this.isucBrowser &&
            ((this.version.uc < 10.2 && platform_os == "iPhone") ||
              (this.version.uc < 9.7 && platform_os == "Android"))
          ) {
            this.isucBrowser = this.bLevel.uc.forbid;
          }
        }
      }
      this.isloadqqApi();
    },
    isloadqqApi() {
      if (this.isqqBrowser) {
        let b =
          this.version.qq < 5.4 ? this.qApiSrc.lower : this.qApiSrc.higher;
        let d = document.createElement("script");
        let a = document.getElementsByTagName("body")[0];
        d.setAttribute("src", b);
        a.appendChild(d);
      }
    },
    getPlantform() {
      let UA = navigator.appVersion.toLowerCase();
      if (UA.indexOf("iphone") > -1 || UA.indexOf("ipod") > -1) {
        return "iPhone";
      }
      return "Android";
    },
    getVersion(c) {
      let a = c.split("."),
        b = parseFloat(a[0] + "." + a[1]);
      return b;
    },
    share(to_app) {
      let platform_os = this.getPlantform();
      if (this.isucBrowser) {
        to_app =
          to_app == ""
            ? ""
            : platform_os == "iPhone"
              ? this.ucAppList[to_app][0]
              : this.ucAppList[to_app][1];
        if (to_app == "QZone") {
          B = `mqqapi://share/to_qzone?src_type=web&version=1&file_type=news&req_type=1&image_url=${this
            .imgUrl}&title=${this.title}&description=${this.desc}&url=${this
            .link}&app_name=${this.from}`;
          (k = document.createElement("div")),
            (k.style.visibility = "hidden"),
            (k.innerHTML = `<iframe src="${B}" scrolling="no" width="1" height="1"></iframe>`),
            document.body.appendChild(k),
            setTimeout(function() {
              k && k.parentNode && k.parentNode.removeChild(k);
            }, 5e3);
        }

        if (typeof ucweb != "undefined") {
          let _self = this;
          window.setTimeout(function() {
            ucweb.startRequest("shell.page_share", [
              _self.title,
              _self.desc,
              _self.link,
              to_app,
              "",
              "@" + _self.from,
              ""
            ]);
          }, 200);
          //ucweb.startRequest("shell.page_share", [title, img, url, to_app, "", from, ""])
        } else {
          if (typeof ucbrowser != "undefined") {
            let _self = this;
            window.setTimeout(function() {
              ucbrowser.web_share(
                _self.title,
                _self.desc,
                _self.link,
                to_app,
                "",
                "@" + _self.from,
                ""
              );
            }, 200);
            //ucbrowser.web_share(title, img, url, to_app, "", from, '')
          } else {
          }
        }
      } else {
        if (this.isqqBrowser && !this.isWeixin) {
          to_app = to_app == "" ? "" : this.ucAppList[to_app][2];
          let ah = {
            url: this.link,
            title: this.title,
            description: this.desc,
            img_url: this.imgUrl,
            img_title: this.imgTitle,
            to_app: to_app, //微信好友1,腾讯微博2,QQ空间3,QQ好友4,生成二维码7,微信朋友圈8,啾啾分享9,复制网址10,分享到微博11,创意分享13
            cus_txt: "请输入此时此刻想要分享的内容"
          };
          ah = to_app == "" ? "" : ah;

          if (typeof window.browser != "undefined") {
            if (
              typeof window.browser.app != "undefined" &&
              this.isqqBrowser == this.bLevel.qq.higher
            ) {
              window.browser.app.share(ah);
            }
          } else {
            if (
              typeof window.qb != "undefined" &&
              this.isqqBrowser == this.bLevel.qq.lower
            ) {
              window.qb.share(ah);
            } else {
            }
          }
        } else {
        }
      }
    },
    viewInit() {
      this.sWeiXinTips = false;
      if (this.isWeixin) {
        this.hasWeixin = true;
        this.hasShare = false;
      } else {
        this.hasWeixin = false;
        this.hasShare = true;
        this.sShare = true;
      }
    }
  },
  created() {
    let ua = navigator.userAgent.toLowerCase();
    this.isWeixin = ua.indexOf("micromessenger") != -1;
    this.isSafari = ua.indexOf("safari") > 0 && ua.indexOf("chrome") < 0;
    this.isqqBrowser =
      ua.split("mqqbrowser/").length > 1
        ? this.bLevel.qq.higher
        : this.bLevel.qq.forbid;
    this.isucBrowser =
      ua.split("ucbrowser/").length > 1
        ? this.bLevel.uc.allow
        : this.bLevel.uc.forbid;

    if (this.isqqBrowser || this.isucBrowser) {
      this.btn_qq = true;
      this.shareInit();
    } else {
      if (!this.isSafari) {
        this.btn_pyq = false;
        this.btn_wx = false;
      }
    }

    this.viewInit();
  },
  mounted() {}
};
</script>