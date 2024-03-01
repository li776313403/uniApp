"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const stores_baseStore = require("./stores/baseStore.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/classify/classify.js";
  "./pages/user/user.js";
  "./pages/classList/classList.js";
  "./pages/preview/preview.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    const ubs = stores_baseStore.useBaseStore();
    common_vendor.onLaunch(() => {
      common_vendor.index.getSystemInfoAsync().then((res) => {
        ubs.set({ key: "systemInfo", value: res });
      });
      ubs.set({ key: "menuButton", value: common_vendor.index.getMenuButtonBoundingClientRect() });
      console.log(common_vendor.index.getMenuButtonBoundingClientRect());
    });
    common_vendor.onShow(() => {
      console.log("App Show");
    });
    common_vendor.onHide(() => {
      console.log("App Hide");
    });
    return () => {
    };
  }
});
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/demo/uniApp/wallpaper-20240227/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(common_vendor.createPinia());
  return {
    app,
    Pinia: common_vendor.Pinia
    // 此处必须将 Pinia 返回
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
