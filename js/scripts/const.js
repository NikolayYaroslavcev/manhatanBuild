"use strict";

var lazyLoadInstance = null;
var root = document.documentElement;
var MOBILE_POINT = 1024;
var MAIN_COLOR = '#e3000f';
var ACTIVE_CLASS = '_active';
var HIDDEN_CLASS = '_hidden';
var OVERFLOW_SELECTOR = '_overflow-hidden';
var OVERLAY_SELECTOR = '_menu-opened';
var OVERLAY_CONTAINER_SELECTOR = 'body';
var DATA_ACTION = 'data-action';
var BURGER_MENU_SWITCHER = 'burger-menu-switcher';
var WRAPPER_SELECTOR = '.form-item';
var getConstant = function getConstant(name) {
  var TEMPLATE_PATH = '.';
  var cons = new Map([['icons-path', "".concat(TEMPLATE_PATH, "/img/svg/")]]);
  return cons.get(name);
};