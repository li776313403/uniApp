"use strict";const s=require("../common/vendor.js").defineStore("dataStore",{state:()=>({classify:[],wall:[],userInfo:{IP:"0.0.0.0",downloadSize:0,scoreSize:0,address:{country:"",province:"",city:""}}}),actions:{setClassifyData(s){this.classify=s||[]},setWallData(s){this.wall=s||[]},setUserInfo(s){this.userInfo=s||{IP:"0.0.0.0",downloadSize:0,scoreSize:0,address:{country:"",province:"",city:""}}}}});exports.useDataStore=s;
