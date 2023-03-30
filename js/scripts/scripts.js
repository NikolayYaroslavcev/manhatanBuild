"use strict";

var setGlobalCssVar = function setGlobalCssVar() {
  setCssVariable('--viewport-width', "".concat(window.innerWidth, "px"));
  setCssVariable('--viewport-height', "".concat(window.innerHeight, "px"));
  setCssVariable('--header-height', getNodeCssValue(document.querySelector('.header'), 'height'));
};

// burger

var menuBtn = document.querySelector('.header-burger');
var menu = document.querySelector('.menu__body');
// const menuTwo = document.querySelector('.header-button')

var body = document.body;
if (menu && menuBtn) {
  menuBtn.addEventListener('click', function (e) {
    menu.classList.toggle('_active');
    menuBtn.classList.toggle('_active');
    // menuTwo.classList.toggle('_active')
    body.classList.toggle('lock');
  });
  menu.addEventListener('click', function (e) {
    if (e.target.classList.contains('menu__body')) {
      menu.classList.remove('_active');
      menuBtn.classList.remove('_active');
      body.classList.remove('lock');
    }
  });
  menu.querySelectorAll('.menu__link').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('_active');
      menuBtn.classList.remove('_active');
      body.classList.remove('lock');
    });
  });
}

///////// tabs

var headerItem = document.querySelectorAll('.tabs-item');
var mainContent = document.querySelectorAll('.tabs-block');
headerItem.forEach(function (item) {
  item.addEventListener("click", function () {
    mainContent.forEach(function (element) {
      element.classList.add('hidden');
      element.classList.remove("active");
    });
    var content = document.querySelector("#" + item.dataset.tab);
    content.classList.remove("hidden");
    content.classList.add("active");
  });
});

////s////s/s/s//s/s/s
// Исходные данные по слайдеру (const)
var sliderImages = document.querySelectorAll('.slider__wrap'),
  sliderLine = document.querySelector('.slider__line'),
  sliderDots = document.querySelectorAll('.slider__dot'),
  sliderBtnNext = document.querySelector('.slider__btn-next'),
  sliderBtnPrev = document.querySelector('.slider__btn-prev');

// Переменные
var sliderCount = 0,
  sliderWidth;

// Адаптивность слайдера
window.addEventListener('resize', showSlide);

// Кнопки листания слайдов вперед и назад
sliderBtnNext.addEventListener('click', nextSlide);
sliderBtnPrev.addEventListener('click', prevSlide);
function showSlide() {
  sliderWidth = document.querySelector('.slider').offsetWidth;
  sliderLine.style.width = sliderWidth * sliderImages.length + 'px';
  sliderImages.forEach(function (item) {
    return item.style.width = sliderWidth + 'px';
  });
  rollSlider();
}
showSlide();

// Перелистывает слайд вперед
function nextSlide() {
  sliderCount++;
  if (sliderCount >= sliderImages.length) sliderCount = 0;
  rollSlider();
  thisSlide(sliderCount);
}

// Перелистывает слайд назад
function prevSlide() {
  sliderCount--;
  if (sliderCount < 0) sliderCount = sliderImages.length - 1;
  rollSlider();
  thisSlide(sliderCount);
}

// Задает шаг перемещения слайдов
function rollSlider() {
  sliderLine.style.transform = "translateX(".concat(-sliderCount * sliderWidth, "px)");
}

// Указывает как слайд по счету активен
function thisSlide(index) {
  sliderDots.forEach(function (item) {
    return item.classList.remove('active-dot');
  });
  sliderDots[index].classList.add('active-dot');
}

// Вешает клик на dot
sliderDots.forEach(function (dot, index) {
  dot.addEventListener('click', function () {
    sliderCount = index;
    rollSlider();
    thisSlide(sliderCount);
  });
});
// /swiper

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

// const logBlock = document.querySelector(".slider__wrap")

var x1 = null;
// let y1 = null;

function handleTouchStart(event) {
  var firstTouch = event.touches[0];
  x1 = firstTouch.clientX;
  // y1 = firstTouch.clientY;
}

function handleTouchMove(event) {
  if (!x1) {
    return false;
  }
  var x2 = event.touches[0].clientX;
  // let y2 = event.touches[0].clientY
  var xDiff = x2 - x1;
  // let yDiff = y2 - y1;
  if (Math.abs(xDiff)) {
    if (xDiff > 0) {
      nextSlide();
    } else prevSlide();
  }
  x1 = null;
  // y1 = null;
}

// spollers
var _slideToggle = function _slideToggle(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};
var _slideDown = function _slideDown(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var showmore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    var height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? "".concat(showmore, "px") : "0px";
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(function () {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
};
var _slideUp = function _slideUp(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var showmore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = "".concat(target.offsetHeight, "px");
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? "".concat(showmore, "px") : "0px";
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(function () {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
};
var spollers = function spollers() {
  var spollersArray = document.querySelectorAll("[data-spollers]");
  if (spollersArray.length > 0) {
    // Получение слойлеров с медиа запросами
    // let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
    // if (mdQueriesArray && mdQueriesArray.length) {
    //     mdQueriesArray.forEach(mdQueriesItem => {
    //         // Событие
    //         mdQueriesItem.matchMedia.addEventListener("change", function () {
    //             initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
    //         });
    //         initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
    //     });
    // }
    // Инициализация
    var initSpollers = function initSpollers(spollersArray) {
      var matchMedia = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      spollersArray.forEach(function (spollersBlock) {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add("_spoller-init");
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener("click", setSpollerAction);
        } else {
          spollersBlock.classList.remove("_spoller-init");
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener("click", setSpollerAction);
        }
      });
    }; // Работа с контентом
    var initSpollerBody = function initSpollerBody(spollersBlock) {
      var hideSpollerBody = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
      if (spollerTitles.length) {
        spollerTitles = Array.from(spollerTitles).filter(function (item) {
          return item.closest("[data-spollers]") === spollersBlock;
        });
        spollerTitles.forEach(function (spollerTitle) {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute("tabindex");
            if (!spollerTitle.classList.contains("_spoller-active")) {
              spollerTitle.nextElementSibling.hidden = true;
            }
          } else {
            spollerTitle.setAttribute("tabindex", "-1");
            spollerTitle.nextElementSibling.hidden = false;
          }
        });
      }
    };
    var setSpollerAction = function setSpollerAction(e) {
      var el = e.target;
      if (el.closest("[data-spoller]")) {
        var spollerTitle = el.closest("[data-spoller]");
        var spollersBlock = spollerTitle.closest("[data-spollers]");
        var oneSpoller = spollersBlock.hasAttribute("data-one-spoller") ? true : false;
        if (!spollersBlock.querySelectorAll("._slide").length) {
          if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) {
            hideSpollersBody(spollersBlock);
          }
          spollerTitle.classList.toggle("_spoller-active");
          _slideToggle(spollerTitle.nextElementSibling, 500);
        }
        e.preventDefault();
      }
    };
    var hideSpollersBody = function hideSpollersBody(spollersBlock) {
      var spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
      if (spollerActiveTitle) {
        spollerActiveTitle.classList.remove("_spoller-active");
        _slideUp(spollerActiveTitle.nextElementSibling, 500);
      }
    };
    // Получение обычных слойлеров
    var spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
    });
    // Инициализация обычных слойлеров
    if (spollersRegular.length) {
      initSpollers(spollersRegular);
    }
  }
};
spollers();