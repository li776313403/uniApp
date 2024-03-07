"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_layoutStore = require("../../stores/layoutStore.js");
const stores_dataStore = require("../../stores/dataStore.js");
const api_wallpaper = require("../../api/wallpaper.js");
require("../../unit/request.js");
require("../../unit/basicData.js");
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
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "classList",
  setup(__props) {
    const layoutStore = stores_layoutStore.useLayoutStore();
    const dataStore = stores_dataStore.useDataStore();
    const wallDataComputed = common_vendor.computed({
      get: () => dataStore.wall,
      set: (val) => dataStore.setWallData(val)
    });
    const isDataRef = common_vendor.ref(true);
    const backIconTopComputed = common_vendor.computed(() => layoutStore.statusBarHeight || 15);
    const dy_TitleLeftIconDistanceComputed = common_vendor.computed(() => layoutStore.dy_TitleLeftIconDistance);
    const queryRef = common_vendor.ref({ classid: "", name: "" });
    const paramsRef = common_vendor.ref({
      classid: "",
      pageNum: 1,
      pageSize: 12
    });
    const getWall = () => {
      api_wallpaper.getWall(paramsRef.value).then((res) => {
        if (res.errCode === 0) {
          wallDataComputed.value = wallDataComputed.value.concat(res.data);
          isDataRef.value = paramsRef.value.pageSize === res.data.length;
        } else {
          common_vendor.index.showToast({
            title: "获取情数据失败",
            icon: "error"
          });
          console.error("获取数据失败", res.errMsg);
        }
      }).catch((ex) => {
        common_vendor.index.showToast({
          title: "获取数据失败",
          icon: "error"
        });
        console.error("获取数据失败", ex);
      });
    };
    const backClick = () => {
      common_vendor.index.navigateBack();
    };
    common_vendor.onLoad((query) => {
      queryRef.value = query;
      paramsRef.value.classid = queryRef.value.classid;
      common_vendor.index.setNavigationBarTitle({
        title: queryRef.value.name || "分类列表"
      });
      getWall();
    });
    common_vendor.onUnload(() => {
      dataStore.setWallData(null);
    });
    common_vendor.onReachBottom(() => {
      if (isDataRef.value) {
        paramsRef.value.pageNum++;
        getWall();
      }
    });
    common_vendor.onPullDownRefresh(() => {
      paramsRef.value.pageNum = 1;
      getWall();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: wallDataComputed.value.length === 0 && isDataRef.value
      }, wallDataComputed.value.length === 0 && isDataRef.value ? {
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
        h: common_vendor.f(wallDataComputed.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: item._id,
            c: `/pages/preview/preview?wallId=${item._id}`
          };
        }),
        i: wallDataComputed.value.length > 0 || !isDataRef.value
      }, wallDataComputed.value.length > 0 || !isDataRef.value ? {
        j: common_vendor.p({
          status: isDataRef.value ? "loading" : "noMore"
        })
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-104357ab"], ["__file", "D:/code/demo/uniApp/wallpaper-20240227/pages/classList/classList.vue"]]);
wx.createPage(MiniProgramPage);
