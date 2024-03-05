"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const stores_layoutStore = require("../../stores/layoutStore.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "classList",
  setup(__props) {
    const layoutStore = stores_layoutStore.useLayoutStore();
    const backIconTopComputed = common_vendor.computed(() => layoutStore.statusBarHeight || 15);
    const dy_TitleLeftIconDistanceComputed = common_vendor.computed(() => layoutStore.dy_TitleLeftIconDistance);
    const backClick = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "back",
          size: "20"
        }),
        b: common_vendor.o(backClick),
        c: backIconTopComputed.value + "px",
        d: dy_TitleLeftIconDistanceComputed.value + "px",
        e: common_vendor.f(10, (item, k0, i0) => {
          return {};
        }),
        f: common_assets._imports_0$2
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-104357ab"], ["__file", "D:/code/demo/uniApp/wallpaper-20240227/pages/classList/classList.vue"]]);
wx.createPage(MiniProgramPage);
