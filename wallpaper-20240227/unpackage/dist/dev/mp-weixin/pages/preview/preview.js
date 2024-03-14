"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_layoutStore = require("../../stores/layoutStore.js");
const stores_dataStore = require("../../stores/dataStore.js");
const api_wallpaper = require("../../api/wallpaper.js");
const unit_basicData = require("../../unit/basicData.js");
const unit_queryAndParamHelper = require("../../unit/queryAndParamHelper.js");
const unit_otherHelper = require("../../unit/otherHelper.js");
require("../../unit/request.js");
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
const _sfc_defineComponent = common_vendor.defineComponent({
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
    const classifyComputed = common_vendor.computed({
      get: () => dataStore.classify,
      set: (val) => dataStore.setClassifyData(val)
    });
    const wallListComputed = common_vendor.computed({
      get: () => dataStore.wall.map((p) => {
        p.picurl = p.smallPicurl.replace("_small.webp", ".jpg");
        return p;
      }),
      set: (val) => dataStore.setWallData(val)
    });
    const queryRef = common_vendor.ref({ wallId: "", classId: "" });
    const queryStringRef = common_vendor.computed(() => unit_queryAndParamHelper.queryAndParamHelper.tansParams(queryRef.value));
    const wallIndexRef = common_vendor.ref(-1);
    const wallReadedRef = common_vendor.ref([]);
    const previeWallComputed = common_vendor.computed(() => wallListComputed.value[wallIndexRef.value]);
    const scoreRef = common_vendor.ref(0);
    const showScoreComputed = common_vendor.computed(() => {
      return previeWallComputed.value.userScore ? previeWallComputed.value.userScore : previeWallComputed.value.score;
    });
    const classNameComputed = common_vendor.computed(() => {
      const list = classifyComputed.value.filter((p) => p._id === queryRef.value.classId);
      return list.length > 0 ? list[0].name : "未知分类";
    });
    const wallParamsRef = common_vendor.ref({
      classid: "",
      pageNum: 1,
      pageSize: 12
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
    const isDowloadWall = () => {
      return api_wallpaper.getDownloadWall({ classid: previeWallComputed.value.classid, wallId: previeWallComputed.value._id });
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
      common_vendor.index.navigateBack().catch(() => {
        queryRef.value.wallId = "";
        common_vendor.index.redirectTo({
          url: "/pages/classList/classList?" + queryStringRef.value
        });
      });
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
          title: "下载中...",
          mask: true
        });
        const isDowloadRes = await isDowloadWall();
        if (isDowloadRes.errCode === 0) {
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
        } else {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            icon: "none",
            title: isDowloadRes.errMsg
          });
        }
      } catch (ex) {
        common_vendor.index.hideLoading();
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
    const getClassify = () => {
      common_vendor.index.showLoading({
        title: "分类数据加载中..."
      });
      const params = {
        select: false,
        pageNum: 1,
        pageSize: 100
      };
      api_wallpaper.getClassify(params).then((res) => {
        if (res.errCode === 0) {
          classifyComputed.value = res.data.sort((p) => p.sort);
          if (classifyComputed.value.filter((p) => p._id === queryRef.value.classId)) {
            getWall();
          } else {
            common_vendor.index.showToast({
              title: "获取壁纸分类数据失败,即将跳转到首页",
              icon: "none"
            }).then(() => {
              unit_otherHelper.otherHelper.goIndex();
            });
          }
        } else {
          common_vendor.index.showToast({
            title: "获取壁纸分类数据失败,即将跳转到首页",
            icon: "none"
          }).then(() => {
            unit_otherHelper.otherHelper.goIndex();
          });
        }
      }).catch(() => {
        common_vendor.index.showToast({
          title: "获取壁纸分类数据失败,即将跳转到首页",
          icon: "none"
        }).then(() => {
          unit_otherHelper.otherHelper.goIndex();
        });
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    };
    const getWall = () => {
      common_vendor.index.showLoading({
        title: "壁纸数据加载中..."
      });
      wallParamsRef.value.classid = queryRef.value.classId;
      api_wallpaper.getWall(wallParamsRef.value).then((res) => {
        if (res.errCode === 0) {
          const ids = wallListComputed.value.map((p) => p._id);
          const newData = res.data.filter((p) => !ids.includes(p._id));
          wallListComputed.value = wallListComputed.value.concat(newData);
          const isData = wallParamsRef.value.pageSize === res.data.length;
          if (queryRef.value.wallId) {
            if (isData) {
              if (wallListComputed.value.some((p) => p._id === queryRef.value.wallId)) {
                wallIndexRef.value = wallListComputed.value.findIndex((p) => p._id === queryRef.value.wallId);
                wallReadedRef.value = wallReadedRef.value.concat(getWillAroundIndex(wallIndexRef.value));
              } else {
                wallParamsRef.value.pageNum++;
                getWall();
              }
            } else {
              common_vendor.index.showToast({
                icon: "none",
                title: "未找到当前壁纸,即将跳转到首页"
              }).then(() => {
                unit_otherHelper.otherHelper.goIndex();
              });
            }
          }
        } else {
          common_vendor.index.showToast({
            title: "未找到当前壁纸,即将跳转到首页",
            icon: "none"
          }).then(() => {
            unit_otherHelper.otherHelper.goIndex();
          });
        }
      }).catch(() => {
        common_vendor.index.showToast({
          title: "未找到当前壁纸,即将跳转到首页",
          icon: "none"
        }).then(() => {
          unit_otherHelper.otherHelper.goIndex();
        });
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    };
    common_vendor.onLoad((query) => {
      queryRef.value = query;
      if (wallListComputed.value.length > 0) {
        wallIndexRef.value = wallListComputed.value.findIndex((p) => p._id === queryRef.value.wallId);
        wallReadedRef.value = wallReadedRef.value.concat(getWillAroundIndex(wallIndexRef.value));
      } else {
        getClassify();
      }
    });
    common_vendor.onShow(() => {
      startDatetime();
    });
    common_vendor.onHide(() => {
      stopDatetime();
    });
    common_vendor.onShareAppMessage(() => {
      return {
        title: `${unit_basicData.basicData.title}-${classNameComputed.value}-${previeWallComputed.value._id}`,
        path: "/pages/preview/preview?" + queryStringRef.value
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: `${unit_basicData.basicData.title}-${classNameComputed.value}-${previeWallComputed.value._id}`,
        query: queryStringRef.value
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: wallIndexRef.value !== -1
      }, wallIndexRef.value !== -1 ? {
        b: common_vendor.f(wallListComputed.value, (item, index, i0) => {
          return common_vendor.e({
            a: wallReadedRef.value.includes(index)
          }, wallReadedRef.value.includes(index) ? {
            b: item.picurl,
            c: common_vendor.o(imageClick, item._id)
          } : {}, {
            d: item._id
          });
        }),
        c: wallIndexRef.value,
        d: common_vendor.o(wallChange),
        e: common_vendor.p({
          type: "back",
          size: "20"
        }),
        f: common_vendor.o(backClick),
        g: backIconTopComputed.value + "px",
        h: dy_TitleLeftIconDistanceComputed.value + "px",
        i: common_vendor.t(wallIndexRef.value + 1),
        j: common_vendor.t(wallListComputed.value.length),
        k: common_vendor.p({
          date: dateNowRef.value,
          format: "hh : mm"
        }),
        l: common_vendor.p({
          date: dateNowRef.value,
          format: "MM月dd日"
        }),
        m: common_vendor.p({
          type: "info",
          size: "28"
        }),
        n: common_vendor.o(showInfoClick),
        o: common_vendor.p({
          type: previeWallComputed.value.userScore ? "star-filled" : "star",
          size: "28"
        }),
        p: common_vendor.t(showScoreComputed.value),
        q: common_vendor.o(showRateClick),
        r: common_vendor.p({
          type: "download",
          size: "28"
        }),
        s: common_vendor.o(downloadClick),
        t: shwoInfoRef.value,
        v: common_vendor.p({
          type: "closeempty",
          size: "18"
        }),
        w: common_vendor.o(closeInfoPopupClick),
        x: common_vendor.t(previeWallComputed.value._id),
        y: common_vendor.t(classNameComputed.value),
        z: common_vendor.t(previeWallComputed.value.nickname),
        A: common_vendor.p({
          value: showScoreComputed.value,
          readonly: true,
          ["allow-half"]: true,
          touchable: false
        }),
        B: common_vendor.t(showScoreComputed.value),
        C: common_vendor.t(previeWallComputed.value.description),
        D: common_vendor.f(previeWallComputed.value.tabs, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: item
          };
        }),
        E: common_vendor.sr(infoPanlRef, "2dad6c07-6", {
          "k": "infoPanlRef"
        }),
        F: common_vendor.p({
          type: "bottom"
        }),
        G: common_vendor.p({
          type: "closeempty",
          size: "18"
        }),
        H: common_vendor.o(closeRateClick),
        I: common_vendor.o(($event) => scoreRef.value = $event),
        J: common_vendor.p({
          ["allow-half"]: true,
          touchable: true,
          readonly: previeWallComputed.value.userScore,
          modelValue: scoreRef.value
        }),
        K: common_vendor.t(scoreRef.value),
        L: common_vendor.t(previeWallComputed.value.userScore ? "已评分" : "提交评分"),
        M: common_vendor.o(rateSubmitClick),
        N: scoreRef.value === 0 || previeWallComputed.value.userScore,
        O: common_vendor.sr(ratePanlRef, "2dad6c07-9", {
          "k": "ratePanlRef"
        }),
        P: common_vendor.o(scorePanleChange),
        Q: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false
        })
      } : {});
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-2dad6c07"], ["__file", "D:/code/demo/uniApp/wallpaper-20240227/pages/preview/preview.vue"]]);
wx.createPage(MiniProgramPage);
