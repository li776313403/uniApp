"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const stores_baseStore = require("./stores/baseStore.js");
const stores_layoutStore = require("./stores/layoutStore.js");
const stores_dataStore = require("./stores/dataStore.js");
const unit_basicData = require("./unit/basicData.js");
const api_wallpaper = require("./api/wallpaper.js");
require("./unit/request.js");
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
    const uls = stores_layoutStore.useLayoutStore();
    const dataStore = stores_dataStore.useDataStore();
    const getDeviceInfo = async () => {
      if (common_vendor.index.getSystemInfoAsync) {
        const systemInfo = await common_vendor.index.getSystemInfoAsync();
        ubs.setSystemInfo(systemInfo);
        uls.setStatusBarHeight(systemInfo.statusBarHeight);
      }
      if (common_vendor.index.getMenuButtonBoundingClientRect) {
        const menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
        const menuTop = menuButtonInfo.top;
        const menuHeight = menuButtonInfo.height;
        const menuButtonHeight = (menuTop - uls.statusBarHeight) * 2 + menuHeight;
        ubs.setMenuButtonInfo(menuButtonInfo);
        uls.setMenuButtonHeight(menuButtonHeight);
      } else {
        uls.setMenuButtonHeight(unit_basicData.basicData.layout.menuHeight);
      }
      uls.setHeadHeight(uls.menuButtonHeight + uls.statusBarHeight);
    };
    const getUserInfo = () => {
      api_wallpaper.getUserInfo().then((res) => {
        if (res.errCode === 0) {
          dataStore.setUserInfo(res.data);
        } else {
          common_vendor.index.showToast({
            title: "获取个人信息失败",
            icon: "error"
          });
        }
      }).catch(() => {
        common_vendor.index.showToast({
          title: "获取个人信息失败",
          icon: "error"
        });
      });
    };
    common_vendor.onLaunch(() => {
      getDeviceInfo();
      getUserInfo();
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
