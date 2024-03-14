"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("./common/vendor.js"),t=require("./stores/baseStore.js"),n=require("./stores/layoutStore.js"),o=require("./stores/dataStore.js"),s=require("./unit/basicData.js"),r=require("./api/wallpaper.js");require("./unit/request.js"),Math;const i=e.defineComponent({__name:"App",setup(i){const a=t.useBaseStore(),u=n.useLayoutStore(),c=o.useDataStore();return e.onLaunch((()=>{(async()=>{if(e.index.getSystemInfoAsync){const t=await e.index.getSystemInfoAsync();a.setSystemInfo(t),u.setStatusBarHeight(t.statusBarHeight)}if(e.index.getMenuButtonBoundingClientRect){const t=e.index.getMenuButtonBoundingClientRect(),n=t.top,o=t.height,s=2*(n-u.statusBarHeight)+o;a.setMenuButtonInfo(t),u.setMenuButtonHeight(s)}else u.setMenuButtonHeight(s.basicData.layout.menuHeight);u.setHeadHeight(u.menuButtonHeight+u.statusBarHeight)})()})),e.onReady((()=>{r.getUserInfo().then((t=>{0===t.errCode?c.setUserInfo(t.data):e.index.showToast({title:"获取个人信息失败",icon:"error"})})).catch((()=>{e.index.showToast({title:"获取个人信息失败",icon:"error"})}))})),e.onShow((()=>{console.log("App Show")})),e.onHide((()=>{console.log("App Hide")})),()=>{}}});function a(){const t=e.createSSRApp(i);return t.use(e.createPinia()),{app:t,Pinia:e.Pinia}}a().app.mount("#app"),exports.createApp=a;