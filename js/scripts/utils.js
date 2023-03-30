"use strict";

var onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady(container, id) {
  if (id) {
    return new YT.Player(container, {
      height: '315',
      width: '560',
      videoId: id,
      playerVars: {
        autoplay: 1,
        playsinline: 1
      },
      playsinline: 1
    });
  }
};
HTMLElement.prototype.slideToggle = function (duration, callback) {
  if (this.clientHeight === 0) {
    _s(this, duration, callback, true);
  } else {
    _s(this, duration, callback);
  }
};
HTMLElement.prototype.slideUp = function (duration, callback) {
  _s(this, duration, callback);
};
HTMLElement.prototype.slideDown = function (duration, callback) {
  _s(this, duration, callback, true);
};
var _s = function _s(el, duration, callback, isDown) {
  if (typeof duration === 'undefined') duration = 400;
  if (typeof isDown === 'undefined') isDown = false;
  el.style.overflow = 'hidden';
  if (isDown) el.style.display = 'block';
  var elStyles = window.getComputedStyle(el);
  var elHeight = parseFloat(elStyles.getPropertyValue('height'));
  var elPaddingTop = parseFloat(elStyles.getPropertyValue('padding-top'));
  var elPaddingBottom = parseFloat(elStyles.getPropertyValue('padding-bottom'));
  var elMarginTop = parseFloat(elStyles.getPropertyValue('margin-top'));
  var elMarginBottom = parseFloat(elStyles.getPropertyValue('margin-bottom'));
  var stepHeight = elHeight / duration;
  var stepPaddingTop = elPaddingTop / duration;
  var stepPaddingBottom = elPaddingBottom / duration;
  var stepMarginTop = elMarginTop / duration;
  var stepMarginBottom = elMarginBottom / duration;
  var start;
  function step(timestamp) {
    if (start === undefined) start = timestamp;
    var elapsed = timestamp - start;
    if (isDown) {
      el.style.height = stepHeight * elapsed + 'px';
      el.style.paddingTop = stepPaddingTop * elapsed + 'px';
      el.style.paddingBottom = stepPaddingBottom * elapsed + 'px';
      el.style.marginTop = stepMarginTop * elapsed + 'px';
      el.style.marginBottom = stepMarginBottom * elapsed + 'px';
    } else {
      el.style.height = elHeight - stepHeight * elapsed + 'px';
      el.style.paddingTop = elPaddingTop - stepPaddingTop * elapsed + 'px';
      el.style.paddingBottom = elPaddingBottom - stepPaddingBottom * elapsed + 'px';
      el.style.marginTop = elMarginTop - stepMarginTop * elapsed + 'px';
      el.style.marginBottom = elMarginBottom - stepMarginBottom * elapsed + 'px';
    }
    if (elapsed >= duration) {
      el.style.height = '';
      el.style.paddingTop = '';
      el.style.paddingBottom = '';
      el.style.marginTop = '';
      el.style.marginBottom = '';
      el.style.overflow = '';
      if (!isDown) el.style.display = 'none';
      if (typeof callback === 'function') callback();
    } else {
      window.requestAnimationFrame(step);
    }
  }
  window.requestAnimationFrame(step);
};
var isMobileDevice = function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent) ? true : false;
};
var isMobilePoint = function isMobilePoint() {
  return window.matchMedia("(max-width: ".concat(MOBILE_POINT, "px)")).matches;
};
var resizeFunction = function resizeFunction(callbacks) {
  var resizeTimer = null;
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    if (callbacks.length) {
      callbacks.forEach(function (item) {
        item();
      });
    }
  }, 250);
};
var setCssVariable = function setCssVariable(name, value) {
  root.style.setProperty(name, value);
};
var OVERFLOW_NODES = [document.querySelector('html'), document.querySelector('body')];
var getSiblings = function getSiblings(elem) {
  var siblings = [],
    sibling = elem;
  while (sibling.previousSibling) {
    sibling = sibling.previousSibling;
    sibling.nodeType == 1 && siblings.push(sibling);
  }
  sibling = elem;
  while (sibling.nextSibling) {
    sibling = sibling.nextSibling;
    sibling.nodeType == 1 && siblings.push(sibling);
  }
  return siblings;
};
var scrollDisable = function scrollDisable() {
  OVERFLOW_NODES.map(function (item) {
    if (item) {
      item.classList.add(OVERFLOW_SELECTOR);
    }
  });
};
var scrollEnable = function scrollEnable() {
  OVERFLOW_NODES.map(function (item) {
    if (item) {
      item.classList.remove(OVERFLOW_SELECTOR);
    }
  });
  var dragToScrollNodes = document.querySelectorAll('.js-drag-to-scroll');
  if (dragToScrollNodes) {
    dragToScrollNodes.forEach(function (item) {
      if (item) {
        item.classList.remove(ACTIVE_CLASS);
      }
    });
  }
};
var scrollToggle = function scrollToggle() {
  OVERFLOW_NODES.map(function (item) {
    if (item) {
      item.classList.toggle(OVERFLOW_SELECTOR);
    }
  });
};
var menuBgOverlayEnable = function menuBgOverlayEnable() {
  document.querySelector(OVERLAY_CONTAINER_SELECTOR).classList.add(OVERLAY_SELECTOR);
};
var menuBgOverlayDisable = function menuBgOverlayDisable() {
  document.querySelector(OVERLAY_CONTAINER_SELECTOR).classList.remove(OVERLAY_SELECTOR);
};
var menuBgOverlayToggle = function menuBgOverlayToggle() {
  document.querySelector(OVERLAY_CONTAINER_SELECTOR).classList.toggle(OVERLAY_SELECTOR);
};
var getNodeCssValue = function getNodeCssValue(node, property) {
  return node ? window.getComputedStyle(node).getPropertyValue(property) : null;
};

/*
 * Only on this project
 */