import{d as a,G as e,u as l,e as s,b as t,f as u,N as i,O as n,P as o,Q as r,g as c,h as d,o as v,c as p,w as m,H as f,a as g,I as y,k as _,l as w,F as I,B as h,R as k,s as x,T as L,U as N,t as j,v as C,i as P,V as S,W as b,X as z,C as B}from"./index-c57cf8fe.js";import{_ as D}from"./uni-load-more.ff6a6249.js";import{_ as H}from"./uni-icons.55861ff3.js";import{q as O}from"./queryAndParamHelper.33b5c660.js";import{_ as T}from"./_plugin-vue_export-helper.1b428a4d.js";const W=T(a({__name:"classList",setup(a){const T=e(),W=l(),q=s((()=>W.classify)),F=s({get:()=>W.wall,set:a=>W.setWallData(a)}),J=t(!0),A=s((()=>T.statusBarHeight||15)),G=s((()=>T.dy_TitleLeftIconDistance)),M=t({classId:"",wallId:"",type:null}),Q=s((()=>O.tansParams(M.value))),R=t({classid:"",pageNum:1,pageSize:12}),U=s((()=>{let a="";if(M.value.type){const e=q.value.filter((a=>a._id===M.value.classId));a=e.length>0?e[0].name:"未知分类"}else a="download"===M.value.type?"我的下载":"我的评分";return a})),V=()=>{(()=>{S({title:"壁纸数据加载中...",mask:!0});const a=JSON.parse(JSON.stringify(R.value));return M.value.type?(delete a.classid,a.type=M.value.type,b(a)):z(a)})().then((a=>{if(0===a.errCode){const e=F.value.map((a=>a._id)),l=a.data.filter((a=>!e.includes(a._id)));F.value=F.value.concat(l),J.value=R.value.pageSize===a.data.length,M.value.wallId&&(J.value?F.value.some((a=>a._id===M.value.wallId))?h({url:"/pages/preview/preview?"+Q.value}).finally((()=>{k()})):X():x({icon:"fail",title:"未找到指定壁纸"}).finally((()=>{k()})))}else x({title:"获取壁纸数据失败",icon:"error"})})).catch((()=>{x({title:"获取壁纸数据失败",icon:"error"})})).finally((()=>{!M.value.wallId&&k()}))},X=()=>{R.value.pageNum++,V()},E=()=>{L().catch((()=>{N({url:"/pages/index/index"})}))};return u((a=>{a.classId&&(R.value.classid=a.classId),M.value=a,i({title:U.value}),V()})),n((()=>{W.setWallData(null)})),o((()=>{J.value&&X()})),r((()=>{R.value.pageNum=1,V()})),c((()=>({title:d.title+"-"+U.value,path:"/pages/classList/classList?"+Q.value}))),(a,e)=>{const l=j(C("uni-load-more"),D),s=P,t=j(C("uni-icons"),H),u=B;return v(),p(s,{class:"classListLayout"},{default:m((()=>[0===F.value.length&&J.value?(v(),p(s,{key:0,class:"loadingLayout",style:f({marginTop:A.value+"px"})},{default:m((()=>[g(l,{status:"loading"})])),_:1},8,["style"])):y("",!0),g(s,{onClick:E,class:"goBack",style:f({top:A.value+"px",lfet:G.value+"px"})},{default:m((()=>[g(t,{type:"back",size:"20"})])),_:1},8,["style"]),g(s,{class:"content"},{default:m((()=>[(v(!0),_(I,null,w(F.value,(a=>(v(),p(s,{onClick:e=>{return l=a,M.value.wallId=l._id,void h({url:"/pages/preview/preview?"+Q.value}).then((()=>{M.value.wallId=""}));var l},key:a._id,class:"item"},{default:m((()=>[g(u,{src:a.smallPicurl,mode:"aspectFill"},null,8,["src"])])),_:2},1032,["onClick"])))),128))])),_:1}),F.value.length>0||!J.value?(v(),p(s,{key:1,class:"loadingLayout"},{default:m((()=>[g(l,{status:J.value?"loading":"noMore"},null,8,["status"])])),_:1})):y("",!0),g(s,{class:"safe-area-inset-bottom"})])),_:1})}}}),[["__scopeId","data-v-95a317ad"]]);export{W as default};