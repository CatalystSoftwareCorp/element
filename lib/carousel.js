module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 387);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/* Modified from https://github.com/sdecima/javascript-detect-element-resize
 * version: 0.5.3
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 Sebastián Décima
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
var isServer = typeof window === 'undefined';

/* istanbul ignore next */
var requestFrame = function () {
  if (isServer) return;
  var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
    return window.setTimeout(fn, 20);
  };
  return function (fn) {
    return raf(fn);
  };
}();

/* istanbul ignore next */
var cancelFrame = function () {
  if (isServer) return;
  var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
  return function (id) {
    return cancel(id);
  };
}();

/* istanbul ignore next */
var resetTrigger = function resetTrigger(element) {
  var trigger = element.__resizeTrigger__;
  var expand = trigger.firstElementChild;
  var contract = trigger.lastElementChild;
  var expandChild = expand.firstElementChild;

  contract.scrollLeft = contract.scrollWidth;
  contract.scrollTop = contract.scrollHeight;
  expandChild.style.width = expand.offsetWidth + 1 + 'px';
  expandChild.style.height = expand.offsetHeight + 1 + 'px';
  expand.scrollLeft = expand.scrollWidth;
  expand.scrollTop = expand.scrollHeight;
};

/* istanbul ignore next */
var checkTriggers = function checkTriggers(element) {
  return element.offsetWidth !== element.__resizeLast__.width || element.offsetHeight !== element.__resizeLast__.height;
};

/* istanbul ignore next */
var scrollListener = function scrollListener(event) {
  var _this = this;

  resetTrigger(this);
  if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__);
  this.__resizeRAF__ = requestFrame(function () {
    if (checkTriggers(_this)) {
      _this.__resizeLast__.width = _this.offsetWidth;
      _this.__resizeLast__.height = _this.offsetHeight;
      _this.__resizeListeners__.forEach(function (fn) {
        fn.call(_this, event);
      });
    }
  });
};

/* Detect CSS Animations support to detect element display/re-attach */
var attachEvent = isServer ? {} : document.attachEvent;
var DOM_PREFIXES = 'Webkit Moz O ms'.split(' ');
var START_EVENTS = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' ');
var RESIZE_ANIMATION_NAME = 'resizeanim';
var animation = false;
var keyFramePrefix = '';
var animationStartEvent = 'animationstart';

/* istanbul ignore next */
if (!attachEvent && !isServer) {
  var testElement = document.createElement('fakeelement');
  if (testElement.style.animationName !== undefined) {
    animation = true;
  }

  if (animation === false) {
    var prefix = '';
    for (var i = 0; i < DOM_PREFIXES.length; i++) {
      if (testElement.style[DOM_PREFIXES[i] + 'AnimationName'] !== undefined) {
        prefix = DOM_PREFIXES[i];
        keyFramePrefix = '-' + prefix.toLowerCase() + '-';
        animationStartEvent = START_EVENTS[i];
        animation = true;
        break;
      }
    }
  }
}

var stylesCreated = false;
/* istanbul ignore next */
var createStyles = function createStyles() {
  if (!stylesCreated && !isServer) {
    var animationKeyframes = '@' + keyFramePrefix + 'keyframes ' + RESIZE_ANIMATION_NAME + ' { from { opacity: 0; } to { opacity: 0; } } ';
    var animationStyle = keyFramePrefix + 'animation: 1ms ' + RESIZE_ANIMATION_NAME + ';';

    // opacity: 0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
    var css = animationKeyframes + '\n      .resize-triggers { ' + animationStyle + ' visibility: hidden; opacity: 0; }\n      .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1 }\n      .resize-triggers > div { background: #eee; overflow: auto; }\n      .contract-trigger:before { width: 200%; height: 200%; }';

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
    stylesCreated = true;
  }
};

/* istanbul ignore next */
var addResizeListener = exports.addResizeListener = function addResizeListener(element, fn) {
  if (isServer) return;
  if (attachEvent) {
    element.attachEvent('onresize', fn);
  } else {
    if (!element.__resizeTrigger__) {
      if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
      }
      createStyles();
      element.__resizeLast__ = {};
      element.__resizeListeners__ = [];

      var resizeTrigger = element.__resizeTrigger__ = document.createElement('div');
      resizeTrigger.className = 'resize-triggers';
      resizeTrigger.innerHTML = '<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>';
      element.appendChild(resizeTrigger);

      resetTrigger(element);
      element.addEventListener('scroll', scrollListener, true);

      /* Listen for a css animation to detect element display/re-attach */
      if (animationStartEvent) {
        resizeTrigger.addEventListener(animationStartEvent, function (event) {
          if (event.animationName === RESIZE_ANIMATION_NAME) {
            resetTrigger(element);
          }
        });
      }
    }
    element.__resizeListeners__.push(fn);
  }
};

/* istanbul ignore next */
var removeResizeListener = exports.removeResizeListener = function removeResizeListener(element, fn) {
  if (!element || !element.__resizeListeners__) return;
  if (attachEvent) {
    element.detachEvent('onresize', fn);
  } else {
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length) {
      element.removeEventListener('scroll', scrollListener);
      element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__);
    }
  }
};

/***/ }),

/***/ 387:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(388);


/***/ }),

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _main = __webpack_require__(389);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_main2.default.install = function (Vue) {
  Vue.component(_main2.default.name, _main2.default);
};

exports.default = _main2.default;

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_deef359c_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__ = __webpack_require__(391);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_deef359c_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 390:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _throttle = __webpack_require__(85);

var _throttle2 = _interopRequireDefault(_throttle);

var _resizeEvent = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'ElCarousel',

  props: {
    initialIndex: {
      type: Number,
      default: 0
    },
    height: String,
    trigger: {
      type: String,
      default: 'hover'
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    indicatorPosition: String,
    indicator: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: String,
      default: 'hover'
    },
    type: String
  },

  data: function data() {
    return {
      items: [],
      activeIndex: -1,
      containerWidth: 0,
      timer: null,
      hover: false
    };
  },


  computed: {
    hasLabel: function hasLabel() {
      return this.items.some(function (item) {
        return item.label.toString().length > 0;
      });
    }
  },

  watch: {
    items: function items(val) {
      if (val.length > 0) this.setActiveItem(this.initialIndex);
    },
    activeIndex: function activeIndex(val, oldVal) {
      this.resetItemPosition(oldVal);
      this.$emit('change', val, oldVal);
    },
    autoplay: function autoplay(val) {
      val ? this.startTimer() : this.pauseTimer();
    }
  },

  methods: {
    handleMouseEnter: function handleMouseEnter() {
      this.hover = true;
      this.pauseTimer();
    },
    handleMouseLeave: function handleMouseLeave() {
      this.hover = false;
      this.startTimer();
    },
    itemInStage: function itemInStage(item, index) {
      var length = this.items.length;
      if (index === length - 1 && item.inStage && this.items[0].active || item.inStage && this.items[index + 1] && this.items[index + 1].active) {
        return 'left';
      } else if (index === 0 && item.inStage && this.items[length - 1].active || item.inStage && this.items[index - 1] && this.items[index - 1].active) {
        return 'right';
      }
      return false;
    },
    handleButtonEnter: function handleButtonEnter(arrow) {
      var _this = this;

      this.items.forEach(function (item, index) {
        if (arrow === _this.itemInStage(item, index)) {
          item.hover = true;
        }
      });
    },
    handleButtonLeave: function handleButtonLeave() {
      this.items.forEach(function (item) {
        item.hover = false;
      });
    },
    updateItems: function updateItems() {
      this.items = this.$children.filter(function (child) {
        return child.$options.name === 'ElCarouselItem';
      });
    },
    resetItemPosition: function resetItemPosition(oldIndex) {
      var _this2 = this;

      this.items.forEach(function (item, index) {
        item.translateItem(index, _this2.activeIndex, oldIndex);
      });
    },
    playSlides: function playSlides() {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++;
      } else {
        this.activeIndex = 0;
      }
    },
    pauseTimer: function pauseTimer() {
      clearInterval(this.timer);
    },
    startTimer: function startTimer() {
      if (this.interval <= 0 || !this.autoplay) return;
      this.timer = setInterval(this.playSlides, this.interval);
    },
    setActiveItem: function setActiveItem(index) {
      if (typeof index === 'string') {
        var filteredItems = this.items.filter(function (item) {
          return item.name === index;
        });
        if (filteredItems.length > 0) {
          index = this.items.indexOf(filteredItems[0]);
        }
      }
      index = Number(index);
      if (isNaN(index) || index !== Math.floor(index)) {
        "production" !== 'production' && console.warn('[Element Warn][Carousel]index must be an integer.');
        return;
      }
      var length = this.items.length;
      if (index < 0) {
        this.activeIndex = length - 1;
      } else if (index >= length) {
        this.activeIndex = 0;
      } else {
        this.activeIndex = index;
      }
    },
    prev: function prev() {
      this.setActiveItem(this.activeIndex - 1);
    },
    next: function next() {
      this.setActiveItem(this.activeIndex + 1);
    },
    handleIndicatorClick: function handleIndicatorClick(index) {
      this.activeIndex = index;
    },
    handleIndicatorHover: function handleIndicatorHover(index) {
      if (this.trigger === 'hover' && index !== this.activeIndex) {
        this.activeIndex = index;
      }
    }
  },

  created: function created() {
    var _this3 = this;

    this.throttledArrowClick = (0, _throttle2.default)(300, true, function (index) {
      _this3.setActiveItem(index);
    });
    this.throttledIndicatorHover = (0, _throttle2.default)(300, function (index) {
      _this3.handleIndicatorHover(index);
    });
  },
  mounted: function mounted() {
    var _this4 = this;

    this.updateItems();
    this.$nextTick(function () {
      (0, _resizeEvent.addResizeListener)(_this4.$el, _this4.resetItemPosition);
      if (_this4.initialIndex < _this4.items.length && _this4.initialIndex >= 0) {
        _this4.activeIndex = _this4.initialIndex;
      }
      _this4.startTimer();
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$el) (0, _resizeEvent.removeResizeListener)(this.$el, this.resetItemPosition);
  }
};

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"el-carousel",class:{ 'el-carousel--card': _vm.type === 'card' },on:{"mouseenter":function($event){$event.stopPropagation();_vm.handleMouseEnter($event)},"mouseleave":function($event){$event.stopPropagation();_vm.handleMouseLeave($event)}}},[_c('div',{staticClass:"el-carousel__container",style:({ height: _vm.height })},[_c('transition',{attrs:{"name":"carousel-arrow-left"}},[(_vm.arrow !== 'never')?_c('button',{directives:[{name:"show",rawName:"v-show",value:(_vm.arrow === 'always' || _vm.hover),expression:"arrow === 'always' || hover"}],staticClass:"el-carousel__arrow el-carousel__arrow--left",on:{"mouseenter":function($event){_vm.handleButtonEnter('left')},"mouseleave":_vm.handleButtonLeave,"click":function($event){$event.stopPropagation();_vm.throttledArrowClick(_vm.activeIndex - 1)}}},[_c('i',{staticClass:"el-icon-arrow-left"})]):_vm._e()]),_c('transition',{attrs:{"name":"carousel-arrow-right"}},[(_vm.arrow !== 'never')?_c('button',{directives:[{name:"show",rawName:"v-show",value:(_vm.arrow === 'always' || _vm.hover),expression:"arrow === 'always' || hover"}],staticClass:"el-carousel__arrow el-carousel__arrow--right",on:{"mouseenter":function($event){_vm.handleButtonEnter('right')},"mouseleave":_vm.handleButtonLeave,"click":function($event){$event.stopPropagation();_vm.throttledArrowClick(_vm.activeIndex + 1)}}},[_c('i',{staticClass:"el-icon-arrow-right"})]):_vm._e()]),_vm._t("default")],2),(_vm.indicatorPosition !== 'none')?_c('ul',{staticClass:"el-carousel__indicators",class:{ 'el-carousel__indicators--labels': _vm.hasLabel, 'el-carousel__indicators--outside': _vm.indicatorPosition === 'outside' || _vm.type === 'card' }},_vm._l((_vm.items),function(item,index){return _c('li',{staticClass:"el-carousel__indicator",class:{ 'is-active': index === _vm.activeIndex },on:{"mouseenter":function($event){_vm.throttledIndicatorHover(index)},"click":function($event){$event.stopPropagation();_vm.handleIndicatorClick(index)}}},[_c('button',{staticClass:"el-carousel__button"},[(_vm.hasLabel)?_c('span',[_vm._v(_vm._s(item.label))]):_vm._e()])])})):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 85:
/***/ (function(module, exports) {

module.exports = require("throttle-debounce/throttle");

/***/ })

/******/ });