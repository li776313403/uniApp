"use strict";const e=require("../../common/vendor.js"),t=require("../../api/wallpaper.js"),a=require("../../unit/basicData.js");if(require("../../unit/request.js"),!Array){(e.resolveComponent("uni-tag")+e.resolveComponent("uni-dateformat")+e.resolveComponent("mp-html"))()}Math||((()=>"../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js")+(()=>"../../uni_modules/mp-html/components/mp-html/mp-html.js"))();const i=e.defineComponent({__name:"detail",setup(i){const o=e.ref({view_count:0,publish_date:"",article_status:0,title:"",author:"",content:"",select:!1,_id:""}),n={id:""};return e.onLoad((a=>{n.id=a.id,t.getWallNewsDetail(n).then((t=>{0===t.errCode?(o.value=t.data,e.index.setNavigationBarTitle({title:o.value.title})):e.index.showToast({title:"获取公告详情失败",icon:"error"})})).catch((()=>{e.index.showToast({title:"获取公告详情失败",icon:"error"})}))})),e.onShareAppMessage((()=>({title:`${a.basicData.title}-公告-${o.value.title}`,path:"/pages/notice/detail?id="+o.value._id}))),e.onShareTimeline((()=>({title:`${a.basicData.title}-公告-${o.value.title}`,query:"id="+o.value._id}))),(t,a)=>e.e({a:o.value.select},o.value.select?{b:e.p({inverted:!0,text:"置顶",type:"error"})}:{},{c:e.t(o.value.title),d:e.t(o.value.author),e:e.p({date:o.value.publish_date,format:"yyyy-MM-dd hh:mm:ss"}),f:e.p({content:o.value.content}),g:e.t(o.value.view_count)})}});i.__runtimeHooks=6;const o=e._export_sfc(i,[["__scopeId","data-v-cd4b4230"]]);wx.createPage(o);
