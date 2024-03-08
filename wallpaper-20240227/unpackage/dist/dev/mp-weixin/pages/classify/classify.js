"use strict";
const common_vendor = require("../../common/vendor.js");
const unit_basicData = require("../../unit/basicData.js");
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
    common_vendor.onShareAppMessage(() => {
      return {
        title: unit_basicData.basicData.title,
        path: "/pages/index/index"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: unit_basicData.basicData.title
      };
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(15, (ite, k0, i0) => {
          return {
            a: "6bcfa975-1-" + i0
          };
        })
      };
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-6bcfa975"], ["__file", "D:/code/demo/uniApp/wallpaper-20240227/pages/classify/classify.vue"]]);
wx.createPage(MiniProgramPage);
