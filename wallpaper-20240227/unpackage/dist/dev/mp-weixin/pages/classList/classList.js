"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_layoutStore = require("../../stores/layoutStore.js");
const stores_dataStore = require("../../stores/dataStore.js");
const api_wallpaper = require("../../api/wallpaper.js");
const unit_basicData = require("../../unit/basicData.js");
const unit_queryAndParamHelper = require("../../unit/queryAndParamHelper.js");
require("../../unit/request.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_load_more2 + _easycom_uni_icons2)();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_load_more + _easycom_uni_icons)();
}
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "classList",
  setup(__props) {
    const layoutStore = stores_layoutStore.useLayoutStore();
    const dataStore = stores_dataStore.useDataStore();
    const classifyComputed = common_vendor.computed(() => dataStore.classify);
    const wallListComputed = common_vendor.computed({
      get: () => dataStore.wall,
      set: (val) => dataStore.setWallData(val)
    });
    const isDataRef = common_vendor.ref(true);
    const backIconTopComputed = common_vendor.computed(() => layoutStore.statusBarHeight || 15);
    const dy_TitleLeftIconDistanceComputed = common_vendor.computed(() => layoutStore.dy_TitleLeftIconDistance);
    const queryRef = common_vendor.ref({ classId: "", wallId: "", type: null });
    const queryStringRef = common_vendor.computed(() => {
      return unit_queryAndParamHelper.queryAndParamHelper.tansParams(queryRef.value);
    });
    const paramsRef = common_vendor.ref({
      classid: "",
      pageNum: 1,
      pageSize: 12
    });
    const classNameComputed = common_vendor.computed(() => {
      let title = "";
      if (queryRef.value.type) {
        const list = classifyComputed.value.filter((p) => p._id === queryRef.value.classId);
        title = list.length > 0 ? list[0].name : "未知分类";
      } else {
        title = queryRef.value.type === "download" ? "我的下载" : "我的评分";
      }
      return title;
    });
    const getData = () => {
      common_vendor.index.showLoading({
        title: "壁纸数据加载中...",
        mask: true
      });
      const params = JSON.parse(JSON.stringify(paramsRef.value));
      if (queryRef.value.type) {
        delete params.classid;
        params.type = queryRef.value.type;
        return api_wallpaper.getUserWallList(params);
      } else {
        return api_wallpaper.getWall(params);
      }
    };
    const getWall = () => {
      getData().then((res) => {
        if (res.errCode === 0) {
          const ids = wallListComputed.value.map((p) => p._id);
          const newData = res.data.filter((p) => !ids.includes(p._id));
          wallListComputed.value = wallListComputed.value.concat(newData);
          isDataRef.value = paramsRef.value.pageSize === res.data.length;
          if (queryRef.value.wallId) {
            if (isDataRef.value) {
              if (wallListComputed.value.some((p) => p._id === queryRef.value.wallId)) {
                common_vendor.index.navigateTo({
                  url: "/pages/preview/preview?" + queryStringRef.value
                }).finally(() => {
                  common_vendor.index.hideLoading();
                });
              } else {
                appendData();
              }
            } else {
              common_vendor.index.showToast({
                icon: "fail",
                title: "未找到指定壁纸"
              }).finally(() => {
                common_vendor.index.hideLoading();
              });
            }
          }
        } else {
          common_vendor.index.showToast({
            title: "获取壁纸数据失败",
            icon: "error"
          });
        }
      }).catch(() => {
        common_vendor.index.showToast({
          title: "获取壁纸数据失败",
          icon: "error"
        });
      }).finally(() => {
        !queryRef.value.wallId && common_vendor.index.hideLoading();
      });
    };
    const appendData = () => {
      paramsRef.value.pageNum++;
      getWall();
    };
    const previewClick = (data) => {
      queryRef.value.wallId = data._id;
      common_vendor.index.navigateTo({
        url: "/pages/preview/preview?" + queryStringRef.value
      }).then(() => {
        queryRef.value.wallId = "";
      });
    };
    const backClick = () => {
      common_vendor.index.navigateBack().catch(() => {
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      });
    };
    common_vendor.onLoad((query) => {
      query.classId && (paramsRef.value.classid = query.classId);
      queryRef.value = query;
      common_vendor.index.setNavigationBarTitle({ title: classNameComputed.value });
      getWall();
    });
    common_vendor.onUnload(() => {
      dataStore.setWallData(null);
    });
    common_vendor.onReachBottom(() => {
      if (isDataRef.value) {
        appendData();
      }
    });
    common_vendor.onPullDownRefresh(() => {
      paramsRef.value.pageNum = 1;
      getWall();
    });
    common_vendor.onShareAppMessage(() => {
      return {
        title: unit_basicData.basicData.title + "-" + classNameComputed.value,
        path: "/pages/classList/classList?" + queryStringRef.value
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: unit_basicData.basicData.title + "-" + classNameComputed.value,
        query: queryStringRef.value
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: wallListComputed.value.length === 0 && isDataRef.value
      }, wallListComputed.value.length === 0 && isDataRef.value ? {
        b: common_vendor.p({
          status: "loading"
        }),
        c: backIconTopComputed.value + "px"
      } : {}, {
        d: common_vendor.p({
          type: "back",
          size: "20"
        }),
        e: common_vendor.o(backClick),
        f: backIconTopComputed.value + "px",
        g: dy_TitleLeftIconDistanceComputed.value + "px",
        h: common_vendor.f(wallListComputed.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: common_vendor.o(($event) => previewClick(item), item._id),
            c: item._id
          };
        }),
        i: wallListComputed.value.length > 0 || !isDataRef.value
      }, wallListComputed.value.length > 0 || !isDataRef.value ? {
        j: common_vendor.p({
          status: isDataRef.value ? "loading" : "noMore"
        })
      } : {});
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-104357ab"], ["__file", "D:/code/demo/uniApp/wallpaper-20240227/pages/classList/classList.vue"]]);
wx.createPage(MiniProgramPage);
