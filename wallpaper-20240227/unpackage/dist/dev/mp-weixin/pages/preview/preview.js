"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_layoutStore = require("../../stores/layoutStore.js");
const stores_dataStore = require("../../stores/dataStore.js");
const api_wallpaper = require("../../api/wallpaper.js");
require("../../unit/request.js");
require("../../unit/basicData.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "preview",
  setup(__props) {
    const layoutStore = stores_layoutStore.useLayoutStore();
    const dataStore = stores_dataStore.useDataStore();
    const shwoInfoRef = common_vendor.ref(true);
    const dateNowRef = common_vendor.ref(Date.now());
    const timer = {
      date: null
    };
    const infoPanlRef = common_vendor.ref();
    const ratePanlRef = common_vendor.ref();
    const backIconTopComputed = common_vendor.computed(() => layoutStore.statusBarHeight || 15);
    const dy_TitleLeftIconDistanceComputed = common_vendor.computed(() => layoutStore.dy_TitleLeftIconDistance);
    const classifyComputed = common_vendor.computed(() => dataStore.classify);
    const wallListComputed = common_vendor.computed(() => {
      return dataStore.wall.map((p) => {
        p.picurl = p.smallPicurl.replace("_small.webp", ".jpg");
        return p;
      });
    });
    const queryRef = common_vendor.ref({ wallId: "" });
    const wallIndexRef = common_vendor.ref(0);
    const wallReadedRef = common_vendor.ref([]);
    const previeWallComputed = common_vendor.computed(() => wallListComputed.value[wallIndexRef.value]);
    const classNameComputed = common_vendor.computed(() => {
      let name = "未知分类";
      const data = classifyComputed.value.filter((d) => d._id === previeWallComputed.value.classid);
      data.length > 0 && (name = data[0].name);
      return name;
    });
    const scoreRef = common_vendor.ref(0);
    const showScoreComputed = common_vendor.computed(() => {
      return previeWallComputed.value.userScore ? previeWallComputed.value.userScore : previeWallComputed.value.score;
    });
    const startDatetime = () => {
      dateNowRef.value = Date.now();
      timer.date = setInterval(() => {
        dateNowRef.value = Date.now();
      }, 1e3);
    };
    const stopDatetime = () => {
      timer.date && clearInterval(timer.date);
    };
    const getWillAroundIndex = (index) => {
      let indexs = [];
      if (index === 0) {
        indexs = [wallListComputed.value.length - 1, index, index + 1];
      } else if (index === wallListComputed.value.length - 1) {
        indexs = [index - 1, index, 0];
      } else {
        indexs = [index - 1, index, index + 1];
      }
      return indexs;
    };
    const imageClick = () => {
      shwoInfoRef.value = !shwoInfoRef.value;
    };
    const showInfoClick = () => {
      infoPanlRef.value.open();
    };
    const closeInfoPopupClick = () => {
      infoPanlRef.value.close();
    };
    const showRateClick = () => {
      ratePanlRef.value.open();
    };
    const closeRateClick = () => {
      ratePanlRef.value.close();
    };
    const rateSubmitClick = () => {
      common_vendor.index.showLoading({
        title: "提交评分中..."
      });
      const data = {
        classid: previeWallComputed.value.classid,
        wallId: previeWallComputed.value._id,
        userScore: scoreRef.value
      };
      api_wallpaper.setupSocre(data).then((res) => {
        if (res.errCode === 0) {
          common_vendor.index.showToast({
            title: "评分成功",
            icon: "success"
          }).finally(() => {
            const list = JSON.parse(JSON.stringify(wallListComputed.value));
            const data2 = JSON.parse(JSON.stringify(previeWallComputed.value));
            data2.score = scoreRef.value;
            list[wallIndexRef.value] = data2;
            dataStore.setWallData(list);
            closeRateClick();
          });
        } else {
          common_vendor.index.showToast({
            title: "评分失败",
            icon: "error"
          });
          console.error("评分失败", res.errMsg);
        }
      }).catch((ex) => {
        common_vendor.index.showToast({
          title: "评分失败",
          icon: "error"
        });
        console.error("评分失败", ex);
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    };
    const backClick = () => {
      common_vendor.index.navigateBack();
    };
    const wallChange = (event) => {
      wallIndexRef.value = event.detail.current;
      const indexs = getWillAroundIndex(wallIndexRef.value);
      const pindexs = indexs.filter((p) => !wallReadedRef.value.includes(p));
      pindexs.length > 0 && (wallReadedRef.value = wallReadedRef.value.concat(pindexs));
    };
    const scorePanleChange = (e) => {
      scoreRef.value = e.show ? showScoreComputed.value : 0;
    };
    const downloadClick = async () => {
      try {
        common_vendor.index.showLoading({
          title: "下载中",
          mask: true
        });
        const imageInfo = await common_vendor.index.getImageInfo({
          src: previeWallComputed.value.picurl
        });
        await common_vendor.index.saveImageToPhotosAlbum({
          filePath: imageInfo.path
        });
        common_vendor.index.showToast({
          icon: "success",
          title: "壁纸已保存到相册"
        }).finally(() => {
          common_vendor.index.hideLoading();
        });
      } catch (ex) {
        console.log(ex);
        const exx = ex;
        if (exx.errMsg) {
          if (exx.errMsg.includes("saveImageToPhotosAlbum:fail auth deny")) {
            const authInfo = await common_vendor.index.showModal({
              title: "提示",
              content: "需要授权保存到相册"
            });
            if (authInfo.confirm) {
              common_vendor.index.openSetting({
                success: (res) => {
                  if (res.authSetting["scope.writePhotosAlbum"]) {
                    common_vendor.index.showToast({
                      icon: "success",
                      title: "保存相册授权成功"
                    });
                  } else {
                    common_vendor.index.showToast({
                      icon: "none",
                      title: "保存相册授权失败"
                    });
                  }
                }
              });
            } else if (authInfo.cancel) {
              common_vendor.index.showToast({
                title: "授权已取消"
              });
            }
          } else if (exx.errMsg.includes("saveImageToPhotosAlbum:fail cancel")) {
            common_vendor.index.showToast({
              icon: "none",
              title: "已取消保存"
            });
          }
        }
      }
    };
    common_vendor.onLoad((query) => {
      queryRef.value = query;
      wallIndexRef.value = wallListComputed.value.findIndex((p) => p._id === queryRef.value.wallId);
      wallReadedRef.value = wallReadedRef.value.concat(getWillAroundIndex(wallIndexRef.value));
    });
    common_vendor.onShow(() => {
      startDatetime();
    });
    common_vendor.onHide(() => {
      stopDatetime();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(wallListComputed.value, (item, index, i0) => {
          return common_vendor.e({
            a: wallReadedRef.value.includes(index)
          }, wallReadedRef.value.includes(index) ? {
            b: item.picurl,
            c: common_vendor.o(imageClick, item._id)
          } : {}, {
            d: item._id
          });
        }),
        b: wallIndexRef.value,
        c: common_vendor.o(wallChange),
        d: common_vendor.p({
          type: "back",
          size: "20"
        }),
        e: common_vendor.o(backClick),
        f: backIconTopComputed.value + "px",
        g: dy_TitleLeftIconDistanceComputed.value + "px",
        h: common_vendor.t(wallIndexRef.value + 1),
        i: common_vendor.t(wallListComputed.value.length),
        j: common_vendor.p({
          date: dateNowRef.value,
          format: "hh : mm"
        }),
        k: common_vendor.p({
          date: dateNowRef.value,
          format: "MM月dd日"
        }),
        l: common_vendor.p({
          type: "info",
          size: "28"
        }),
        m: common_vendor.o(showInfoClick),
        n: common_vendor.p({
          type: previeWallComputed.value.userScore ? "star-filled" : "star",
          size: "28"
        }),
        o: common_vendor.t(showScoreComputed.value),
        p: common_vendor.o(showRateClick),
        q: common_vendor.p({
          type: "download",
          size: "28"
        }),
        r: common_vendor.o(downloadClick),
        s: shwoInfoRef.value,
        t: common_vendor.p({
          type: "closeempty",
          size: "18"
        }),
        v: common_vendor.o(closeInfoPopupClick),
        w: common_vendor.t(previeWallComputed.value._id),
        x: common_vendor.t(classNameComputed.value),
        y: common_vendor.t(previeWallComputed.value.nickname),
        z: common_vendor.p({
          value: showScoreComputed.value,
          readonly: true,
          ["allow-half"]: true,
          touchable: false
        }),
        A: common_vendor.t(showScoreComputed.value),
        B: common_vendor.t(previeWallComputed.value.description),
        C: common_vendor.f(previeWallComputed.value.tabs, (item, k0, i0) => {
          return {
            a: common_vendor.t(item)
          };
        }),
        D: common_vendor.sr(infoPanlRef, "2dad6c07-6", {
          "k": "infoPanlRef"
        }),
        E: common_vendor.p({
          type: "bottom"
        }),
        F: common_vendor.p({
          type: "closeempty",
          size: "18"
        }),
        G: common_vendor.o(closeRateClick),
        H: common_vendor.o(($event) => scoreRef.value = $event),
        I: common_vendor.p({
          ["allow-half"]: true,
          touchable: true,
          readonly: previeWallComputed.value.userScore,
          modelValue: scoreRef.value
        }),
        J: common_vendor.t(scoreRef.value),
        K: common_vendor.t(previeWallComputed.value.userScore ? "已评分" : "提交评分"),
        L: common_vendor.o(rateSubmitClick),
        M: scoreRef.value === 0 || previeWallComputed.value.userScore,
        N: common_vendor.sr(ratePanlRef, "2dad6c07-9", {
          "k": "ratePanlRef"
        }),
        O: common_vendor.o(scorePanleChange),
        P: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"], ["__file", "D:/code/uniApp/wallpaper-20240227/pages/preview/preview.vue"]]);
wx.createPage(MiniProgramPage);
