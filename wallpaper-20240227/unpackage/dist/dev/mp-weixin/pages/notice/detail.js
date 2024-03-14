"use strict";
const common_vendor = require("../../common/vendor.js");
const api_wallpaper = require("../../api/wallpaper.js");
const unit_basicData = require("../../unit/basicData.js");
require("../../unit/request.js");
if (!Array) {
  const _component_uni_tag = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_mp_html2 = common_vendor.resolveComponent("mp-html");
  (_component_uni_tag + _easycom_uni_dateformat2 + _easycom_mp_html2)();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_mp_html = () => "../../uni_modules/mp-html/components/mp-html/mp-html.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_mp_html)();
}
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const detailRef = common_vendor.ref({
      view_count: 0,
      publish_date: "",
      article_status: 0,
      title: "",
      author: "",
      content: "",
      select: false,
      _id: ""
    });
    const params = { id: "" };
    const getNoticeDetail = () => {
      api_wallpaper.getWallNewsDetail(params).then((res) => {
        if (res.errCode === 0) {
          detailRef.value = res.data;
          common_vendor.index.setNavigationBarTitle({
            title: detailRef.value.title
          });
        } else {
          common_vendor.index.showToast({
            title: "获取公告详情失败",
            icon: "error"
          });
        }
      }).catch(() => {
        common_vendor.index.showToast({
          title: "获取公告详情失败",
          icon: "error"
        });
      });
    };
    common_vendor.onLoad((e) => {
      params.id = e.id;
      getNoticeDetail();
    });
    common_vendor.onShareAppMessage(() => {
      return {
        title: `${unit_basicData.basicData.title}-公告-${detailRef.value.title}`,
        path: "/pages/notice/detail?id=" + detailRef.value._id
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: `${unit_basicData.basicData.title}-公告-${detailRef.value.title}`,
        query: "id=" + detailRef.value._id
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: detailRef.value.select
      }, detailRef.value.select ? {
        b: common_vendor.p({
          inverted: true,
          text: "置顶",
          type: "error"
        })
      } : {}, {
        c: common_vendor.t(detailRef.value.title),
        d: common_vendor.t(detailRef.value.author),
        e: common_vendor.p({
          date: detailRef.value.publish_date,
          format: "yyyy-MM-dd hh:mm:ss"
        }),
        f: common_vendor.p({
          content: detailRef.value.content
        }),
        g: common_vendor.t(detailRef.value.view_count)
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-0f737f11"], ["__file", "D:/code/demo/uniApp/wallpaper-20240227/pages/notice/detail.vue"]]);
wx.createPage(MiniProgramPage);
