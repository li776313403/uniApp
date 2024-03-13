"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_layoutStore = require("../../stores/layoutStore.js");
const unit_basicData = require("../../unit/basicData.js");
const stores_dataStore = require("../../stores/dataStore.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "user",
  setup(__props) {
    const layoutStore = stores_layoutStore.useLayoutStore();
    const dataStore = stores_dataStore.useDataStore();
    const headHeightComputed = common_vendor.computed(() => layoutStore.headHeight || 40);
    const userInfoComputed = common_vendor.computed(() => dataStore.userInfo);
    const addressComputed = common_vendor.computed(() => {
      const address = userInfoComputed.value.address;
      return address.city || address.province || address.country;
    });
    common_vendor.onShareAppMessage(() => {
      return {
        title: unit_basicData.basicData.title,
        path: "/pages/user/user"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: unit_basicData.basicData.title
      };
    });
    return (_ctx, _cache) => {
      return {
        a: headHeightComputed.value + "px",
        b: common_vendor.t(userInfoComputed.value.IP),
        c: common_vendor.t(addressComputed.value),
        d: common_vendor.p({
          type: "download-filled",
          size: "20"
        }),
        e: common_vendor.t(userInfoComputed.value.downloadSize),
        f: common_vendor.p({
          type: "right",
          size: "15"
        }),
        g: common_vendor.p({
          type: "star-filled",
          size: "20"
        }),
        h: common_vendor.t(userInfoComputed.value.scoreSize),
        i: common_vendor.p({
          type: "right",
          size: "15"
        }),
        j: common_vendor.p({
          type: "chatboxes-filled",
          size: "20"
        }),
        k: common_vendor.p({
          type: "right",
          size: "15"
        }),
        l: common_vendor.p({
          type: "notification-filled",
          size: "20"
        }),
        m: common_vendor.p({
          type: "right",
          size: "15"
        }),
        n: common_vendor.p({
          type: "flag-filled",
          size: "20"
        }),
        o: common_vendor.p({
          type: "right",
          size: "15"
        })
      };
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-0f7520f0"], ["__file", "D:/code/demo/uniApp/wallpaper-20240227/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
