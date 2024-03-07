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
exports.getClassify = getClassify;
exports.getDailyPromotion = getDailyPromotion;
exports.getHomeBanner = getHomeBanner;
exports.getWall = getWall;
exports.getWallNews = getWallNews;
exports.setupSocre = setupSocre;
