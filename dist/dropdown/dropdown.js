this.primevue = this.primevue || {};
this.primevue.dropdown = (function (api, ChevronDownIcon, FilterIcon, SpinnerIcon, TimesIcon, OverlayEventBus, Portal, Ripple, utils, VirtualScroller, BaseComponent, usestyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var ChevronDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronDownIcon);
    var FilterIcon__default = /*#__PURE__*/_interopDefaultLegacy(FilterIcon);
    var SpinnerIcon__default = /*#__PURE__*/_interopDefaultLegacy(SpinnerIcon);
    var TimesIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesIcon);
    var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
    var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var VirtualScroller__default = /*#__PURE__*/_interopDefaultLegacy(VirtualScroller);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var styles = "\n.p-dropdown {\n    display: inline-flex;\n    cursor: pointer;\n    position: relative;\n    user-select: none;\n}\n\n.p-dropdown-clear-icon {\n    position: absolute;\n    top: 50%;\n    margin-top: -0.5rem;\n}\n\n.p-dropdown-trigger {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n}\n\n.p-dropdown-label {\n    display: block;\n    white-space: nowrap;\n    overflow: hidden;\n    flex: 1 1 auto;\n    width: 1%;\n    text-overflow: ellipsis;\n    cursor: pointer;\n}\n\n.p-dropdown-label-empty {\n    overflow: hidden;\n    opacity: 0;\n}\n\ninput.p-dropdown-label {\n    cursor: default;\n}\n\n.p-dropdown .p-dropdown-panel {\n    min-width: 100%;\n}\n\n.p-dropdown-panel {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n\n.p-dropdown-items-wrapper {\n    overflow: auto;\n}\n\n.p-dropdown-item {\n    cursor: pointer;\n    font-weight: normal;\n    white-space: nowrap;\n    position: relative;\n    overflow: hidden;\n}\n\n.p-dropdown-item-group {\n    cursor: auto;\n}\n\n.p-dropdown-items {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n}\n\n.p-dropdown-filter {\n    width: 100%;\n}\n\n.p-dropdown-filter-container {\n    position: relative;\n}\n\n.p-dropdown-filter-icon {\n    position: absolute;\n    top: 50%;\n    margin-top: -0.5rem;\n}\n\n.p-fluid .p-dropdown {\n    display: flex;\n}\n\n.p-fluid .p-dropdown .p-dropdown-label {\n    width: 1%;\n}\n";
    var classes = {
      root: function root(_ref) {
        var instance = _ref.instance,
          props = _ref.props,
          state = _ref.state;
        return ['p-dropdown p-component p-inputwrapper', {
          'p-disabled': props.disabled,
          'p-dropdown-clearable': props.showClear && !props.disabled,
          'p-focus': state.focused,
          'p-inputwrapper-filled': instance.hasSelectedOption,
          'p-inputwrapper-focus': state.focused || state.overlayVisible,
          'p-overlay-open': state.overlayVisible
        }];
      },
      input: function input(_ref2) {
        var instance = _ref2.instance,
          props = _ref2.props;
        return ['p-dropdown-label p-inputtext', {
          'p-placeholder': !props.editable && instance.label === props.placeholder,
          'p-dropdown-label-empty': !props.editable && !instance.$slots['value'] && (instance.label === 'p-emptylabel' || instance.label.length === 0)
        }];
      },
      clearIcon: 'p-dropdown-clear-icon',
      trigger: 'p-dropdown-trigger',
      loadingicon: 'p-dropdown-trigger-icon',
      dropdownIcon: 'p-dropdown-trigger-icon',
      panel: function panel(_ref3) {
        var instance = _ref3.instance;
        return ['p-dropdown-panel p-component', {
          'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
          'p-ripple-disabled': instance.$primevue.config.ripple === false
        }];
      },
      header: 'p-dropdown-header',
      filterContainer: 'p-dropdown-filter-container',
      filterInput: 'p-dropdown-filter p-inputtext p-component',
      filterIcon: 'p-dropdown-filter-icon',
      wrapper: 'p-dropdown-items-wrapper',
      list: 'p-dropdown-items',
      itemGroup: 'p-dropdown-item-group',
      item: function item(_ref4) {
        var instance = _ref4.instance,
          state = _ref4.state,
          option = _ref4.option,
          focusedOption = _ref4.focusedOption;
        return ['p-dropdown-item', {
          'p-highlight': instance.isSelected(option),
          'p-focus': state.focusedOptionIndex === focusedOption,
          'p-disabled': instance.isOptionDisabled(option)
        }];
      },
      emptyMessage: 'p-dropdown-empty-message'
    };
    var _useStyle = usestyle.useStyle(styles, {
        name: 'dropdown',
        manual: true
      }),
      loadStyle = _useStyle.load;
    var script$1 = {
      name: 'BaseDropdown',
      "extends": BaseComponent__default["default"],
      props: {
        modelValue: null,
        options: Array,
        optionLabel: [String, Function],
        optionValue: [String, Function],
        optionDisabled: [String, Function],
        optionGroupLabel: [String, Function],
        optionGroupChildren: [String, Function],
        scrollHeight: {
          type: String,
          "default": '200px'
        },
        filter: Boolean,
        filterPlaceholder: String,
        filterLocale: String,
        filterMatchMode: {
          type: String,
          "default": 'contains'
        },
        filterFields: {
          type: Array,
          "default": null
        },
        editable: Boolean,
        placeholder: {
          type: String,
          "default": null
        },
        disabled: {
          type: Boolean,
          "default": false
        },
        dataKey: null,
        showClear: {
          type: Boolean,
          "default": false
        },
        inputId: {
          type: String,
          "default": null
        },
        inputClass: {
          type: [String, Object],
          "default": null
        },
        inputStyle: {
          type: Object,
          "default": null
        },
        inputProps: {
          type: null,
          "default": null
        },
        panelClass: {
          type: [String, Object],
          "default": null
        },
        panelStyle: {
          type: Object,
          "default": null
        },
        panelProps: {
          type: null,
          "default": null
        },
        filterInputProps: {
          type: null,
          "default": null
        },
        clearIconProps: {
          type: null,
          "default": null
        },
        appendTo: {
          type: String,
          "default": 'body'
        },
        loading: {
          type: Boolean,
          "default": false
        },
        clearIcon: {
          type: String,
          "default": undefined
        },
        dropdownIcon: {
          type: String,
          "default": undefined
        },
        filterIcon: {
          type: String,
          "default": undefined
        },
        loadingIcon: {
          type: String,
          "default": undefined
        },
        resetFilterOnHide: {
          type: Boolean,
          "default": false
        },
        virtualScrollerOptions: {
          type: Object,
          "default": null
        },
        autoOptionFocus: {
          type: Boolean,
          "default": true
        },
        autoFilterFocus: {
          type: Boolean,
          "default": false
        },
        selectOnFocus: {
          type: Boolean,
          "default": false
        },
        filterMessage: {
          type: String,
          "default": null
        },
        selectionMessage: {
          type: String,
          "default": null
        },
        emptySelectionMessage: {
          type: String,
          "default": null
        },
        emptyFilterMessage: {
          type: String,
          "default": null
        },
        emptyMessage: {
          type: String,
          "default": null
        },
        tabindex: {
          type: Number,
          "default": 0
        },
        'aria-label': {
          type: String,
          "default": null
        },
        'aria-labelledby': {
          type: String,
          "default": null
        }
      },
      css: {
        classes: classes,
        loadStyle: loadStyle
      },
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
    function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
    function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
    function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
    function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
    function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
    function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
    var script = {
      name: 'Dropdown',
      "extends": script$1,
      emits: ['update:modelValue', 'change', 'focus', 'blur', 'before-show', 'before-hide', 'show', 'hide', 'filter'],
      outsideClickListener: null,
      scrollHandler: null,
      resizeListener: null,
      overlay: null,
      list: null,
      virtualScroller: null,
      searchTimeout: null,
      searchValue: null,
      isModelValueChanged: false,
      focusOnHover: false,
      data: function data() {
        return {
          id: this.$attrs.id,
          focused: false,
          focusedOptionIndex: -1,
          filterValue: null,
          overlayVisible: false
        };
      },
      watch: {
        '$attrs.id': function $attrsId(newValue) {
          this.id = newValue || utils.UniqueComponentId();
        },
        modelValue: function modelValue() {
          this.isModelValueChanged = true;
        },
        options: function options() {
          this.autoUpdateModel();
        }
      },
      mounted: function mounted() {
        this.id = this.id || utils.UniqueComponentId();
        this.autoUpdateModel();
      },
      updated: function updated() {
        if (this.overlayVisible && this.isModelValueChanged) {
          this.scrollInView(this.findSelectedOptionIndex());
        }
        this.isModelValueChanged = false;
      },
      beforeUnmount: function beforeUnmount() {
        this.unbindOutsideClickListener();
        this.unbindResizeListener();
        if (this.scrollHandler) {
          this.scrollHandler.destroy();
          this.scrollHandler = null;
        }
        if (this.overlay) {
          utils.ZIndexUtils.clear(this.overlay);
          this.overlay = null;
        }
      },
      methods: {
        getOptionIndex: function getOptionIndex(index, fn) {
          return this.virtualScrollerDisabled ? index : fn && fn(index)['index'];
        },
        getOptionLabel: function getOptionLabel(option) {
          return this.optionLabel ? utils.ObjectUtils.resolveFieldData(option, this.optionLabel) : option['label'] || option;
        },
        getOptionValue: function getOptionValue(option) {
          return this.optionValue ? utils.ObjectUtils.resolveFieldData(option, this.optionValue) : option['value'] || option;
        },
        getOptionRenderKey: function getOptionRenderKey(option, index) {
          return (this.dataKey ? utils.ObjectUtils.resolveFieldData(option, this.dataKey) : this.getOptionLabel(option)) + '_' + index;
        },
        getPTOptions: function getPTOptions(option, itemOptions, index, key) {
          return this.ptm(key, {
            context: {
              selected: this.isSelected(option),
              focused: this.focusedOptionIndex === this.getOptionIndex(index, itemOptions),
              disabled: this.isOptionDisabled(option)
            }
          });
        },
        isOptionDisabled: function isOptionDisabled(option) {
          return this.optionDisabled ? utils.ObjectUtils.resolveFieldData(option, this.optionDisabled) : false;
        },
        isOptionGroup: function isOptionGroup(option) {
          return this.optionGroupLabel && option.optionGroup && option.group;
        },
        getOptionGroupLabel: function getOptionGroupLabel(optionGroup) {
          return utils.ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel);
        },
        getOptionGroupChildren: function getOptionGroupChildren(optionGroup) {
          return utils.ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren);
        },
        getAriaPosInset: function getAriaPosInset(index) {
          var _this = this;
          return (this.optionGroupLabel ? index - this.visibleOptions.slice(0, index).filter(function (option) {
            return _this.isOptionGroup(option);
          }).length : index) + 1;
        },
        show: function show(isFocus) {
          this.$emit('before-show');
          this.overlayVisible = true;
          this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
          isFocus && utils.DomHandler.focus(this.$refs.focusInput);
        },
        hide: function hide(isFocus) {
          var _this2 = this;
          var _hide = function _hide() {
            _this2.$emit('before-hide');
            _this2.overlayVisible = false;
            _this2.focusedOptionIndex = -1;
            _this2.searchValue = '';
            _this2.resetFilterOnHide && (_this2.filterValue = null);
            isFocus && utils.DomHandler.focus(_this2.$refs.focusInput);
          };
          setTimeout(function () {
            _hide();
          }, 0); // For ScreenReaders
        },
        onFocus: function onFocus(event) {
          if (this.disabled) {
            // For ScreenReaders
            return;
          }
          this.focused = true;
          this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
          this.overlayVisible && this.scrollInView(this.focusedOptionIndex);
          this.$emit('focus', event);
        },
        onBlur: function onBlur(event) {
          this.focused = false;
          this.focusedOptionIndex = -1;
          this.searchValue = '';
          this.$emit('blur', event);
        },
        onKeyDown: function onKeyDown(event) {
          if (this.disabled) {
            event.preventDefault();
            return;
          }
          var metaKey = event.metaKey || event.ctrlKey;
          switch (event.code) {
            case 'ArrowDown':
              this.onArrowDownKey(event);
              break;
            case 'ArrowUp':
              this.onArrowUpKey(event, this.editable);
              break;
            case 'ArrowLeft':
            case 'ArrowRight':
              this.onArrowLeftKey(event, this.editable);
              break;
            case 'Delete':
              this.onDeleteKey(event);
            case 'Home':
              this.onHomeKey(event, this.editable);
              break;
            case 'End':
              this.onEndKey(event, this.editable);
              break;
            case 'PageDown':
              this.onPageDownKey(event);
              break;
            case 'PageUp':
              this.onPageUpKey(event);
              break;
            case 'Space':
              this.onSpaceKey(event, this.editable);
              break;
            case 'Enter':
            case 'NumpadEnter':
              this.onEnterKey(event);
              break;
            case 'Escape':
              this.onEscapeKey(event);
              break;
            case 'Tab':
              this.onTabKey(event);
              break;
            case 'Backspace':
              this.onBackspaceKey(event, this.editable);
              break;
            case 'ShiftLeft':
            case 'ShiftRight':
              //NOOP
              break;
            default:
              if (!metaKey && utils.ObjectUtils.isPrintableCharacter(event.key)) {
                !this.overlayVisible && this.show();
                !this.editable && this.searchOptions(event, event.key);
              }
              break;
          }
        },
        onEditableInput: function onEditableInput(event) {
          var value = event.target.value;
          this.searchValue = '';
          var matched = this.searchOptions(event, value);
          !matched && (this.focusedOptionIndex = -1);
          this.updateModel(event, value);
        },
        onContainerClick: function onContainerClick(event) {
          if (this.disabled || this.loading) {
            return;
          }
          if (event.target.tagName === 'INPUT' || event.target.getAttribute('data-pc-section') === 'clearicon' || event.target.closest('[data-pc-section="clearicon"]')) {
            return;
          } else if (!this.overlay || !this.overlay.contains(event.target)) {
            this.overlayVisible ? this.hide(true) : this.show(true);
          }
        },
        onClearClick: function onClearClick(event) {
          this.updateModel(event, null);
        },
        onFirstHiddenFocus: function onFirstHiddenFocus(event) {
          var focusableEl = event.relatedTarget === this.$refs.focusInput ? utils.DomHandler.getFirstFocusableElement(this.overlay, ':not([data-p-hidden-focusable="true"])') : this.$refs.focusInput;
          utils.DomHandler.focus(focusableEl);
        },
        onLastHiddenFocus: function onLastHiddenFocus(event) {
          var focusableEl = event.relatedTarget === this.$refs.focusInput ? utils.DomHandler.getLastFocusableElement(this.overlay, ':not([data-p-hidden-focusable="true"])') : this.$refs.focusInput;
          utils.DomHandler.focus(focusableEl);
        },
        onOptionSelect: function onOptionSelect(event, option) {
          var isHide = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
          this.updateModel(event, option);
          isHide && this.hide(true);
        },
        onOptionMouseMove: function onOptionMouseMove(event, index) {
          if (this.focusOnHover) {
            this.changeFocusedOptionIndex(event, index);
          }
        },
        onFilterChange: function onFilterChange(event) {
          var value = event.target.value;
          this.filterValue = value;
          this.focusedOptionIndex = -1;
          this.$emit('filter', {
            originalEvent: event,
            value: value
          });
          !this.virtualScrollerDisabled && this.virtualScroller.scrollToIndex(0);
        },
        onFilterKeyDown: function onFilterKeyDown(event) {
          switch (event.code) {
            case 'ArrowDown':
              this.onArrowDownKey(event);
              break;
            case 'ArrowUp':
              this.onArrowUpKey(event, true);
              break;
            case 'ArrowLeft':
            case 'ArrowRight':
              this.onArrowLeftKey(event, true);
              break;
            case 'Home':
              this.onHomeKey(event, true);
              break;
            case 'End':
              this.onEndKey(event, true);
              break;
            case 'Enter':
              this.onEnterKey(event);
              break;
            case 'Escape':
              this.onEscapeKey(event);
              break;
            case 'Tab':
              this.onTabKey(event, true);
              break;
          }
        },
        onFilterBlur: function onFilterBlur() {
          this.focusedOptionIndex = -1;
        },
        onFilterUpdated: function onFilterUpdated() {
          if (this.overlayVisible) {
            this.alignOverlay();
          }
        },
        onOverlayClick: function onOverlayClick(event) {
          OverlayEventBus__default["default"].emit('overlay-click', {
            originalEvent: event,
            target: this.$el
          });
        },
        onOverlayKeyDown: function onOverlayKeyDown(event) {
          switch (event.code) {
            case 'Escape':
              this.onEscapeKey(event);
              break;
          }
        },
        onDeleteKey: function onDeleteKey(event) {
          if (this.showClear) {
            this.updateModel(event, null);
            event.preventDefault();
          }
        },
        onArrowDownKey: function onArrowDownKey(event) {
          var optionIndex = this.focusedOptionIndex !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex) : this.findFirstFocusedOptionIndex();
          this.changeFocusedOptionIndex(event, optionIndex);
          !this.overlayVisible && this.show();
          event.preventDefault();
        },
        onArrowUpKey: function onArrowUpKey(event) {
          var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          if (event.altKey && !pressedInInputText) {
            if (this.focusedOptionIndex !== -1) {
              this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
            }
            this.overlayVisible && this.hide();
            event.preventDefault();
          } else {
            var optionIndex = this.focusedOptionIndex !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex) : this.findLastFocusedOptionIndex();
            this.changeFocusedOptionIndex(event, optionIndex);
            !this.overlayVisible && this.show();
            event.preventDefault();
          }
        },
        onArrowLeftKey: function onArrowLeftKey(event) {
          var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          pressedInInputText && (this.focusedOptionIndex = -1);
        },
        onHomeKey: function onHomeKey(event) {
          var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          if (pressedInInputText) {
            event.currentTarget.setSelectionRange(0, 0);
            this.focusedOptionIndex = -1;
          } else {
            this.changeFocusedOptionIndex(event, this.findFirstOptionIndex());
            !this.overlayVisible && this.show();
          }
          event.preventDefault();
        },
        onEndKey: function onEndKey(event) {
          var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          if (pressedInInputText) {
            var target = event.currentTarget;
            var len = target.value.length;
            target.setSelectionRange(len, len);
            this.focusedOptionIndex = -1;
          } else {
            this.changeFocusedOptionIndex(event, this.findLastOptionIndex());
            !this.overlayVisible && this.show();
          }
          event.preventDefault();
        },
        onPageUpKey: function onPageUpKey(event) {
          this.scrollInView(0);
          event.preventDefault();
        },
        onPageDownKey: function onPageDownKey(event) {
          this.scrollInView(this.visibleOptions.length - 1);
          event.preventDefault();
        },
        onEnterKey: function onEnterKey(event) {
          if (!this.overlayVisible) {
            this.onArrowDownKey(event);
          } else {
            if (this.focusedOptionIndex !== -1) {
              this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
            }
            this.hide();
          }
          event.preventDefault();
        },
        onSpaceKey: function onSpaceKey(event) {
          var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          !pressedInInputText && this.onEnterKey(event);
        },
        onEscapeKey: function onEscapeKey(event) {
          this.overlayVisible && this.hide(true);
          event.preventDefault();
        },
        onTabKey: function onTabKey(event) {
          var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          if (!pressedInInputText) {
            if (this.overlayVisible && this.hasFocusableElements()) {
              utils.DomHandler.focus(this.$refs.firstHiddenFocusableElementOnOverlay);
              event.preventDefault();
            } else {
              if (this.focusedOptionIndex !== -1) {
                this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
              }
              this.overlayVisible && this.hide(this.filter);
            }
          }
        },
        onBackspaceKey: function onBackspaceKey(event) {
          var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          if (pressedInInputText) {
            !this.overlayVisible && this.show();
          }
        },
        onOverlayEnter: function onOverlayEnter(el) {
          utils.ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
          utils.DomHandler.addStyles(el, {
            position: 'absolute',
            top: '0',
            left: '0'
          });
          this.alignOverlay();
          this.scrollInView();
          this.autoFilterFocus && utils.DomHandler.focus(this.$refs.filterInput);
        },
        onOverlayAfterEnter: function onOverlayAfterEnter() {
          this.bindOutsideClickListener();
          this.bindScrollListener();
          this.bindResizeListener();
          this.$emit('show');
        },
        onOverlayLeave: function onOverlayLeave() {
          this.unbindOutsideClickListener();
          this.unbindScrollListener();
          this.unbindResizeListener();
          this.$emit('hide');
          this.overlay = null;
        },
        onOverlayAfterLeave: function onOverlayAfterLeave(el) {
          utils.ZIndexUtils.clear(el);
        },
        alignOverlay: function alignOverlay() {
          if (this.appendTo === 'self') {
            utils.DomHandler.relativePosition(this.overlay, this.$el);
          } else {
            this.overlay.style.minWidth = utils.DomHandler.getOuterWidth(this.$el) + 'px';
            utils.DomHandler.absolutePosition(this.overlay, this.$el);
          }
        },
        bindOutsideClickListener: function bindOutsideClickListener() {
          var _this3 = this;
          if (!this.outsideClickListener) {
            this.outsideClickListener = function (event) {
              if (_this3.overlayVisible && _this3.overlay && !_this3.$el.contains(event.target) && !_this3.overlay.contains(event.target)) {
                _this3.hide();
              }
            };
            document.addEventListener('click', this.outsideClickListener);
          }
        },
        unbindOutsideClickListener: function unbindOutsideClickListener() {
          if (this.outsideClickListener) {
            document.removeEventListener('click', this.outsideClickListener);
            this.outsideClickListener = null;
          }
        },
        bindScrollListener: function bindScrollListener() {
          var _this4 = this;
          if (!this.scrollHandler) {
            this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.$refs.container, function () {
              if (_this4.overlayVisible) {
                _this4.hide();
              }
            });
          }
          this.scrollHandler.bindScrollListener();
        },
        unbindScrollListener: function unbindScrollListener() {
          if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
          }
        },
        bindResizeListener: function bindResizeListener() {
          var _this5 = this;
          if (!this.resizeListener) {
            this.resizeListener = function () {
              if (_this5.overlayVisible && !utils.DomHandler.isTouchDevice()) {
                _this5.hide();
              }
            };
            window.addEventListener('resize', this.resizeListener);
          }
        },
        unbindResizeListener: function unbindResizeListener() {
          if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
            this.resizeListener = null;
          }
        },
        hasFocusableElements: function hasFocusableElements() {
          return utils.DomHandler.getFocusableElements(this.overlay, ':not([data-p-hidden-focusable="true"])').length > 0;
        },
        isOptionMatched: function isOptionMatched(option) {
          return this.isValidOption(option) && this.getOptionValue(option).toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale));
        },
        isValidOption: function isValidOption(option) {
          return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
        },
        isValidSelectedOption: function isValidSelectedOption(option) {
          return this.isValidOption(option) && this.isSelected(option);
        },
        isSelected: function isSelected(option) {
          return this.isValidOption(option) && this.getOptionValue(this.modelValue) === this.getOptionValue(option);
        },
        findFirstOptionIndex: function findFirstOptionIndex() {
          var _this6 = this;
          return this.visibleOptions.findIndex(function (option) {
            return _this6.isValidOption(option);
          });
        },
        findLastOptionIndex: function findLastOptionIndex() {
          var _this7 = this;
          return utils.ObjectUtils.findLastIndex(this.visibleOptions, function (option) {
            return _this7.isValidOption(option);
          });
        },
        findNextOptionIndex: function findNextOptionIndex(index) {
          var _this8 = this;
          var matchedOptionIndex = index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex(function (option) {
            return _this8.isValidOption(option);
          }) : -1;
          return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
        },
        findPrevOptionIndex: function findPrevOptionIndex(index) {
          var _this9 = this;
          var matchedOptionIndex = index > 0 ? utils.ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), function (option) {
            return _this9.isValidOption(option);
          }) : -1;
          return matchedOptionIndex > -1 ? matchedOptionIndex : index;
        },
        findSelectedOptionIndex: function findSelectedOptionIndex() {
          var _this10 = this;
          return this.hasSelectedOption ? this.visibleOptions.findIndex(function (option) {
            return _this10.isValidSelectedOption(option);
          }) : -1;
        },
        findFirstFocusedOptionIndex: function findFirstFocusedOptionIndex() {
          var selectedIndex = this.findSelectedOptionIndex();
          return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
        },
        findLastFocusedOptionIndex: function findLastFocusedOptionIndex() {
          var selectedIndex = this.findSelectedOptionIndex();
          return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
        },
        searchOptions: function searchOptions(event, _char) {
          var _this11 = this;
          this.searchValue = (this.searchValue || '') + _char;
          var optionIndex = -1;
          var matched = false;
          if (this.focusedOptionIndex !== -1) {
            optionIndex = this.visibleOptions.slice(this.focusedOptionIndex).findIndex(function (option) {
              return _this11.isOptionMatched(option);
            });
            optionIndex = optionIndex === -1 ? this.visibleOptions.slice(0, this.focusedOptionIndex).findIndex(function (option) {
              return _this11.isOptionMatched(option);
            }) : optionIndex + this.focusedOptionIndex;
          } else {
            optionIndex = this.visibleOptions.findIndex(function (option) {
              return _this11.isOptionMatched(option);
            });
          }
          if (optionIndex !== -1) {
            matched = true;
          }
          if (optionIndex === -1 && this.focusedOptionIndex === -1) {
            optionIndex = this.findFirstFocusedOptionIndex();
          }
          if (optionIndex !== -1) {
            this.changeFocusedOptionIndex(event, optionIndex);
          }
          if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
          }
          this.searchTimeout = setTimeout(function () {
            _this11.searchValue = '';
            _this11.searchTimeout = null;
          }, 500);
          return matched;
        },
        changeFocusedOptionIndex: function changeFocusedOptionIndex(event, index) {
          if (this.focusedOptionIndex !== index) {
            this.focusedOptionIndex = index;
            this.scrollInView();
            if (this.selectOnFocus) {
              this.onOptionSelect(event, this.visibleOptions[index], false);
            }
          }
        },
        scrollInView: function scrollInView() {
          var _this12 = this;
          var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
          var id = index !== -1 ? "".concat(this.id, "_").concat(index) : this.focusedOptionId;
          var element = utils.DomHandler.findSingle(this.list, "li[id=\"".concat(id, "\"]"));
          if (element) {
            element.scrollIntoView && element.scrollIntoView({
              block: 'nearest',
              inline: 'start'
            });
          } else if (!this.virtualScrollerDisabled) {
            setTimeout(function () {
              _this12.virtualScroller && _this12.virtualScroller.scrollToIndex(index !== -1 ? index : _this12.focusedOptionIndex);
            }, 0);
          }
        },
        autoUpdateModel: function autoUpdateModel() {
          if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption) {
            this.focusedOptionIndex = this.findFirstFocusedOptionIndex();
            this.onOptionSelect(null, this.visibleOptions[this.focusedOptionIndex], false);
          }
        },
        updateModel: function updateModel(event, value) {
          this.$emit('update:modelValue', value);
          this.$emit('change', {
            originalEvent: event,
            value: value
          });
        },
        flatOptions: function flatOptions(options) {
          var _this13 = this;
          return (options || []).reduce(function (result, option, index) {
            result.push({
              optionGroup: option,
              group: true,
              index: index
            });
            var optionGroupChildren = _this13.getOptionGroupChildren(option);
            optionGroupChildren && optionGroupChildren.forEach(function (o) {
              return result.push(o);
            });
            return result;
          }, []);
        },
        overlayRef: function overlayRef(el) {
          this.overlay = el;
        },
        listRef: function listRef(el, contentRef) {
          this.list = el;
          contentRef && contentRef(el); // For VirtualScroller
        },
        virtualScrollerRef: function virtualScrollerRef(el) {
          this.virtualScroller = el;
        }
      },
      computed: {
        visibleOptions: function visibleOptions() {
          var _this14 = this;
          var options = this.optionGroupLabel ? this.flatOptions(this.options) : this.options || [];
          if (this.filterValue) {
            var filteredOptions = api.FilterService.filter(options, this.searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
            if (this.optionGroupLabel) {
              var optionGroups = this.options || [];
              var filtered = [];
              optionGroups.forEach(function (group) {
                var groupChildren = _this14.getOptionGroupChildren(group);
                var filteredItems = groupChildren.filter(function (item) {
                  return filteredOptions.includes(item);
                });
                if (filteredItems.length > 0) filtered.push(_objectSpread$1(_objectSpread$1({}, group), {}, _defineProperty$1({}, typeof _this14.optionGroupChildren === 'string' ? _this14.optionGroupChildren : 'items', _toConsumableArray(filteredItems))));
              });
              return this.flatOptions(filtered);
            }
            return filteredOptions;
          }
          return options;
        },
        hasSelectedOption: function hasSelectedOption() {
          return utils.ObjectUtils.isNotEmpty(this.modelValue);
        },
        label: function label() {
          var selectedOptionIndex = this.findSelectedOptionIndex();
          return selectedOptionIndex !== -1 ? this.getOptionLabel(this.visibleOptions[selectedOptionIndex]) : this.placeholder || 'p-emptylabel';
        },
        editableInputValue: function editableInputValue() {
          var selectedOptionIndex = this.findSelectedOptionIndex();
          return selectedOptionIndex !== -1 ? this.getOptionLabel(this.visibleOptions[selectedOptionIndex]) : this.modelValue || '';
        },
        equalityKey: function equalityKey() {
          return this.optionValue || this.dataKey;
        },
        searchFields: function searchFields() {
          return this.filterFields || [this.optionLabel];
        },
        filterResultMessageText: function filterResultMessageText() {
          return utils.ObjectUtils.isNotEmpty(this.visibleOptions) ? this.filterMessageText.replaceAll('{0}', this.visibleOptions.length) : this.emptyFilterMessageText;
        },
        filterMessageText: function filterMessageText() {
          return this.filterMessage || this.$primevue.config.locale.searchMessage || '';
        },
        emptyFilterMessageText: function emptyFilterMessageText() {
          return this.emptyFilterMessage || this.$primevue.config.locale.emptySearchMessage || this.$primevue.config.locale.emptyFilterMessage || '';
        },
        emptyMessageText: function emptyMessageText() {
          return this.emptyMessage || this.$primevue.config.locale.emptyMessage || '';
        },
        selectionMessageText: function selectionMessageText() {
          return this.selectionMessage || this.$primevue.config.locale.selectionMessage || '';
        },
        emptySelectionMessageText: function emptySelectionMessageText() {
          return this.emptySelectionMessage || this.$primevue.config.locale.emptySelectionMessage || '';
        },
        selectedMessageText: function selectedMessageText() {
          return this.hasSelectedOption ? this.selectionMessageText.replaceAll('{0}', '1') : this.emptySelectionMessageText;
        },
        focusedOptionId: function focusedOptionId() {
          return this.focusedOptionIndex !== -1 ? "".concat(this.id, "_").concat(this.focusedOptionIndex) : null;
        },
        ariaSetSize: function ariaSetSize() {
          var _this15 = this;
          return this.visibleOptions.filter(function (option) {
            return !_this15.isOptionGroup(option);
          }).length;
        },
        virtualScrollerDisabled: function virtualScrollerDisabled() {
          return !this.virtualScrollerOptions;
        }
      },
      directives: {
        ripple: Ripple__default["default"]
      },
      components: {
        VirtualScroller: VirtualScroller__default["default"],
        Portal: Portal__default["default"],
        TimesIcon: TimesIcon__default["default"],
        ChevronDownIcon: ChevronDownIcon__default["default"],
        SpinnerIcon: SpinnerIcon__default["default"],
        FilterIcon: FilterIcon__default["default"]
      }
    };

    function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
    function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
    var _hoisted_1 = ["id"];
    var _hoisted_2 = ["id", "value", "placeholder", "tabindex", "disabled", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant"];
    var _hoisted_3 = ["id", "tabindex", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant", "aria-disabled"];
    var _hoisted_4 = ["value", "placeholder", "aria-owns", "aria-activedescendant"];
    var _hoisted_5 = ["id"];
    var _hoisted_6 = ["id"];
    var _hoisted_7 = ["id", "aria-label", "aria-selected", "aria-disabled", "aria-setsize", "aria-posinset", "onClick", "onMousemove", "data-p-highlight", "data-p-focused", "data-p-disabled"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_SpinnerIcon = vue.resolveComponent("SpinnerIcon");
      var _component_VirtualScroller = vue.resolveComponent("VirtualScroller");
      var _component_Portal = vue.resolveComponent("Portal");
      var _directive_ripple = vue.resolveDirective("ripple");
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        ref: "container",
        id: $data.id,
        "class": _ctx.cx('root'),
        onClick: _cache[15] || (_cache[15] = function () {
          return $options.onContainerClick && $options.onContainerClick.apply($options, arguments);
        })
      }, _ctx.ptm('root'), {
        "data-pc-name": "dropdown"
      }), [_ctx.editable ? (vue.openBlock(), vue.createElementBlock("input", vue.mergeProps({
        key: 0,
        ref: "focusInput",
        id: _ctx.inputId,
        type: "text",
        "class": [_ctx.cx('input'), _ctx.inputClass],
        style: _ctx.inputStyle,
        value: $options.editableInputValue,
        placeholder: _ctx.placeholder,
        tabindex: !_ctx.disabled ? _ctx.tabindex : -1,
        disabled: _ctx.disabled,
        autocomplete: "off",
        role: "combobox",
        "aria-label": _ctx.ariaLabel,
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-haspopup": "listbox",
        "aria-expanded": $data.overlayVisible,
        "aria-controls": $data.id + '_list',
        "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
        onFocus: _cache[0] || (_cache[0] = function () {
          return $options.onFocus && $options.onFocus.apply($options, arguments);
        }),
        onBlur: _cache[1] || (_cache[1] = function () {
          return $options.onBlur && $options.onBlur.apply($options, arguments);
        }),
        onKeydown: _cache[2] || (_cache[2] = function () {
          return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
        }),
        onInput: _cache[3] || (_cache[3] = function () {
          return $options.onEditableInput && $options.onEditableInput.apply($options, arguments);
        })
      }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm('input'))), null, 16, _hoisted_2)) : (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
        key: 1,
        ref: "focusInput",
        id: _ctx.inputId,
        "class": [_ctx.cx('input'), _ctx.inputClass],
        style: _ctx.inputStyle,
        tabindex: !_ctx.disabled ? _ctx.tabindex : -1,
        role: "combobox",
        "aria-label": _ctx.ariaLabel || ($options.label === 'p-emptylabel' ? undefined : $options.label),
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-haspopup": "listbox",
        "aria-expanded": $data.overlayVisible,
        "aria-controls": $data.id + '_list',
        "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
        "aria-disabled": _ctx.disabled,
        onFocus: _cache[4] || (_cache[4] = function () {
          return $options.onFocus && $options.onFocus.apply($options, arguments);
        }),
        onBlur: _cache[5] || (_cache[5] = function () {
          return $options.onBlur && $options.onBlur.apply($options, arguments);
        }),
        onKeydown: _cache[6] || (_cache[6] = function () {
          return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
        })
      }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm('input'))), [vue.renderSlot(_ctx.$slots, "value", {
        value: _ctx.modelValue,
        placeholder: _ctx.placeholder
      }, function () {
        return [vue.createTextVNode(vue.toDisplayString($options.label === 'p-emptylabel' ? ' ' : $options.label || 'empty'), 1)];
      })], 16, _hoisted_3)), _ctx.showClear && _ctx.modelValue != null ? vue.renderSlot(_ctx.$slots, "clearicon", {
        key: 2,
        "class": vue.normalizeClass(_ctx.cx('clearIcon')),
        onClick: $options.onClearClick
      }, function () {
        return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.clearIcon ? 'i' : 'TimesIcon'), vue.mergeProps({
          ref: "clearIcon",
          "class": [_ctx.cx('clearIcon'), _ctx.clearIcon],
          onClick: $options.onClearClick
        }, _objectSpread(_objectSpread({}, _ctx.clearIconProps), _ctx.ptm('clearIcon')), {
          "data-pc-section": "clearicon"
        }), null, 16, ["class", "onClick"]))];
      }) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('trigger')
      }, _ctx.ptm('trigger')), [_ctx.loading ? vue.renderSlot(_ctx.$slots, "loadingicon", {
        key: 0,
        "class": vue.normalizeClass(_ctx.cx('loadingIcon'))
      }, function () {
        return [_ctx.loadingIcon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
          key: 0,
          "class": [_ctx.cx('loadingIcon'), 'pi-spin', _ctx.loadingIcon],
          "aria-hidden": "true"
        }, _ctx.ptm('loadingIcon')), null, 16)) : (vue.openBlock(), vue.createBlock(_component_SpinnerIcon, vue.mergeProps({
          key: 1,
          "class": _ctx.cx('loadingIcon'),
          spin: "",
          "aria-hidden": "true"
        }, _ctx.ptm('loadingIcon')), null, 16, ["class"]))];
      }) : vue.renderSlot(_ctx.$slots, "dropdownicon", {
        key: 1,
        "class": vue.normalizeClass(_ctx.cx('dropdownIcon'))
      }, function () {
        return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.dropdownIcon ? 'span' : 'ChevronDownIcon'), vue.mergeProps({
          "class": [_ctx.cx('dropdownIcon'), _ctx.dropdownIcon],
          "aria-hidden": "true"
        }, _ctx.ptm('dropdownIcon')), null, 16, ["class"]))];
      })], 16), vue.createVNode(_component_Portal, {
        appendTo: _ctx.appendTo
      }, {
        "default": vue.withCtx(function () {
          return [vue.createVNode(vue.Transition, vue.mergeProps({
            name: "p-connected-overlay",
            onEnter: $options.onOverlayEnter,
            onAfterEnter: $options.onOverlayAfterEnter,
            onLeave: $options.onOverlayLeave,
            onAfterLeave: $options.onOverlayAfterLeave
          }, _ctx.ptm('transition')), {
            "default": vue.withCtx(function () {
              return [$data.overlayVisible ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 0,
                ref: $options.overlayRef,
                "class": [_ctx.cx('panel'), _ctx.panelClass],
                style: _ctx.panelStyle,
                onClick: _cache[13] || (_cache[13] = function () {
                  return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
                }),
                onKeydown: _cache[14] || (_cache[14] = function () {
                  return $options.onOverlayKeyDown && $options.onOverlayKeyDown.apply($options, arguments);
                })
              }, _objectSpread(_objectSpread({}, _ctx.panelProps), _ctx.ptm('panel'))), [vue.createElementVNode("span", vue.mergeProps({
                ref: "firstHiddenFocusableElementOnOverlay",
                role: "presentation",
                "aria-hidden": "true",
                "class": "p-hidden-accessible p-hidden-focusable",
                tabindex: 0,
                onFocus: _cache[7] || (_cache[7] = function () {
                  return $options.onFirstHiddenFocus && $options.onFirstHiddenFocus.apply($options, arguments);
                })
              }, _ctx.ptm('hiddenFirstFocusableEl'), {
                "data-p-hidden-accessible": true,
                "data-p-hidden-focusable": true
              }), null, 16), vue.renderSlot(_ctx.$slots, "header", {
                value: _ctx.modelValue,
                options: $options.visibleOptions
              }), _ctx.filter ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 0,
                "class": _ctx.cx('header')
              }, _ctx.ptm('header')), [vue.createElementVNode("div", vue.mergeProps({
                "class": _ctx.cx('filterContainer')
              }, _ctx.ptm('filterContainer')), [vue.createElementVNode("input", vue.mergeProps({
                ref: "filterInput",
                type: "text",
                value: $data.filterValue,
                onVnodeMounted: _cache[8] || (_cache[8] = function () {
                  return $options.onFilterUpdated && $options.onFilterUpdated.apply($options, arguments);
                }),
                "class": _ctx.cx('filterInput'),
                placeholder: _ctx.filterPlaceholder,
                role: "searchbox",
                autocomplete: "off",
                "aria-owns": $data.id + '_list',
                "aria-activedescendant": $options.focusedOptionId,
                onKeydown: _cache[9] || (_cache[9] = function () {
                  return $options.onFilterKeyDown && $options.onFilterKeyDown.apply($options, arguments);
                }),
                onBlur: _cache[10] || (_cache[10] = function () {
                  return $options.onFilterBlur && $options.onFilterBlur.apply($options, arguments);
                }),
                onInput: _cache[11] || (_cache[11] = function () {
                  return $options.onFilterChange && $options.onFilterChange.apply($options, arguments);
                })
              }, _objectSpread(_objectSpread({}, _ctx.filterInputProps), _ctx.ptm('filterInput'))), null, 16, _hoisted_4), vue.renderSlot(_ctx.$slots, "filtericon", {
                "class": vue.normalizeClass(_ctx.cx('filterIcon'))
              }, function () {
                return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.filterIcon ? 'span' : 'FilterIcon'), vue.mergeProps({
                  "class": [_ctx.cx('filterIcon'), _ctx.filterIcon]
                }, _ctx.ptm('filterIcon')), null, 16, ["class"]))];
              })], 16), vue.createElementVNode("span", vue.mergeProps({
                role: "status",
                "aria-live": "polite",
                "class": "p-hidden-accessible"
              }, _ctx.ptm('hiddenFilterResult'), {
                "data-p-hidden-accessible": true
              }), vue.toDisplayString($options.filterResultMessageText), 17)], 16)) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.mergeProps({
                "class": _ctx.cx('wrapper'),
                style: {
                  'max-height': $options.virtualScrollerDisabled ? _ctx.scrollHeight : ''
                }
              }, _ctx.ptm('wrapper')), [vue.createVNode(_component_VirtualScroller, vue.mergeProps({
                ref: $options.virtualScrollerRef
              }, _ctx.virtualScrollerOptions, {
                items: $options.visibleOptions,
                style: {
                  height: _ctx.scrollHeight
                },
                tabindex: -1,
                disabled: $options.virtualScrollerDisabled,
                pt: _ctx.ptm('virtualScroller')
              }), vue.createSlots({
                content: vue.withCtx(function (_ref) {
                  var styleClass = _ref.styleClass,
                    contentRef = _ref.contentRef,
                    items = _ref.items,
                    getItemOptions = _ref.getItemOptions,
                    contentStyle = _ref.contentStyle,
                    itemSize = _ref.itemSize;
                  return [vue.createElementVNode("ul", vue.mergeProps({
                    ref: function ref(el) {
                      return $options.listRef(el, contentRef);
                    },
                    id: $data.id + '_list',
                    "class": [_ctx.cx('list'), styleClass],
                    style: contentStyle,
                    role: "listbox"
                  }, _ctx.ptm('list')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(items, function (option, i) {
                    return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                      key: $options.getOptionRenderKey(option, $options.getOptionIndex(i, getItemOptions))
                    }, [$options.isOptionGroup(option) ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
                      key: 0,
                      id: $data.id + '_' + $options.getOptionIndex(i, getItemOptions),
                      style: {
                        height: itemSize ? itemSize + 'px' : undefined
                      },
                      "class": _ctx.cx('itemGroup'),
                      role: "option"
                    }, _ctx.ptm('itemGroup')), [vue.renderSlot(_ctx.$slots, "optiongroup", {
                      option: option.optionGroup,
                      index: $options.getOptionIndex(i, getItemOptions)
                    }, function () {
                      return [vue.createTextVNode(vue.toDisplayString($options.getOptionGroupLabel(option.optionGroup)), 1)];
                    })], 16, _hoisted_6)) : vue.withDirectives((vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
                      key: 1,
                      id: $data.id + '_' + $options.getOptionIndex(i, getItemOptions),
                      "class": _ctx.cx('item', {
                        option: option,
                        focusedOption: $options.getOptionIndex(i, getItemOptions)
                      }),
                      style: {
                        height: itemSize ? itemSize + 'px' : undefined
                      },
                      role: "option",
                      "aria-label": $options.getOptionLabel(option),
                      "aria-selected": $options.isSelected(option),
                      "aria-disabled": $options.isOptionDisabled(option),
                      "aria-setsize": $options.ariaSetSize,
                      "aria-posinset": $options.getAriaPosInset($options.getOptionIndex(i, getItemOptions)),
                      onClick: function onClick($event) {
                        return $options.onOptionSelect($event, option);
                      },
                      onMousemove: function onMousemove($event) {
                        return $options.onOptionMouseMove($event, $options.getOptionIndex(i, getItemOptions));
                      },
                      "data-p-highlight": $options.isSelected(option),
                      "data-p-focused": $data.focusedOptionIndex === $options.getOptionIndex(i, getItemOptions),
                      "data-p-disabled": $options.isOptionDisabled(option)
                    }, $options.getPTOptions(option, getItemOptions, i, 'item')), [vue.renderSlot(_ctx.$slots, "option", {
                      option: option,
                      index: $options.getOptionIndex(i, getItemOptions)
                    }, function () {
                      return [vue.createTextVNode(vue.toDisplayString($options.getOptionLabel(option)), 1)];
                    })], 16, _hoisted_7)), [[_directive_ripple]])], 64);
                  }), 128)), $data.filterValue && (!items || items && items.length === 0) ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
                    key: 0,
                    "class": _ctx.cx('emptyMessage'),
                    role: "option"
                  }, _ctx.ptm('emptyMessage'), {
                    "data-p-hidden-accessible": true
                  }), [vue.renderSlot(_ctx.$slots, "emptyfilter", {}, function () {
                    return [vue.createTextVNode(vue.toDisplayString($options.emptyFilterMessageText), 1)];
                  })], 16)) : !_ctx.options || _ctx.options && _ctx.options.length === 0 ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
                    key: 1,
                    "class": _ctx.cx('emptyMessage'),
                    role: "option"
                  }, _ctx.ptm('emptyMessage'), {
                    "data-p-hidden-accessible": true
                  }), [vue.renderSlot(_ctx.$slots, "empty", {}, function () {
                    return [vue.createTextVNode(vue.toDisplayString($options.emptyMessageText), 1)];
                  })], 16)) : vue.createCommentVNode("", true)], 16, _hoisted_5)];
                }),
                _: 2
              }, [_ctx.$slots.loader ? {
                name: "loader",
                fn: vue.withCtx(function (_ref2) {
                  var options = _ref2.options;
                  return [vue.renderSlot(_ctx.$slots, "loader", {
                    options: options
                  })];
                }),
                key: "0"
              } : undefined]), 1040, ["items", "style", "disabled", "pt"])], 16), vue.renderSlot(_ctx.$slots, "footer", {
                value: _ctx.modelValue,
                options: $options.visibleOptions
              }), !_ctx.options || _ctx.options && _ctx.options.length === 0 ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
                key: 1,
                role: "status",
                "aria-live": "polite",
                "class": "p-hidden-accessible"
              }, _ctx.ptm('hiddenEmptyMessage'), {
                "data-p-hidden-accessible": true
              }), vue.toDisplayString($options.emptyMessageText), 17)) : vue.createCommentVNode("", true), vue.createElementVNode("span", vue.mergeProps({
                role: "status",
                "aria-live": "polite",
                "class": "p-hidden-accessible"
              }, _ctx.ptm('hiddenSelectedMessage'), {
                "data-p-hidden-accessible": true
              }), vue.toDisplayString($options.selectedMessageText), 17), vue.createElementVNode("span", vue.mergeProps({
                ref: "lastHiddenFocusableElementOnOverlay",
                role: "presentation",
                "aria-hidden": "true",
                "class": "p-hidden-accessible p-hidden-focusable",
                tabindex: 0,
                onFocus: _cache[12] || (_cache[12] = function () {
                  return $options.onLastHiddenFocus && $options.onLastHiddenFocus.apply($options, arguments);
                })
              }, _ctx.ptm('hiddenLastFocusableEl'), {
                "data-p-hidden-accessible": true,
                "data-p-hidden-focusable": true
              }), null, 16)], 16)) : vue.createCommentVNode("", true)];
            }),
            _: 3
          }, 16, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])];
        }),
        _: 3
      }, 8, ["appendTo"])], 16, _hoisted_1);
    }

    script.render = render;

    return script;

})(primevue.api, primevue.icons.chevrondown, primevue.icons.filter, primevue.icons.spinner, primevue.icons.times, primevue.overlayeventbus, primevue.portal, primevue.ripple, primevue.utils, primevue.virtualscroller, primevue.basecomponent, primevue.usestyle, Vue);