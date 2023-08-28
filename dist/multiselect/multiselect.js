this.primevue = this.primevue || {};
this.primevue.multiselect = (function (api, CheckIcon, ChevronDownIcon, SearchIcon, SpinnerIcon, TimesIcon, TimesCircleIcon, OverlayEventBus, Portal, Ripple, utils, VirtualScroller, BaseComponent, usestyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var CheckIcon__default = /*#__PURE__*/_interopDefaultLegacy(CheckIcon);
    var ChevronDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronDownIcon);
    var SearchIcon__default = /*#__PURE__*/_interopDefaultLegacy(SearchIcon);
    var SpinnerIcon__default = /*#__PURE__*/_interopDefaultLegacy(SpinnerIcon);
    var TimesIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesIcon);
    var TimesCircleIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesCircleIcon);
    var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
    var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var VirtualScroller__default = /*#__PURE__*/_interopDefaultLegacy(VirtualScroller);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var styles = "\n.p-multiselect {\n    display: inline-flex;\n    cursor: pointer;\n    user-select: none;\n}\n\n.p-multiselect-trigger {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n}\n\n.p-multiselect-label-container {\n    overflow: hidden;\n    flex: 1 1 auto;\n    cursor: pointer;\n}\n\n.p-multiselect-label {\n    display: block;\n    white-space: nowrap;\n    cursor: pointer;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.p-multiselect-label-empty {\n    overflow: hidden;\n    visibility: hidden;\n}\n\n.p-multiselect-token {\n    cursor: default;\n    display: inline-flex;\n    align-items: center;\n    flex: 0 0 auto;\n}\n\n.p-multiselect-token-icon {\n    cursor: pointer;\n}\n\n.p-multiselect .p-multiselect-panel {\n    min-width: 100%;\n}\n\n.p-multiselect-items-wrapper {\n    overflow: auto;\n}\n\n.p-multiselect-items {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n}\n\n.p-multiselect-item {\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    font-weight: normal;\n    white-space: nowrap;\n    position: relative;\n    overflow: hidden;\n}\n\n.p-multiselect-item-group {\n    cursor: auto;\n}\n\n.p-multiselect-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n}\n\n.p-multiselect-filter-container {\n    position: relative;\n    flex: 1 1 auto;\n}\n\n.p-multiselect-filter-icon {\n    position: absolute;\n    top: 50%;\n    margin-top: -0.5rem;\n}\n\n.p-multiselect-filter-container .p-inputtext {\n    width: 100%;\n}\n\n.p-multiselect-close {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    overflow: hidden;\n    position: relative;\n    margin-left: auto;\n}\n\n.p-fluid .p-multiselect {\n    display: flex;\n}\n";
    var inlineStyles = {
      root: function root(_ref) {
        var props = _ref.props;
        return {
          position: props.appendTo === 'self' ? 'relative' : undefined
        };
      }
    };
    var classes = {
      root: function root(_ref2) {
        var instance = _ref2.instance,
          props = _ref2.props;
        return ['p-multiselect p-component p-inputwrapper', {
          'p-multiselect-chip': props.display === 'chip',
          'p-disabled': props.disabled,
          'p-focus': instance.focused,
          'p-inputwrapper-filled': props.modelValue && props.modelValue.length,
          'p-inputwrapper-focus': instance.focused || instance.overlayVisible,
          'p-overlay-open': instance.overlayVisible
        }];
      },
      labelContainer: 'p-multiselect-label-container',
      label: function label(_ref3) {
        var instance = _ref3.instance,
          props = _ref3.props;
        return ['p-multiselect-label', {
          'p-placeholder': instance.label === props.placeholder,
          'p-multiselect-label-empty': !props.placeholder && (!props.modelValue || props.modelValue.length === 0)
        }];
      },
      token: 'p-multiselect-token',
      tokenLabel: 'p-multiselect-token-label',
      removeTokenIcon: 'p-multiselect-token-icon',
      trigger: 'p-multiselect-trigger',
      loadingIcon: 'p-multiselect-trigger-icon',
      dropdownIcon: 'p-multiselect-trigger-icon',
      panel: function panel(_ref4) {
        var instance = _ref4.instance;
        return ['p-multiselect-panel p-component', {
          'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
          'p-ripple-disabled': instance.$primevue.config.ripple === false
        }];
      },
      header: 'p-multiselect-header',
      headerCheckboxContainer: function headerCheckboxContainer(_ref5) {
        var instance = _ref5.instance;
        return ['p-checkbox p-component', {
          'p-checkbox-checked': instance.allSelected,
          'p-checkbox-focused': instance.headerCheckboxFocused
        }];
      },
      headerCheckbox: function headerCheckbox(_ref6) {
        var instance = _ref6.instance;
        return ['p-checkbox-box', {
          'p-highlight': instance.allSelected,
          'p-focus': instance.headerCheckboxFocused
        }];
      },
      headerCheckboxIcon: 'p-checkbox-icon',
      filterContainer: 'p-multiselect-filter-container',
      filterInput: 'p-multiselect-filter p-inputtext p-component',
      filterIcon: 'p-multiselect-filter-icon',
      closeButton: 'p-multiselect-close p-link',
      closeIcon: 'p-multiselect-close-icon',
      wrapper: 'p-multiselect-items-wrapper',
      list: 'p-multiselect-items p-component',
      itemGroup: 'p-multiselect-item-group',
      item: function item(_ref7) {
        var instance = _ref7.instance,
          option = _ref7.option,
          index = _ref7.index,
          getItemOptions = _ref7.getItemOptions;
        return ['p-multiselect-item', {
          'p-highlight': instance.isSelected(option),
          'p-focus': instance.focusedOptionIndex === instance.getOptionIndex(index, getItemOptions),
          'p-disabled': instance.isOptionDisabled(option)
        }];
      },
      checkboxContainer: 'p-checkbox p-component',
      checkbox: function checkbox(_ref8) {
        var instance = _ref8.instance,
          option = _ref8.option;
        return ['p-checkbox-box', {
          'p-highlight': instance.isSelected(option)
        }];
      },
      checkboxIcon: 'p-checkbox-icon',
      emptyMessage: 'p-multiselect-empty-message'
    };
    var _useStyle = usestyle.useStyle(styles, {
        name: 'multiselect',
        manual: true
      }),
      loadStyle = _useStyle.load;
    var script$1 = {
      name: 'BaseMultiSelect',
      "extends": BaseComponent__default["default"],
      props: {
        modelValue: null,
        options: Array,
        optionLabel: null,
        optionValue: null,
        optionDisabled: null,
        optionGroupLabel: null,
        optionGroupChildren: null,
        scrollHeight: {
          type: String,
          "default": '200px'
        },
        placeholder: String,
        disabled: Boolean,
        inputId: {
          type: String,
          "default": null
        },
        inputProps: {
          type: null,
          "default": null
        },
        panelClass: {
          type: String,
          "default": null
        },
        panelStyle: {
          type: null,
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
        closeButtonProps: {
          type: null,
          "default": null
        },
        dataKey: null,
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
        appendTo: {
          type: String,
          "default": 'body'
        },
        display: {
          type: String,
          "default": 'comma'
        },
        selectedItemsLabel: {
          type: String,
          "default": '{0} items selected'
        },
        maxSelectedLabels: {
          type: Number,
          "default": null
        },
        selectionLimit: {
          type: Number,
          "default": null
        },
        showToggleAll: {
          type: Boolean,
          "default": true
        },
        loading: {
          type: Boolean,
          "default": false
        },
        checkboxIcon: {
          type: String,
          "default": undefined
        },
        closeIcon: {
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
        removeTokenIcon: {
          type: String,
          "default": undefined
        },
        selectAll: {
          type: Boolean,
          "default": null
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
        inlineStyles: inlineStyles,
        loadStyle: loadStyle
      },
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
    function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
    function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
    function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
    function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
    function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
    function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
    var script = {
      name: 'MultiSelect',
      "extends": script$1,
      emits: ['update:modelValue', 'change', 'focus', 'blur', 'before-show', 'before-hide', 'show', 'hide', 'filter', 'selectall-change'],
      outsideClickListener: null,
      scrollHandler: null,
      resizeListener: null,
      overlay: null,
      list: null,
      virtualScroller: null,
      startRangeIndex: -1,
      searchTimeout: null,
      searchValue: '',
      selectOnFocus: false,
      focusOnHover: false,
      data: function data() {
        return {
          id: this.$attrs.id,
          focused: false,
          focusedOptionIndex: -1,
          headerCheckboxFocused: false,
          filterValue: null,
          overlayVisible: false
        };
      },
      watch: {
        '$attrs.id': function $attrsId(newValue) {
          this.id = newValue || utils.UniqueComponentId();
        },
        options: function options() {
          this.autoUpdateModel();
        }
      },
      mounted: function mounted() {
        this.id = this.id || utils.UniqueComponentId();
        this.autoUpdateModel();
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
        getOptionRenderKey: function getOptionRenderKey(option) {
          return this.dataKey ? utils.ObjectUtils.resolveFieldData(option, this.dataKey) : this.getOptionLabel(option);
        },
        getHeaderCheckboxPTOptions: function getHeaderCheckboxPTOptions(key) {
          return this.ptm(key, {
            context: {
              selected: this.allSelected,
              focused: this.headerCheckboxFocused
            }
          });
        },
        getCheckboxPTOptions: function getCheckboxPTOptions(option, itemOptions, index, key) {
          return this.ptm(key, {
            context: {
              selected: this.isSelected(option),
              focused: this.focusedOptionIndex === this.getOptionIndex(index, itemOptions),
              disabled: this.isOptionDisabled(option)
            }
          });
        },
        isOptionDisabled: function isOptionDisabled(option) {
          if (this.maxSelectionLimitReached && !this.isSelected(option)) {
            return true;
          }
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
          var _this3 = this;
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
              this.onArrowUpKey(event);
              break;
            case 'Home':
              this.onHomeKey(event);
              break;
            case 'End':
              this.onEndKey(event);
              break;
            case 'PageDown':
              this.onPageDownKey(event);
              break;
            case 'PageUp':
              this.onPageUpKey(event);
              break;
            case 'Enter':
            case 'Space':
              this.onEnterKey(event);
              break;
            case 'Escape':
              this.onEscapeKey(event);
              break;
            case 'Tab':
              this.onTabKey(event);
              break;
            case 'ShiftLeft':
            case 'ShiftRight':
              this.onShiftKey(event);
              break;
            default:
              if (event.code === 'KeyA' && metaKey) {
                var value = this.visibleOptions.filter(function (option) {
                  return _this3.isValidOption(option);
                }).map(function (option) {
                  return _this3.getOptionValue(option);
                });
                this.updateModel(event, value);
                event.preventDefault();
                break;
              }
              if (!metaKey && utils.ObjectUtils.isPrintableCharacter(event.key)) {
                !this.overlayVisible && this.show();
                this.searchOptions(event);
                event.preventDefault();
              }
              break;
          }
        },
        onContainerClick: function onContainerClick(event) {
          if (this.disabled || this.loading) {
            return;
          }
          if (!this.overlay || !this.overlay.contains(event.target)) {
            this.overlayVisible ? this.hide(true) : this.show(true);
          }
        },
        onFirstHiddenFocus: function onFirstHiddenFocus(event) {
          var focusableEl = event.relatedTarget === this.$refs.focusInput ? utils.DomHandler.getFirstFocusableElement(this.overlay, ':not([data-p-hidden-focusable="true"])') : this.$refs.focusInput;
          utils.DomHandler.focus(focusableEl);
        },
        onLastHiddenFocus: function onLastHiddenFocus(event) {
          var focusableEl = event.relatedTarget === this.$refs.focusInput ? utils.DomHandler.getLastFocusableElement(this.overlay, ':not([data-p-hidden-focusable="true"])') : this.$refs.focusInput;
          utils.DomHandler.focus(focusableEl);
        },
        onCloseClick: function onCloseClick() {
          this.hide(true);
        },
        onHeaderCheckboxFocus: function onHeaderCheckboxFocus() {
          this.headerCheckboxFocused = true;
        },
        onHeaderCheckboxBlur: function onHeaderCheckboxBlur() {
          this.headerCheckboxFocused = false;
        },
        onOptionSelect: function onOptionSelect(event, option) {
          var _this4 = this;
          var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
          var isFocus = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
          if (this.disabled || this.isOptionDisabled(option)) {
            return;
          }
          var selected = this.isSelected(option);
          var value = null;
          if (selected) value = this.modelValue.filter(function (val) {
            return _this4.getOptionValue(val) !== _this4.getOptionValue(option);
          });else value = [].concat(_toConsumableArray(this.modelValue || []), [option]);
          this.updateModel(event, value);
          index !== -1 && (this.focusedOptionIndex = index);
          isFocus && utils.DomHandler.focus(this.$refs.focusInput);
        },
        onOptionMouseMove: function onOptionMouseMove(event, index) {
          if (this.focusOnHover) {
            this.changeFocusedOptionIndex(event, index);
          }
        },
        onOptionSelectRange: function onOptionSelectRange(event) {
          var _this5 = this;
          var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
          var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
          start === -1 && (start = this.findNearestSelectedOptionIndex(end, true));
          end === -1 && (end = this.findNearestSelectedOptionIndex(start));
          if (start !== -1 && end !== -1) {
            var rangeStart = Math.min(start, end);
            var rangeEnd = Math.max(start, end);
            var value = this.visibleOptions.slice(rangeStart, rangeEnd + 1).filter(function (option) {
              return _this5.isValidOption(option);
            }).map(function (option) {
              return _this5.getOptionValue(option);
            });
            this.updateModel(event, value);
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
        onArrowDownKey: function onArrowDownKey(event) {
          var optionIndex = this.focusedOptionIndex !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex) : this.findFirstFocusedOptionIndex();
          if (event.shiftKey) {
            this.onOptionSelectRange(event, this.startRangeIndex, optionIndex);
          }
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
            if (event.shiftKey) {
              this.onOptionSelectRange(event, optionIndex, this.startRangeIndex);
            }
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
          var currentTarget = event.currentTarget;
          if (pressedInInputText) {
            var len = currentTarget.value.length;
            currentTarget.setSelectionRange(0, event.shiftKey ? len : 0);
            this.focusedOptionIndex = -1;
          } else {
            var metaKey = event.metaKey || event.ctrlKey;
            var optionIndex = this.findFirstOptionIndex();
            if (event.shiftKey && metaKey) {
              this.onOptionSelectRange(event, optionIndex, this.startRangeIndex);
            }
            this.changeFocusedOptionIndex(event, optionIndex);
            !this.overlayVisible && this.show();
          }
          event.preventDefault();
        },
        onEndKey: function onEndKey(event) {
          var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var currentTarget = event.currentTarget;
          if (pressedInInputText) {
            var len = currentTarget.value.length;
            currentTarget.setSelectionRange(event.shiftKey ? 0 : len, len);
            this.focusedOptionIndex = -1;
          } else {
            var metaKey = event.metaKey || event.ctrlKey;
            var optionIndex = this.findLastOptionIndex();
            if (event.shiftKey && metaKey) {
              this.onOptionSelectRange(event, this.startRangeIndex, optionIndex);
            }
            this.changeFocusedOptionIndex(event, optionIndex);
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
              if (event.shiftKey) this.onOptionSelectRange(event, this.focusedOptionIndex);else this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
            }
          }
          event.preventDefault();
        },
        onEscapeKey: function onEscapeKey(event) {
          this.overlayVisible && this.hide(true);
          event.preventDefault();
        },
        onTabKey: function onTabKey(event) {
          var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          if (!pressedInInputText) {
            if (this.overlayVisible && this.hasFocusableElements()) {
              utils.DomHandler.focus(event.shiftKey ? this.$refs.lastHiddenFocusableElementOnOverlay : this.$refs.firstHiddenFocusableElementOnOverlay);
              event.preventDefault();
            } else {
              if (this.focusedOptionIndex !== -1) {
                this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
              }
              this.overlayVisible && this.hide(this.filter);
            }
          }
        },
        onShiftKey: function onShiftKey() {
          this.startRangeIndex = this.focusedOptionIndex;
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
          var _this6 = this;
          if (!this.outsideClickListener) {
            this.outsideClickListener = function (event) {
              if (_this6.overlayVisible && _this6.isOutsideClicked(event)) {
                _this6.hide();
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
          var _this7 = this;
          if (!this.scrollHandler) {
            this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.$refs.container, function () {
              if (_this7.overlayVisible) {
                _this7.hide();
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
          var _this8 = this;
          if (!this.resizeListener) {
            this.resizeListener = function () {
              if (_this8.overlayVisible && !utils.DomHandler.isTouchDevice()) {
                _this8.hide();
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
        isOutsideClicked: function isOutsideClicked(event) {
          return !(this.$el.isSameNode(event.target) || this.$el.contains(event.target) || this.overlay && this.overlay.contains(event.target));
        },
        getLabelByValue: function getLabelByValue(value) {
          var _this9 = this;
          var options = this.optionGroupLabel ? this.flatOptions(this.options) : this.options || [];
          var matchedOption = options.find(function (option) {
            return !_this9.isOptionGroup(option) && _this9.getOptionValue(option) === _this9.getOptionValue(value);
          });
          return matchedOption ? this.getOptionLabel(matchedOption) : null;
        },
        getSelectedItemsLabel: function getSelectedItemsLabel() {
          var pattern = /{(.*?)}/;
          if (pattern.test(this.selectedItemsLabel)) {
            return this.selectedItemsLabel.replace(this.selectedItemsLabel.match(pattern)[0], this.modelValue.length + '');
          }
          return this.selectedItemsLabel;
        },
        onToggleAll: function onToggleAll(event) {
          var _this10 = this;
          if (this.selectAll !== null) {
            this.$emit('selectall-change', {
              originalEvent: event,
              checked: !this.allSelected
            });
          } else {
            var value = this.allSelected ? [] : this.visibleOptions.filter(function (option) {
              return _this10.isValidOption(option);
            });
            this.updateModel(event, value);
          }
          this.headerCheckboxFocused = true;
        },
        removeOption: function removeOption(event, optionValue) {
          var _this11 = this;
          var value = this.modelValue.filter(function (val) {
            return !utils.ObjectUtils.equals(val, optionValue, _this11.equalityKey);
          });
          this.updateModel(event, value);
        },
        clearFilter: function clearFilter() {
          this.filterValue = null;
        },
        hasFocusableElements: function hasFocusableElements() {
          return utils.DomHandler.getFocusableElements(this.overlay, ':not([data-p-hidden-focusable="true"])').length > 0;
        },
        isOptionMatched: function isOptionMatched(option) {
          return this.isValidOption(option) && this.getOptionLabel(option).toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale));
        },
        isValidOption: function isValidOption(option) {
          return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
        },
        isValidSelectedOption: function isValidSelectedOption(option) {
          return this.isValidOption(option) && this.isSelected(option);
        },
        isSelected: function isSelected(option) {
          var _this12 = this;
          var optionValue = this.getOptionValue(option);
          return (this.modelValue || []).some(function (value) {
            return _this12.getOptionValue(value) === optionValue;
          });
        },
        findFirstOptionIndex: function findFirstOptionIndex() {
          var _this13 = this;
          return this.visibleOptions.findIndex(function (option) {
            return _this13.isValidOption(option);
          });
        },
        findLastOptionIndex: function findLastOptionIndex() {
          var _this14 = this;
          return utils.ObjectUtils.findLastIndex(this.visibleOptions, function (option) {
            return _this14.isValidOption(option);
          });
        },
        findNextOptionIndex: function findNextOptionIndex(index) {
          var _this15 = this;
          var matchedOptionIndex = index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex(function (option) {
            return _this15.isValidOption(option);
          }) : -1;
          return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
        },
        findPrevOptionIndex: function findPrevOptionIndex(index) {
          var _this16 = this;
          var matchedOptionIndex = index > 0 ? utils.ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), function (option) {
            return _this16.isValidOption(option);
          }) : -1;
          return matchedOptionIndex > -1 ? matchedOptionIndex : index;
        },
        findFirstSelectedOptionIndex: function findFirstSelectedOptionIndex() {
          var _this17 = this;
          return this.hasSelectedOption ? this.visibleOptions.findIndex(function (option) {
            return _this17.isValidSelectedOption(option);
          }) : -1;
        },
        findLastSelectedOptionIndex: function findLastSelectedOptionIndex() {
          var _this18 = this;
          return this.hasSelectedOption ? utils.ObjectUtils.findLastIndex(this.visibleOptions, function (option) {
            return _this18.isValidSelectedOption(option);
          }) : -1;
        },
        findNextSelectedOptionIndex: function findNextSelectedOptionIndex(index) {
          var _this19 = this;
          var matchedOptionIndex = this.hasSelectedOption && index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex(function (option) {
            return _this19.isValidSelectedOption(option);
          }) : -1;
          return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : -1;
        },
        findPrevSelectedOptionIndex: function findPrevSelectedOptionIndex(index) {
          var _this20 = this;
          var matchedOptionIndex = this.hasSelectedOption && index > 0 ? utils.ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), function (option) {
            return _this20.isValidSelectedOption(option);
          }) : -1;
          return matchedOptionIndex > -1 ? matchedOptionIndex : -1;
        },
        findNearestSelectedOptionIndex: function findNearestSelectedOptionIndex(index) {
          var firstCheckUp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var matchedOptionIndex = -1;
          if (this.hasSelectedOption) {
            if (firstCheckUp) {
              matchedOptionIndex = this.findPrevSelectedOptionIndex(index);
              matchedOptionIndex = matchedOptionIndex === -1 ? this.findNextSelectedOptionIndex(index) : matchedOptionIndex;
            } else {
              matchedOptionIndex = this.findNextSelectedOptionIndex(index);
              matchedOptionIndex = matchedOptionIndex === -1 ? this.findPrevSelectedOptionIndex(index) : matchedOptionIndex;
            }
          }
          return matchedOptionIndex > -1 ? matchedOptionIndex : index;
        },
        findFirstFocusedOptionIndex: function findFirstFocusedOptionIndex() {
          var selectedIndex = this.findFirstSelectedOptionIndex();
          return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
        },
        findLastFocusedOptionIndex: function findLastFocusedOptionIndex() {
          var selectedIndex = this.findLastSelectedOptionIndex();
          return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
        },
        searchOptions: function searchOptions(event) {
          var _this21 = this;
          this.searchValue = (this.searchValue || '') + event.key;
          var optionIndex = -1;
          if (this.focusedOptionIndex !== -1) {
            optionIndex = this.visibleOptions.slice(this.focusedOptionIndex).findIndex(function (option) {
              return _this21.isOptionMatched(option);
            });
            optionIndex = optionIndex === -1 ? this.visibleOptions.slice(0, this.focusedOptionIndex).findIndex(function (option) {
              return _this21.isOptionMatched(option);
            }) : optionIndex + this.focusedOptionIndex;
          } else {
            optionIndex = this.visibleOptions.findIndex(function (option) {
              return _this21.isOptionMatched(option);
            });
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
            _this21.searchValue = '';
            _this21.searchTimeout = null;
          }, 500);
        },
        changeFocusedOptionIndex: function changeFocusedOptionIndex(event, index) {
          if (this.focusedOptionIndex !== index) {
            this.focusedOptionIndex = index;
            this.scrollInView();
          }
        },
        scrollInView: function scrollInView() {
          var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
          var id = index !== -1 ? "".concat(this.id, "_").concat(index) : this.focusedOptionId;
          var element = utils.DomHandler.findSingle(this.list, "li[id=\"".concat(id, "\"]"));
          if (element) {
            element.scrollIntoView && element.scrollIntoView({
              block: 'nearest',
              inline: 'nearest'
            });
          } else if (!this.virtualScrollerDisabled) {
            this.virtualScroller && this.virtualScroller.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex);
          }
        },
        autoUpdateModel: function autoUpdateModel() {
          if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption) {
            this.focusedOptionIndex = this.findFirstFocusedOptionIndex();
            var value = this.getOptionValue(this.visibleOptions[this.focusedOptionIndex]);
            this.updateModel(null, [value]);
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
          var _this22 = this;
          return (options || []).reduce(function (result, option, index) {
            result.push({
              optionGroup: option,
              group: true,
              index: index
            });
            var optionGroupChildren = _this22.getOptionGroupChildren(option);
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
          var _this23 = this;
          var options = this.optionGroupLabel ? this.flatOptions(this.options) : this.options || [];
          if (this.filterValue) {
            var filteredOptions = api.FilterService.filter(options, this.searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
            if (this.optionGroupLabel) {
              var optionGroups = this.options || [];
              var filtered = [];
              optionGroups.forEach(function (group) {
                var groupChildren = _this23.getOptionGroupChildren(group);
                var filteredItems = groupChildren.filter(function (item) {
                  return filteredOptions.includes(item);
                });
                if (filteredItems.length > 0) filtered.push(_objectSpread$1(_objectSpread$1({}, group), {}, _defineProperty$1({}, typeof _this23.optionGroupChildren === 'string' ? _this23.optionGroupChildren : 'items', _toConsumableArray(filteredItems))));
              });
              return this.flatOptions(filtered);
            }
            return filteredOptions;
          }
          return options;
        },
        label: function label() {
          var _this$modelValue;
          // TODO: Refactor
          var label;
          if ((_this$modelValue = this.modelValue) !== null && _this$modelValue !== void 0 && _this$modelValue.length) {
            if (utils.ObjectUtils.isNotEmpty(this.maxSelectedLabels) && this.modelValue.length > this.maxSelectedLabels) {
              return this.getSelectedItemsLabel();
            } else {
              label = '';
              for (var i = 0; i < this.modelValue.length; i++) {
                if (i !== 0) {
                  label += ', ';
                }
                label += this.getLabelByValue(this.modelValue[i]);
              }
            }
          } else {
            label = this.placeholder;
          }
          return label;
        },
        chipSelectedItems: function chipSelectedItems() {
          return utils.ObjectUtils.isNotEmpty(this.maxSelectedLabels) && this.modelValue && this.modelValue.length > this.maxSelectedLabels ? this.modelValue.slice(0, this.maxSelectedLabels) : this.modelValue;
        },
        allSelected: function allSelected() {
          var _this24 = this;
          return this.selectAll !== null ? this.selectAll : utils.ObjectUtils.isNotEmpty(this.visibleOptions) && this.visibleOptions.every(function (option) {
            return _this24.isOptionGroup(option) || _this24.isOptionDisabled(option) || _this24.isSelected(option);
          });
        },
        hasSelectedOption: function hasSelectedOption() {
          return utils.ObjectUtils.isNotEmpty(this.modelValue);
        },
        equalityKey: function equalityKey() {
          return this.optionValue || this.dataKey;
        },
        searchFields: function searchFields() {
          return this.filterFields || [this.optionLabel];
        },
        maxSelectionLimitReached: function maxSelectionLimitReached() {
          return this.selectionLimit && this.modelValue && this.modelValue.length === this.selectionLimit;
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
          return this.hasSelectedOption ? this.selectionMessageText.replaceAll('{0}', this.modelValue.length) : this.emptySelectionMessageText;
        },
        focusedOptionId: function focusedOptionId() {
          return this.focusedOptionIndex !== -1 ? "".concat(this.id, "_").concat(this.focusedOptionIndex) : null;
        },
        ariaSetSize: function ariaSetSize() {
          var _this25 = this;
          return this.visibleOptions.filter(function (option) {
            return !_this25.isOptionGroup(option);
          }).length;
        },
        toggleAllAriaLabel: function toggleAllAriaLabel() {
          return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria[this.allSelected ? 'selectAll' : 'unselectAll'] : undefined;
        },
        closeAriaLabel: function closeAriaLabel() {
          return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
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
        SearchIcon: SearchIcon__default["default"],
        TimesCircleIcon: TimesCircleIcon__default["default"],
        ChevronDownIcon: ChevronDownIcon__default["default"],
        SpinnerIcon: SpinnerIcon__default["default"],
        CheckIcon: CheckIcon__default["default"]
      }
    };

    function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
    function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
    var _hoisted_1 = ["id", "disabled", "placeholder", "tabindex", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant"];
    var _hoisted_2 = ["onClick"];
    var _hoisted_3 = ["checked", "aria-label"];
    var _hoisted_4 = ["value", "placeholder", "aria-owns", "aria-activedescendant"];
    var _hoisted_5 = ["aria-label"];
    var _hoisted_6 = ["id"];
    var _hoisted_7 = ["id"];
    var _hoisted_8 = ["id", "aria-label", "aria-selected", "aria-disabled", "aria-setsize", "aria-posinset", "onClick", "onMousemove", "data-p-highlight", "data-p-focused", "data-p-disabled"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_TimesCircleIcon = vue.resolveComponent("TimesCircleIcon");
      var _component_SpinnerIcon = vue.resolveComponent("SpinnerIcon");
      var _component_VirtualScroller = vue.resolveComponent("VirtualScroller");
      var _component_Portal = vue.resolveComponent("Portal");
      var _directive_ripple = vue.resolveDirective("ripple");
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        ref: "container",
        "class": _ctx.cx('root'),
        onClick: _cache[15] || (_cache[15] = function () {
          return $options.onContainerClick && $options.onContainerClick.apply($options, arguments);
        })
      }, _ctx.ptm('root'), {
        "data-pc-name": "multiselect"
      }), [vue.createElementVNode("div", vue.mergeProps({
        "class": "p-hidden-accessible"
      }, _ctx.ptm('hiddenInputWrapper'), {
        "data-p-hidden-accessible": true
      }), [vue.createElementVNode("input", vue.mergeProps({
        ref: "focusInput",
        id: _ctx.inputId,
        type: "text",
        readonly: "",
        disabled: _ctx.disabled,
        placeholder: _ctx.placeholder,
        tabindex: !_ctx.disabled ? _ctx.tabindex : -1,
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
        })
      }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm('hiddenInput'))), null, 16, _hoisted_1)], 16), vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('labelContainer')
      }, _ctx.ptm('labelContainer')), [vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('label')
      }, _ctx.ptm('label')), [vue.renderSlot(_ctx.$slots, "value", {
        value: _ctx.modelValue,
        placeholder: _ctx.placeholder
      }, function () {
        return [_ctx.display === 'comma' ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
          key: 0
        }, [vue.createTextVNode(vue.toDisplayString($options.label || 'empty'), 1)], 64)) : _ctx.display === 'chip' ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
          key: 1
        }, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.chipSelectedItems, function (item) {
          return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: $options.getLabelByValue(item),
            "class": _ctx.cx('token')
          }, _ctx.ptm('token')), [vue.renderSlot(_ctx.$slots, "chip", {
            value: item
          }, function () {
            return [vue.createElementVNode("span", vue.mergeProps({
              "class": _ctx.cx('tokenLabel')
            }, _ctx.ptm('tokenLabel')), vue.toDisplayString($options.getLabelByValue(item)), 17)];
          }), !_ctx.disabled ? vue.renderSlot(_ctx.$slots, "removetokenicon", {
            key: 0,
            "class": vue.normalizeClass(_ctx.cx('removeTokenIcon')),
            item: item,
            onClick: function onClick(event) {
              return $options.removeOption(event, item);
            }
          }, function () {
            return [_ctx.removeTokenIcon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
              key: 0,
              "class": [_ctx.cx('removeTokenIcon'), _ctx.removeTokenIcon],
              onClick: vue.withModifiers(function ($event) {
                return $options.removeOption($event, item);
              }, ["stop"])
            }, _ctx.ptm('removeTokenIcon')), null, 16, _hoisted_2)) : (vue.openBlock(), vue.createBlock(_component_TimesCircleIcon, vue.mergeProps({
              key: 1,
              "class": _ctx.cx('removeTokenIcon'),
              onClick: vue.withModifiers(function ($event) {
                return $options.removeOption($event, item);
              }, ["stop"])
            }, _ctx.ptm('removeTokenIcon')), null, 16, ["class", "onClick"]))];
          }) : vue.createCommentVNode("", true)], 16);
        }), 128)), !_ctx.modelValue || _ctx.modelValue.length === 0 ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
          key: 0
        }, [vue.createTextVNode(vue.toDisplayString(_ctx.placeholder || 'empty'), 1)], 64)) : vue.createCommentVNode("", true)], 64)) : vue.createCommentVNode("", true)];
      })], 16)], 16), vue.createElementVNode("div", vue.mergeProps({
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
                style: _ctx.panelStyle,
                "class": [_ctx.cx('panel'), _ctx.panelClass],
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
                onFocus: _cache[3] || (_cache[3] = function () {
                  return $options.onFirstHiddenFocus && $options.onFirstHiddenFocus.apply($options, arguments);
                })
              }, _ctx.ptm('hiddenFirstFocusableEl'), {
                "data-p-hidden-accessible": true,
                "data-p-hidden-focusable": true
              }), null, 16), vue.renderSlot(_ctx.$slots, "header", {
                value: _ctx.modelValue,
                options: $options.visibleOptions
              }), _ctx.showToggleAll && _ctx.selectionLimit == null || _ctx.filter ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 0,
                "class": _ctx.cx('header')
              }, _ctx.ptm('header')), [_ctx.showToggleAll && _ctx.selectionLimit == null ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 0,
                "class": _ctx.cx('headerCheckboxContainer'),
                onClick: _cache[6] || (_cache[6] = function () {
                  return $options.onToggleAll && $options.onToggleAll.apply($options, arguments);
                })
              }, _ctx.ptm('headerCheckboxContainer')), [vue.createElementVNode("div", vue.mergeProps({
                "class": "p-hidden-accessible"
              }, _ctx.ptm('hiddenInputWrapper'), {
                "data-p-hidden-accessible": true
              }), [vue.createElementVNode("input", vue.mergeProps({
                type: "checkbox",
                readonly: "",
                checked: $options.allSelected,
                "aria-label": $options.toggleAllAriaLabel,
                onFocus: _cache[4] || (_cache[4] = function () {
                  return $options.onHeaderCheckboxFocus && $options.onHeaderCheckboxFocus.apply($options, arguments);
                }),
                onBlur: _cache[5] || (_cache[5] = function () {
                  return $options.onHeaderCheckboxBlur && $options.onHeaderCheckboxBlur.apply($options, arguments);
                })
              }, _ctx.ptm('headerCheckbox')), null, 16, _hoisted_3)], 16), vue.createElementVNode("div", vue.mergeProps({
                "class": _ctx.cx('headerCheckbox')
              }, $options.getHeaderCheckboxPTOptions('headerCheckbox')), [vue.renderSlot(_ctx.$slots, "headercheckboxicon", {
                allSelected: $options.allSelected,
                "class": vue.normalizeClass(_ctx.cx('headerCheckboxIcon'))
              }, function () {
                return [vue.withDirectives((vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.checkboxIcon ? 'span' : 'CheckIcon'), vue.mergeProps({
                  "class": [_ctx.cx('headerCheckboxIcon'), _defineProperty({}, _ctx.checkboxIcon, $options.allSelected)]
                }, $options.getHeaderCheckboxPTOptions('headerCheckboxIcon')), null, 16, ["class"])), [[vue.vShow, $options.allSelected]])];
              })], 16)], 16)) : vue.createCommentVNode("", true), _ctx.filter ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 1,
                "class": _ctx.cx('filterContainer')
              }, _ctx.ptm('filterContainer')), [vue.createElementVNode("input", vue.mergeProps({
                ref: "filterInput",
                type: "text",
                value: $data.filterValue,
                onVnodeMounted: _cache[7] || (_cache[7] = function () {
                  return $options.onFilterUpdated && $options.onFilterUpdated.apply($options, arguments);
                }),
                "class": _ctx.cx('filterInput'),
                placeholder: _ctx.filterPlaceholder,
                role: "searchbox",
                autocomplete: "off",
                "aria-owns": $data.id + '_list',
                "aria-activedescendant": $options.focusedOptionId,
                onKeydown: _cache[8] || (_cache[8] = function () {
                  return $options.onFilterKeyDown && $options.onFilterKeyDown.apply($options, arguments);
                }),
                onBlur: _cache[9] || (_cache[9] = function () {
                  return $options.onFilterBlur && $options.onFilterBlur.apply($options, arguments);
                }),
                onInput: _cache[10] || (_cache[10] = function () {
                  return $options.onFilterChange && $options.onFilterChange.apply($options, arguments);
                })
              }, _objectSpread(_objectSpread({}, _ctx.filterInputProps), _ctx.ptm('filterInput'))), null, 16, _hoisted_4), vue.renderSlot(_ctx.$slots, "filtericon", {
                "class": vue.normalizeClass(_ctx.cx('filterIcon'))
              }, function () {
                return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.filterIcon ? 'span' : 'SearchIcon'), vue.mergeProps({
                  "class": [_ctx.cx('filterIcon'), _ctx.filterIcon]
                }, _ctx.ptm('filterIcon')), null, 16, ["class"]))];
              })], 16)) : vue.createCommentVNode("", true), _ctx.filter ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
                key: 2,
                role: "status",
                "aria-live": "polite",
                "class": "p-hidden-accessible"
              }, _ctx.ptm('hiddenFilterResult'), {
                "data-p-hidden-accessible": true
              }), vue.toDisplayString($options.filterResultMessageText), 17)) : vue.createCommentVNode("", true), vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
                "class": _ctx.cx('closeButton'),
                "aria-label": $options.closeAriaLabel,
                onClick: _cache[11] || (_cache[11] = function () {
                  return $options.onCloseClick && $options.onCloseClick.apply($options, arguments);
                }),
                type: "button"
              }, _objectSpread(_objectSpread({}, _ctx.closeButtonProps), _ctx.ptm('closeButton'))), [vue.renderSlot(_ctx.$slots, "closeicon", {
                "class": vue.normalizeClass(_ctx.cx('closeIcon'))
              }, function () {
                return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.closeIcon ? 'span' : 'TimesIcon'), vue.mergeProps({
                  "class": [_ctx.cx('closeIcon'), _ctx.closeIcon]
                }, _ctx.ptm('closeIcon')), null, 16, ["class"]))];
              })], 16, _hoisted_5)), [[_directive_ripple]])], 16)) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.mergeProps({
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
                content: vue.withCtx(function (_ref2) {
                  var styleClass = _ref2.styleClass,
                    contentRef = _ref2.contentRef,
                    items = _ref2.items,
                    getItemOptions = _ref2.getItemOptions,
                    contentStyle = _ref2.contentStyle,
                    itemSize = _ref2.itemSize;
                  return [vue.createElementVNode("ul", vue.mergeProps({
                    ref: function ref(el) {
                      return $options.listRef(el, contentRef);
                    },
                    id: $data.id + '_list',
                    "class": [_ctx.cx('list'), styleClass],
                    style: contentStyle,
                    role: "listbox",
                    "aria-multiselectable": "true"
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
                    })], 16, _hoisted_7)) : vue.withDirectives((vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
                      key: 1,
                      id: $data.id + '_' + $options.getOptionIndex(i, getItemOptions),
                      style: {
                        height: itemSize ? itemSize + 'px' : undefined
                      },
                      "class": _ctx.cx('item', {
                        option: option,
                        index: i,
                        getItemOptions: getItemOptions
                      }),
                      role: "option",
                      "aria-label": $options.getOptionLabel(option),
                      "aria-selected": $options.isSelected(option),
                      "aria-disabled": $options.isOptionDisabled(option),
                      "aria-setsize": $options.ariaSetSize,
                      "aria-posinset": $options.getAriaPosInset($options.getOptionIndex(i, getItemOptions)),
                      onClick: function onClick($event) {
                        return $options.onOptionSelect($event, option, $options.getOptionIndex(i, getItemOptions), true);
                      },
                      onMousemove: function onMousemove($event) {
                        return $options.onOptionMouseMove($event, $options.getOptionIndex(i, getItemOptions));
                      }
                    }, $options.getCheckboxPTOptions(option, getItemOptions, i, 'item'), {
                      "data-p-highlight": $options.isSelected(option),
                      "data-p-focused": $data.focusedOptionIndex === $options.getOptionIndex(i, getItemOptions),
                      "data-p-disabled": $options.isOptionDisabled(option)
                    }), [vue.createElementVNode("div", vue.mergeProps({
                      "class": _ctx.cx('checkboxContainer')
                    }, _ctx.ptm('checkboxContainer')), [vue.createElementVNode("div", vue.mergeProps({
                      "class": _ctx.cx('checkbox', {
                        option: option
                      })
                    }, $options.getCheckboxPTOptions(option, getItemOptions, i, 'checkbox')), [vue.renderSlot(_ctx.$slots, "itemcheckboxicon", {
                      selected: $options.isSelected(option),
                      "class": vue.normalizeClass(_ctx.cx('checkboxIcon'))
                    }, function () {
                      return [vue.withDirectives((vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.checkboxIcon ? 'span' : 'CheckIcon'), vue.mergeProps({
                        "class": [_ctx.cx('checkboxIcon'), _defineProperty({}, _ctx.checkboxIcon, $options.isSelected(option))]
                      }, $options.getCheckboxPTOptions(option, getItemOptions, i, 'checkboxIcon')), null, 16, ["class"])), [[vue.vShow, $options.isSelected(option)]])];
                    })], 16)], 16), vue.renderSlot(_ctx.$slots, "option", {
                      option: option,
                      index: $options.getOptionIndex(i, getItemOptions)
                    }, function () {
                      return [vue.createElementVNode("span", vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('option'))), vue.toDisplayString($options.getOptionLabel(option)), 17)];
                    })], 16, _hoisted_8)), [[_directive_ripple]])], 64);
                  }), 128)), $data.filterValue && (!items || items && items.length === 0) ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
                    key: 0,
                    "class": _ctx.cx('emptyMessage'),
                    role: "option"
                  }, _ctx.ptm('emptyMessage')), [vue.renderSlot(_ctx.$slots, "emptyfilter", {}, function () {
                    return [vue.createTextVNode(vue.toDisplayString($options.emptyFilterMessageText), 1)];
                  })], 16)) : !_ctx.options || _ctx.options && _ctx.options.length === 0 ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
                    key: 1,
                    "class": _ctx.cx('emptyMessage'),
                    role: "option"
                  }, _ctx.ptm('emptyMessage')), [vue.renderSlot(_ctx.$slots, "empty", {}, function () {
                    return [vue.createTextVNode(vue.toDisplayString($options.emptyMessageText), 1)];
                  })], 16)) : vue.createCommentVNode("", true)], 16, _hoisted_6)];
                }),
                _: 2
              }, [_ctx.$slots.loader ? {
                name: "loader",
                fn: vue.withCtx(function (_ref4) {
                  var options = _ref4.options;
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
      }, 8, ["appendTo"])], 16);
    }

    script.render = render;

    return script;

})(primevue.api, primevue.icons.check, primevue.icons.chevrondown, primevue.icons.search, primevue.icons.spinner, primevue.icons.times, primevue.icons.timescircle, primevue.overlayeventbus, primevue.portal, primevue.ripple, primevue.utils, primevue.virtualscroller, primevue.basecomponent, primevue.usestyle, Vue);
