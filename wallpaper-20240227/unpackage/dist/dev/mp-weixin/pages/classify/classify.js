"use strict";
const common_vendor = require("../../common/vendor.js");
const unit_basicData = require("../../unit/basicData.js");
const stores_dataStore = require("../../stores/dataStore.js");
if (!Array) {
  const _easycom_CustomNavBar2 = common_vendor.resolveComponent("CustomNavBar");
  const _easycom_ThemeItem2 = common_vendor.resolveComponent("ThemeItem");
  (_easycom_CustomNavBar2 + _easycom_ThemeItem2)();
}
const _easycom_CustomNavBar = () => "../../components/CustomNavBar/CustomNavBar.js";
const _easycom_ThemeItem = () => "../../components/ThemeItem/ThemeItem.js";
if (!Math) {
  (_easycom_CustomNavBar + _easycom_ThemeItem)();
}
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "classify",
  setup(__props) {
    const dataStore = stores_dataStore.useDataStore();
    const classifyComputed = common_vendor.computed(() => dataStore.classify);
    common_vendor.onShareAppMessage(() => {
      return {
        title: unit_basicData.basicData.title,
        path: "/pages/classify/classify"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: unit_basicData.basicData.title
      };
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(classifyComputed.value, (item, k0, i0) => {
          return {
            a: item._id,
            b: "6bcfa975-1-" + i0,
            c: common_vendor.p({
              classIfy: item
            })
          };
        })
      };
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-6bcfa975"], ["__file", "D:/code/demo/uniApp/wallpaper-20240227/pages/classify/classify.vue"]]);
wx.createPage(MiniProgramPage);
