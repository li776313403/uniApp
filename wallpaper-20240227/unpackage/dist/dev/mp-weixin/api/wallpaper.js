"use strict";
const unit_request = require("../unit/request.js");
const getHomeBanner = () => {
  return unit_request.Request.get({ url: "/api/bizhi/homeBanner" });
};
exports.getHomeBanner = getHomeBanner;
