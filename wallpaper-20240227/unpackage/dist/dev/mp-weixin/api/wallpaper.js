"use strict";
const unit_request = require("../unit/request.js");
const getHomeBanner = () => {
  return unit_request.Request.get({ url: "/api/bizhi/homeBanner" });
};
const getWallNews = (data) => {
  return unit_request.Request.get({ url: "/api/bizhi/wallNewsList", data });
};
const getDailyPromotion = () => {
  return unit_request.Request.get({ url: "/api/bizhi/randomWall" });
};
const getClassify = (data) => {
  return unit_request.Request.get({ url: "/api/bizhi/classify", data });
};
const getWall = (data) => {
  return unit_request.Request.get({ url: "/api/bizhi/wallList", data });
};
const setupSocre = (data) => {
  return unit_request.Request.get({ url: "/api/bizhi/setupScore", data });
};
const getDownloadWall = (data) => {
  return unit_request.Request.get({ url: "/api/bizhi/downloadWall", data });
};
const getUserInfo = () => {
  return unit_request.Request.get({ url: "/api/bizhi/userInfo" });
};
exports.getClassify = getClassify;
exports.getDailyPromotion = getDailyPromotion;
exports.getDownloadWall = getDownloadWall;
exports.getHomeBanner = getHomeBanner;
exports.getUserInfo = getUserInfo;
exports.getWall = getWall;
exports.getWallNews = getWallNews;
exports.setupSocre = setupSocre;
