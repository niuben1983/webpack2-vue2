let qApiSrc = {
    lower: "//3gimg.qq.com/html5/js/qb.js",
    higher: "//jsapi.qq.com/get?api=app.share"
};
let bLevel = {
    qq: { forbid: 0, lower: 1, higher: 2 },
    uc: { forbid: 0, allow: 1 }
};
let UA = navigator.appVersion.toLowerCase();
let isqqBrowser = (UA.split("mqqbrowser/").length > 1) ? bLevel.qq.higher : bLevel.qq.forbid;
let isucBrowser = (UA.split("ucbrowser/").length > 1) ? bLevel.uc.allow : bLevel.uc.forbid;
let isSafari = UA.indexOf("safari") > 0 && UA.indexOf("chrome") < 0;
let version = {
    uc: "",
    qq: ""
};
let isWeixin = false;

let url = document.location.href || '';
let title = document.title || '';
let desc = document.title || '';
let img = document.getElementsByTagName('img').length > 0 && document.getElementsByTagName('img')[0].src || '';
let img_title = document.title || '';
let from = window.location.host || '';

let ucAppList = {
    sinaWeibo: ['kSinaWeibo', 'SinaWeibo', 11, '新浪微博'],
    weixin: ['kWeixin', 'WechatFriends', 1, '微信好友'],
    weixinFriend: ['kWeixinFriend', 'WechatTimeline', '8', '微信朋友圈'],
    QQ: ['kQQ', 'QQ', '4', 'QQ好友'],
    QZone: ['kQZone', 'QZone', '3', 'QQ空间']
};

function isloadqqApi() {
    if (isqqBrowser) {
        let b = (version.qq < 5.4) ? qApiSrc.lower : qApiSrc.higher;
        let d = document.createElement("script");
        let a = document.getElementsByTagName("body")[0];
        d.setAttribute("src", b);
        a.appendChild(d)
    }
};

function is_weixin() {
    let a = UA.toLowerCase();
    if (a.match(/MicroMessenger/i) == "micromessenger") {
        return true
    } else {
        return false
    }
};

function getVersion(c) {
    let a = c.split("."), b = parseFloat(a[0] + "." + a[1]);
    return b
};

function init() {
    isloadqqApi();
    let platform_os = getPlantform();
    version.qq = isqqBrowser ? getVersion(UA.split("MQQBrowser/")[1]) : 0;
    version.uc = isucBrowser ? getVersion(UA.split("UCBrowser/")[1]) : 0;
    isWeixin = is_weixin();
    if ((isqqBrowser && version.qq < 5.4 && platform_os == "iPhone") || (isqqBrowser && version.qq < 5.3 && platform_os == "Android")) {
        isqqBrowser = bLevel.qq.forbid
    } else {
        if (isqqBrowser && version.qq < 5.4 && platform_os == "Android") {
            isqqBrowser = bLevel.qq.lower
        } else {
            if (isucBrowser && ((version.uc < 10.2 && platform_os == "iPhone") || (version.uc < 9.7 && platform_os == "Android"))) {
                isucBrowser = bLevel.uc.forbid
            }
        }
    }
};

function getPlantform() {
    if ((UA.indexOf("iPhone") > -1 || UA.indexOf("iPod") > -1)) {
        return "iPhone"
    }
    return "Android"
};

function share(to_app) {
    let platform_os = getPlantform();
    from = '汽车大全'
    if (isucBrowser) {
        to_app = to_app == '' ? '' : (platform_os == 'iPhone' ? ucAppList[to_app][0] : ucAppList[to_app][1]);
        if (to_app == 'QZone') {
            B = "mqqapi://share/to_qzone?src_type=web&version=1&file_type=news&req_type=1&image_url=" + img + "&title=" + title + "&description=" + desc + "&url=" + url + "&app_name=" + from;
            k = document.createElement("div"), k.style.visibility = "hidden", k.innerHTML = '<iframe src="' + B + '" scrolling="no" width="1" height="1"></iframe>', document.body.appendChild(k), setTimeout(function () {
                k && k.parentNode && k.parentNode.removeChild(k)
            }, 5E3);
        }

        if (typeof (ucweb) != "undefined") {
            window.setTimeout(function () {
                ucweb.startRequest("shell.page_share", [title, desc, url, to_app, "", "@" + from, ""])
            }, 200);
            //ucweb.startRequest("shell.page_share", [title, img, url, to_app, "", from, ""])
        } else {
            if (typeof (ucbrowser) != "undefined") {
                window.setTimeout(function () {
                    ucbrowser.web_share(title, desc, url, to_app, "", "@" + from, "")
                }, 200);
                //ucbrowser.web_share(title, img, url, to_app, "", from, '')
            } else {
            }
        }
    } else {
        if (isqqBrowser && !isWeixin) {
            to_app = to_app == '' ? '' : ucAppList[to_app][2];
            let ah = {
                url: url,
                title: title,
                description: desc,
                img_url: img,
                img_title: img_title,
                to_app: to_app,//微信好友1,腾讯微博2,QQ空间3,QQ好友4,生成二维码7,微信朋友圈8,啾啾分享9,复制网址10,分享到微博11,创意分享13
                cus_txt: "请输入此时此刻想要分享的内容"
            };
            ah = to_app == '' ? '' : ah;
            if (typeof (browser) != "undefined") {
                if (typeof (browser.app) != "undefined" && isqqBrowser == bLevel.qq.higher) {
                    browser.app.share(ah)
                }
            } else {
                if (typeof (window.qb) != "undefined" && isqqBrowser == bLevel.qq.lower) {
                    window.qb.share(ah)
                } else {
                }
            }
        } else {
        }
    }
};

init();
export {
};