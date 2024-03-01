"use strict";
const common_vendor = require("../../common/vendor.js");
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
  setup(__props) {
    const systemInfoRef = common_vendor.ref({});
    const statusBarHeightComputed = common_vendor.computed(() => systemInfoRef.value.statusBarHeight);
    const titleBarInfoRef = common_vendor.ref({});
    const titleBarTopComputed = common_vendor.computed(() => titleBarInfoRef.value.top);
    const titleBarHeightComputed = common_vendor.computed(() => titleBarInfoRef.value.height);
    const titleHeightComputed = common_vendor.computed(() => (titleBarTopComputed.value - statusBarHeightComputed.value) * 2 + titleBarHeightComputed.value);
    const headHeightConputed = common_vendor.computed(() => statusBarHeightComputed.value + titleHeightComputed.value);
    common_vendor.onLoad(() => {
      common_vendor.index.getSystemInfoAsync().then((res) => {
        systemInfoRef.value = res;
      });
      titleBarInfoRef.value = common_vendor.index.getMenuButtonBoundingClientRect();
    });
    return (_ctx, _cache) => {
      return {
        a: statusBarHeightComputed.value + "px",
        b: common_vendor.p({
          type: "search",
          size: "18"
        }),
        c: titleHeightComputed.value + "px",
        d: headHeightConputed.value + "px"
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eb837262"], ["__file", "D:/code/demo/uniApp/wallpaper-20240227/components/CustomNavBar/CustomNavBar.vue"]]);
wx.createComponent(Component);
