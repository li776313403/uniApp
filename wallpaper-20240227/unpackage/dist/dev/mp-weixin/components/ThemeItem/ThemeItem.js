"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "ThemeItem",
  props: {
    isMore: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !__props.isMore
      }, !__props.isMore ? {
        b: common_assets._imports_0$1
      } : {}, {
        c: __props.isMore
      }, __props.isMore ? {
        d: common_assets._imports_1$1,
        e: common_vendor.p({
          type: "more-filled",
          size: "34",
          color: "#fff"
        })
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-55c02e95"], ["__file", "D:/code/demo/uniApp/wallpaper-20240227/components/ThemeItem/ThemeItem.vue"]]);
wx.createComponent(Component);
