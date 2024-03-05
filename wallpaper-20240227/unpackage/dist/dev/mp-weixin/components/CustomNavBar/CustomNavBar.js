"use strict";
const common_vendor = require("../../common/vendor.js");
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
  __name: "CustomNavBar",
  props: {},
  setup(__props) {
    const uls = stores_layoutStore.useLayoutStore();
    const statusBarHeightComputed = common_vendor.computed(() => uls.statusBarHeight);
    const menuButtonHeightComputed = common_vendor.computed(() => uls.menuButtonHeight);
    const headHeightConputed = common_vendor.computed(() => uls.headHeight);
    const dy_TitleLeftIconDistanceConputed = common_vendor.computed(() => uls.dy_TitleLeftIconDistance);
    return (_ctx, _cache) => {
      return {
        a: statusBarHeightComputed.value + "px",
        b: common_vendor.p({
          type: "search",
          size: "18"
        }),
        c: menuButtonHeightComputed.value + "px",
        d: dy_TitleLeftIconDistanceConputed.value + "px",
        e: headHeightConputed.value + "px"
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eb837262"], ["__file", "D:/code/demo/uniApp/wallpaper-20240227/components/CustomNavBar/CustomNavBar.vue"]]);
wx.createComponent(Component);
