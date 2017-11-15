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
/******/ 	return __webpack_require__(__webpack_require__.s = 208);
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

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function _broadcast(componentName, eventName, params) {
  this.$children.forEach(function (child) {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
exports.default = {
  methods: {
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    }
  }
};

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(209);


/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _tableColumn = __webpack_require__(210);

var _tableColumn2 = _interopRequireDefault(_tableColumn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_tableColumn2.default.install = function (Vue) {
  Vue.component(_tableColumn2.default.name, _tableColumn2.default);
};

exports.default = _tableColumn2.default;

/***/ }),

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _checkbox = __webpack_require__(34);

var _checkbox2 = _interopRequireDefault(_checkbox);

var _tag = __webpack_require__(38);

var _tag2 = _interopRequireDefault(_tag);

var _merge = __webpack_require__(6);

var _merge2 = _interopRequireDefault(_merge);

var _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var columnIdSeed = 1;

var defaults = {
  default: {
    order: ''
  },
  selection: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: '',
    className: 'el-table-column--selection'
  },
  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ''
  },
  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ''
  }
};

var forced = {
  selection: {
    renderHeader: function renderHeader(h) {
      return h(
        'el-checkbox',
        {
          nativeOn: {
            'click': this.toggleAllSelection
          },
          attrs: {
            value: this.isAllSelected }
        },
        []
      );
    },
    renderCell: function renderCell(h, _ref) {
      var row = _ref.row,
          column = _ref.column,
          store = _ref.store,
          $index = _ref.$index;

      return h(
        'el-checkbox',
        {
          attrs: {
            value: store.isSelected(row),
            disabled: column.selectable ? !column.selectable.call(null, row, $index) : false
          },
          on: {
            'input': function input() {
              store.commit('rowSelectedChanged', row);
            }
          }
        },
        []
      );
    },
    sortable: false,
    resizable: false
  },
  index: {
    renderHeader: function renderHeader(h, _ref2) {
      var column = _ref2.column;

      return column.label || '#';
    },
    renderCell: function renderCell(h, _ref3) {
      var $index = _ref3.$index,
          column = _ref3.column;

      var i = $index + 1;
      var index = column.index;

      if (typeof index === 'number') {
        i = $index + index;
      } else if (typeof index === 'function') {
        i = index($index);
      }

      return h(
        'div',
        null,
        [i]
      );
    },
    sortable: false
  },
  expand: {
    renderHeader: function renderHeader(h, _ref4) {
      _objectDestructuringEmpty(_ref4);

      return '';
    },
    renderCell: function renderCell(h, _ref5, proxy) {
      var row = _ref5.row,
          store = _ref5.store;

      var expanded = store.states.expandRows.indexOf(row) > -1;
      return h(
        'div',
        { 'class': 'el-table__expand-icon ' + (expanded ? 'el-table__expand-icon--expanded' : ''),
          on: {
            'click': function click() {
              return proxy.handleExpandClick(row);
            }
          }
        },
        [h(
          'i',
          { 'class': 'el-icon el-icon-arrow-right' },
          []
        )]
      );
    },
    sortable: false,
    resizable: false,
    className: 'el-table__expand-column'
  }
};

var getDefaultColumn = function getDefaultColumn(type, options) {
  var column = {};

  (0, _merge2.default)(column, defaults[type || 'default']);

  for (var name in options) {
    if (options.hasOwnProperty(name)) {
      var value = options[name];
      if (typeof value !== 'undefined') {
        column[name] = value;
      }
    }
  }

  if (!column.minWidth) {
    column.minWidth = 80;
  }

  column.realWidth = column.width || column.minWidth;

  return column;
};

var DEFAULT_RENDER_CELL = function DEFAULT_RENDER_CELL(h, _ref6) {
  var row = _ref6.row,
      column = _ref6.column;

  var property = column.property;
  var value = property && (0, _util.getPropByPath)(row, property).v;
  if (column && column.formatter) {
    return column.formatter(row, column, value);
  }
  return value;
};

exports.default = {
  name: 'ElTableColumn',

  props: {
    type: {
      type: String,
      default: 'default'
    },
    label: String,
    className: String,
    labelClassName: String,
    property: String,
    prop: String,
    width: {},
    minWidth: {},
    renderHeader: Function,
    sortable: {
      type: [String, Boolean],
      default: false
    },
    sortMethod: Function,
    sortBy: [String, Function, Array],
    resizable: {
      type: Boolean,
      default: true
    },
    context: {},
    columnKey: String,
    align: String,
    headerAlign: String,
    showTooltipWhenOverflow: Boolean,
    showOverflowTooltip: Boolean,
    fixed: [Boolean, String],
    formatter: Function,
    selectable: Function,
    reserveSelection: Boolean,
    filterMethod: Function,
    filteredValue: Array,
    filters: Array,
    filterPlacement: String,
    filterMultiple: {
      type: Boolean,
      default: true
    },
    index: [Number, Function]
  },

  data: function data() {
    return {
      isSubColumn: false,
      columns: []
    };
  },
  beforeCreate: function beforeCreate() {
    this.row = {};
    this.column = {};
    this.$index = 0;
  },


  components: {
    ElCheckbox: _checkbox2.default,
    ElTag: _tag2.default
  },

  computed: {
    owner: function owner() {
      var parent = this.$parent;
      while (parent && !parent.tableId) {
        parent = parent.$parent;
      }
      return parent;
    }
  },

  created: function created() {
    var _this = this;

    this.customRender = this.$options.render;
    this.$options.render = function (h) {
      return h('div', _this.$slots.default);
    };
    this.columnId = (this.$parent.tableId || this.$parent.columnId + '_') + 'column_' + columnIdSeed++;

    var parent = this.$parent;
    var owner = this.owner;
    this.isSubColumn = owner !== parent;

    var type = this.type;

    var width = this.width;
    if (width !== undefined) {
      width = parseInt(width, 10);
      if (isNaN(width)) {
        width = null;
      }
    }

    var minWidth = this.minWidth;
    if (minWidth !== undefined) {
      minWidth = parseInt(minWidth, 10);
      if (isNaN(minWidth)) {
        minWidth = 80;
      }
    }

    var isColumnGroup = false;

    var column = getDefaultColumn(type, {
      id: this.columnId,
      columnKey: this.columnKey,
      label: this.label,
      className: this.className,
      labelClassName: this.labelClassName,
      property: this.prop || this.property,
      type: type,
      renderCell: null,
      renderHeader: this.renderHeader,
      minWidth: minWidth,
      width: width,
      isColumnGroup: isColumnGroup,
      context: this.context,
      align: this.align ? 'is-' + this.align : null,
      headerAlign: this.headerAlign ? 'is-' + this.headerAlign : this.align ? 'is-' + this.align : null,
      sortable: this.sortable === '' ? true : this.sortable,
      sortMethod: this.sortMethod,
      sortBy: this.sortBy,
      resizable: this.resizable,
      showOverflowTooltip: this.showOverflowTooltip || this.showTooltipWhenOverflow,
      formatter: this.formatter,
      selectable: this.selectable,
      reserveSelection: this.reserveSelection,
      fixed: this.fixed === '' ? true : this.fixed,
      filterMethod: this.filterMethod,
      filters: this.filters,
      filterable: this.filters || this.filterMethod,
      filterMultiple: this.filterMultiple,
      filterOpened: false,
      filteredValue: this.filteredValue || [],
      filterPlacement: this.filterPlacement || '',
      index: this.index
    });

    (0, _merge2.default)(column, forced[type] || {});

    this.columnConfig = column;

    var renderCell = column.renderCell;
    var _self = this;

    if (type === 'expand') {
      owner.renderExpanded = function (h, data) {
        return _self.$scopedSlots.default ? _self.$scopedSlots.default(data) : _self.$slots.default;
      };

      column.renderCell = function (h, data) {
        return h(
          'div',
          { 'class': 'cell' },
          [renderCell(h, data, this._renderProxy)]
        );
      };

      return;
    }

    column.renderCell = function (h, data) {
      if (_self.$scopedSlots.default) {
        renderCell = function renderCell() {
          return _self.$scopedSlots.default(data);
        };
      }

      if (!renderCell) {
        renderCell = DEFAULT_RENDER_CELL;
      }

      return _self.showOverflowTooltip || _self.showTooltipWhenOverflow ? h(
        'div',
        { 'class': 'cell el-tooltip', style: 'width:' + (data.column.realWidth || data.column.width) + 'px' },
        [renderCell(h, data)]
      ) : h(
        'div',
        { 'class': 'cell' },
        [renderCell(h, data)]
      );
    };
  },
  destroyed: function destroyed() {
    if (!this.$parent) return;
    this.owner.store.commit('removeColumn', this.columnConfig);
  },


  watch: {
    label: function label(newVal) {
      if (this.columnConfig) {
        this.columnConfig.label = newVal;
      }
    },
    prop: function prop(newVal) {
      if (this.columnConfig) {
        this.columnConfig.property = newVal;
      }
    },
    property: function property(newVal) {
      if (this.columnConfig) {
        this.columnConfig.property = newVal;
      }
    },
    filters: function filters(newVal) {
      if (this.columnConfig) {
        this.columnConfig.filters = newVal;
      }
    },
    filterMultiple: function filterMultiple(newVal) {
      if (this.columnConfig) {
        this.columnConfig.filterMultiple = newVal;
      }
    },
    align: function align(newVal) {
      if (this.columnConfig) {
        this.columnConfig.align = newVal ? 'is-' + newVal : null;

        if (!this.headerAlign) {
          this.columnConfig.headerAlign = newVal ? 'is-' + newVal : null;
        }
      }
    },
    headerAlign: function headerAlign(newVal) {
      if (this.columnConfig) {
        this.columnConfig.headerAlign = 'is-' + (newVal ? newVal : this.align);
      }
    },
    width: function width(newVal) {
      if (this.columnConfig) {
        this.columnConfig.width = newVal;
        this.owner.store.scheduleLayout();
      }
    },
    minWidth: function minWidth(newVal) {
      if (this.columnConfig) {
        this.columnConfig.minWidth = newVal;
        this.owner.store.scheduleLayout();
      }
    },
    fixed: function fixed(newVal) {
      if (this.columnConfig) {
        this.columnConfig.fixed = newVal;
        this.owner.store.scheduleLayout();
      }
    },
    sortable: function sortable(newVal) {
      if (this.columnConfig) {
        this.columnConfig.sortable = newVal;
      }
    },
    index: function index(newVal) {
      if (this.columnConfig) {
        this.columnConfig.index = newVal;
      }
    }
  },

  mounted: function mounted() {
    var owner = this.owner;
    var parent = this.$parent;
    var columnIndex = void 0;

    if (!this.isSubColumn) {
      columnIndex = [].indexOf.call(parent.$refs.hiddenColumns.children, this.$el);
    } else {
      columnIndex = [].indexOf.call(parent.$el.children, this.$el);
    }

    owner.store.commit('insertColumn', this.columnConfig, columnIndex, this.isSubColumn ? parent.columnConfig : null);
  }
};

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _checkbox = __webpack_require__(44);

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_checkbox2.default.install = function (Vue) {
  Vue.component(_checkbox2.default.name, _checkbox2.default);
};

exports.default = _checkbox2.default;

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _tag = __webpack_require__(39);

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_tag2.default.install = function (Vue) {
  Vue.component(_tag2.default.name, _tag2.default);
};

exports.default = _tag2.default;

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_tag_vue__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_tag_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_tag_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c35058ce_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_tag_vue__ = __webpack_require__(41);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_tag_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c35058ce_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_tag_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
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
  name: 'ElTag',
  props: {
    text: String,
    closable: Boolean,
    type: String,
    hit: Boolean,
    disableTransitions: Boolean,
    color: String,
    size: String
  },
  methods: {
    handleClose: function handleClose(event) {
      this.$emit('close', event);
    }
  },
  computed: {
    tagSize: function tagSize() {
      return this.size || (this.$ELEMENT || {}).size;
    }
  }
};

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.disableTransitions ? '' : 'el-zoom-in-center'}},[_c('span',{staticClass:"el-tag",class:[
      _vm.type ? 'el-tag--' + _vm.type : '',
      _vm.tagSize && ("el-tag--" + _vm.tagSize),
      {'is-hit': _vm.hit}
    ],style:({backgroundColor: _vm.color})},[_vm._t("default"),(_vm.closable)?_c('i',{staticClass:"el-tag__close el-icon-close",on:{"click":_vm.handleClose}}):_vm._e()],2)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_checkbox_vue__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_checkbox_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_checkbox_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0b40748e_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_checkbox_vue__ = __webpack_require__(46);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_checkbox_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0b40748e_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_checkbox_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _emitter = __webpack_require__(2);

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'ElCheckbox',

  mixins: [_emitter2.default],

  inject: {
    elFormItem: {
      default: ''
    }
  },

  componentName: 'ElCheckbox',

  data: function data() {
    return {
      selfModel: false,
      focus: false,
      isLimitExceeded: false
    };
  },


  computed: {
    model: {
      get: function get() {
        return this.isGroup ? this.store : this.value !== undefined ? this.value : this.selfModel;
      },
      set: function set(val) {
        if (this.isGroup) {
          this.isLimitExceeded = false;
          this._checkboxGroup.min !== undefined && val.length < this._checkboxGroup.min && (this.isLimitExceeded = true);

          this._checkboxGroup.max !== undefined && val.length > this._checkboxGroup.max && (this.isLimitExceeded = true);

          this.isLimitExceeded === false && this.dispatch('ElCheckboxGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
          this.selfModel = val;
        }
      }
    },

    isChecked: function isChecked() {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel;
      }
    },
    isGroup: function isGroup() {
      var parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'ElCheckboxGroup') {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },
    store: function store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    },
    isDisabled: function isDisabled() {
      return this.isGroup ? this._checkboxGroup.disabled || this.disabled : this.disabled;
    },
    _elFormItemSize: function _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    checkboxSize: function checkboxSize() {
      var temCheckboxSize = this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      return this.isGroup ? this._checkboxGroup.checkboxGroupSize || temCheckboxSize : temCheckboxSize;
    }
  },

  props: {
    value: {},
    label: {},
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    id: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
    controls: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
    border: Boolean,
    size: String
  },

  methods: {
    addToStore: function addToStore() {
      if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
        this.model.push(this.label);
      } else {
        this.model = this.trueLabel || true;
      }
    },
    handleChange: function handleChange(ev) {
      var _this = this;

      if (this.isLimitExceeded) return;
      var value = void 0;
      if (ev.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel;
      } else {
        value = this.falseLabel === undefined ? false : this.falseLabel;
      }
      this.$emit('change', value, ev);
      this.$nextTick(function () {
        if (_this.isGroup) {
          _this.dispatch('ElCheckboxGroup', 'change', [_this._checkboxGroup.value]);
        }
      });
    }
  },

  created: function created() {
    this.checked && this.addToStore();
  },
  mounted: function mounted() {
    // 为indeterminate元素 添加aria-controls 属性
    if (this.indeterminate) {
      this.$el.setAttribute('aria-controls', this.controls);
    }
  }
}; //
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
//
//
//
//

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{staticClass:"el-checkbox",class:[
    _vm.border && _vm.checkboxSize ? 'el-checkbox--' + _vm.checkboxSize : '',
    { 'is-disabled': _vm.isDisabled },
    { 'is-bordered': _vm.border },
    { 'is-checked': _vm.isChecked }
  ],attrs:{"role":"checkbox","aria-checked":_vm.indeterminate ? 'mixed': _vm.isChecked,"aria-disabled":_vm.isDisabled,"id":_vm.id}},[_c('span',{staticClass:"el-checkbox__input",class:{
      'is-disabled': _vm.isDisabled,
      'is-checked': _vm.isChecked,
      'is-indeterminate': _vm.indeterminate,
      'is-focus': _vm.focus
    },attrs:{"aria-checked":"mixed"}},[_c('span',{staticClass:"el-checkbox__inner"}),(_vm.trueLabel || _vm.falseLabel)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],staticClass:"el-checkbox__original",attrs:{"type":"checkbox","name":_vm.name,"disabled":_vm.isDisabled,"true-value":_vm.trueLabel,"false-value":_vm.falseLabel},domProps:{"checked":Array.isArray(_vm.model)?_vm._i(_vm.model,null)>-1:_vm._q(_vm.model,_vm.trueLabel)},on:{"change":[function($event){var $$a=_vm.model,$$el=$event.target,$$c=$$el.checked?(_vm.trueLabel):(_vm.falseLabel);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.model=$$a.concat([$$v]))}else{$$i>-1&&(_vm.model=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.model=$$c}},_vm.handleChange],"focus":function($event){_vm.focus = true},"blur":function($event){_vm.focus = false}}}):_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],staticClass:"el-checkbox__original",attrs:{"type":"checkbox","disabled":_vm.isDisabled,"name":_vm.name},domProps:{"value":_vm.label,"checked":Array.isArray(_vm.model)?_vm._i(_vm.model,_vm.label)>-1:(_vm.model)},on:{"change":[function($event){var $$a=_vm.model,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=_vm.label,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.model=$$a.concat([$$v]))}else{$$i>-1&&(_vm.model=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.model=$$c}},_vm.handleChange],"focus":function($event){_vm.focus = true},"blur":function($event){_vm.focus = false}}})]),(_vm.$slots.default || _vm.label)?_c('span',{staticClass:"el-checkbox__label"},[_vm._t("default"),(!_vm.$slots.default)?[_vm._v(_vm._s(_vm.label))]:_vm._e()],2):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.noop = noop;
exports.hasOwn = hasOwn;
exports.toObject = toObject;
exports.getPropByPath = getPropByPath;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function noop() {};

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};

function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
};

function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
};

var getValueByPath = exports.getValueByPath = function getValueByPath(object, prop) {
  prop = prop || '';
  var paths = prop.split('.');
  var current = object;
  var result = null;
  for (var i = 0, j = paths.length; i < j; i++) {
    var path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};

function getPropByPath(obj, path, strict) {
  var tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  var keyArr = path.split('.');
  var i = 0;
  for (var len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    var key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};

var generateId = exports.generateId = function generateId() {
  return Math.floor(Math.random() * 10000);
};

var valueEquals = exports.valueEquals = function valueEquals(a, b) {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (var i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (target) {
  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments[i] || {};
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
};

;

/***/ })

/******/ });