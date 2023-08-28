import BanIcon from 'primevue/icons/ban';
import StarIcon from 'primevue/icons/star';
import StarFillIcon from 'primevue/icons/starfill';
import { UniqueComponentId, DomHandler } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import { useStyle } from 'primevue/usestyle';
import { openBlock, createElementBlock, mergeProps, createElementVNode, renderSlot, normalizeClass, createBlock, resolveDynamicComponent, createCommentVNode, Fragment, renderList } from 'vue';

var styles = "\n.p-rating {\n    position: relative;\n    display: flex;\n    align-items: center;\n}\n\n.p-rating-item {\n    display: inline-flex;\n    align-items: center;\n    cursor: pointer;\n}\n\n.p-rating.p-readonly .p-rating-item {\n    cursor: default;\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-rating', {
      'p-readonly': props.readonly,
      'p-disabled': props.disabled
    }];
  },
  cancelItem: function cancelItem(_ref2) {
    var instance = _ref2.instance;
    return ['p-rating-item p-rating-cancel-item', {
      'p-focus': instance.focusedOptionIndex === 0
    }];
  },
  cancelIcon: 'p-rating-icon p-rating-cancel',
  item: function item(_ref3) {
    var instance = _ref3.instance,
      props = _ref3.props,
      value = _ref3.value;
    return ['p-rating-item', {
      'p-rating-item-active': value <= props.modelValue,
      'p-focus': value === instance.focusedOptionIndex
    }];
  },
  onIcon: 'p-rating-icon',
  offIcon: 'p-rating-icon'
};
var _useStyle = useStyle(styles, {
    name: 'rating',
    manual: true
  }),
  loadStyle = _useStyle.load;
  _useStyle.unload;
var script$1 = {
  name: 'BaseRating',
  "extends": BaseComponent,
  props: {
    modelValue: {
      type: Number,
      "default": null
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    readonly: {
      type: Boolean,
      "default": false
    },
    stars: {
      type: Number,
      "default": 5
    },
    cancel: {
      type: Boolean,
      "default": true
    },
    onIcon: {
      type: String,
      "default": undefined
    },
    offIcon: {
      type: String,
      "default": undefined
    },
    cancelIcon: {
      type: String,
      "default": undefined
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

var script = {
  name: 'Rating',
  "extends": script$1,
  emits: ['update:modelValue', 'change', 'focus', 'blur'],
  data: function data() {
    return {
      name: this.$attrs.name,
      focusedOptionIndex: -1
    };
  },
  watch: {
    '$attrs.name': function $attrsName(newValue) {
      this.name = newValue || UniqueComponentId();
    }
  },
  mounted: function mounted() {
    this.name = this.name || UniqueComponentId();
  },
  methods: {
    getPTOptions: function getPTOptions(key, value) {
      return this.ptm(key, {
        context: {
          active: value <= this.modelValue,
          focused: value === this.focusedOptionIndex
        }
      });
    },
    onOptionClick: function onOptionClick(event, value) {
      if (!this.readonly && !this.disabled) {
        this.onOptionSelect(event, value);
        var firstFocusableEl = DomHandler.getFirstFocusableElement(event.currentTarget);
        firstFocusableEl && DomHandler.focus(firstFocusableEl);
      }
    },
    onFocus: function onFocus(event, value) {
      this.focusedOptionIndex = value;
      this.$emit('focus', event);
    },
    onBlur: function onBlur(event) {
      this.focusedOptionIndex = -1;
      this.$emit('blur', event);
    },
    onChange: function onChange(event, value) {
      this.onOptionSelect(event, value);
    },
    onOptionSelect: function onOptionSelect(event, value) {
      this.focusedOptionIndex = value;
      this.updateModel(event, value || null);
    },
    updateModel: function updateModel(event, value) {
      this.$emit('update:modelValue', value);
      this.$emit('change', {
        originalEvent: event,
        value: value
      });
    },
    cancelAriaLabel: function cancelAriaLabel() {
      return this.$primevue.config.locale.clear;
    },
    starAriaLabel: function starAriaLabel(value) {
      return value === 1 ? this.$primevue.config.locale.aria.star : this.$primevue.config.locale.aria.stars.replace(/{star}/g, value);
    }
  },
  components: {
    StarFillIcon: StarFillIcon,
    StarIcon: StarIcon,
    BanIcon: BanIcon
  }
};

var _hoisted_1 = ["data-p-focused"];
var _hoisted_2 = ["name", "checked", "disabled", "readonly", "aria-label"];
var _hoisted_3 = ["onClick", "data-p-active", "data-p-focused"];
var _hoisted_4 = ["value", "name", "checked", "disabled", "readonly", "aria-label", "onFocus", "onChange"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptm('root'), {
    "data-pc-name": "rating"
  }), [_ctx.cancel ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx('cancelItem'),
    onClick: _cache[3] || (_cache[3] = function ($event) {
      return $options.onOptionClick($event, 0);
    })
  }, $options.getPTOptions('cancelItem', 0), {
    "data-p-focused": $data.focusedOptionIndex === 0
  }), [createElementVNode("span", mergeProps({
    "class": "p-hidden-accessible"
  }, _ctx.ptm('hiddenCancelInputWrapper'), {
    "data-p-hidden-accessible": true
  }), [createElementVNode("input", mergeProps({
    type: "radio",
    value: "0",
    name: $data.name,
    checked: _ctx.modelValue === 0,
    disabled: _ctx.disabled,
    readonly: _ctx.readonly,
    "aria-label": $options.cancelAriaLabel(),
    onFocus: _cache[0] || (_cache[0] = function ($event) {
      return $options.onFocus($event, 0);
    }),
    onBlur: _cache[1] || (_cache[1] = function () {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    }),
    onChange: _cache[2] || (_cache[2] = function ($event) {
      return $options.onChange($event, 0);
    })
  }, _ctx.ptm('hiddenCancelInput')), null, 16, _hoisted_2)], 16), renderSlot(_ctx.$slots, "cancelicon", {
    "class": normalizeClass(_ctx.cx('cancelIcon'))
  }, function () {
    return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.cancelIcon ? 'span' : 'BanIcon'), mergeProps({
      "class": [_ctx.cx('cancelIcon'), _ctx.cancelIcon]
    }, _ctx.ptm('cancelIcon')), null, 16, ["class"]))];
  })], 16, _hoisted_1)) : createCommentVNode("", true), (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.stars, function (value) {
    return openBlock(), createElementBlock("div", mergeProps({
      key: value,
      "class": _ctx.cx('item', {
        value: value
      }),
      onClick: function onClick($event) {
        return $options.onOptionClick($event, value);
      }
    }, $options.getPTOptions('item', value), {
      "data-p-active": value <= _ctx.modelValue,
      "data-p-focused": value === $data.focusedOptionIndex
    }), [createElementVNode("span", mergeProps({
      "class": "p-hidden-accessible"
    }, _ctx.ptm('hiddenItemInputWrapper'), {
      "data-p-hidden-accessible": true
    }), [createElementVNode("input", mergeProps({
      type: "radio",
      value: value,
      name: $data.name,
      checked: _ctx.modelValue === value,
      disabled: _ctx.disabled,
      readonly: _ctx.readonly,
      "aria-label": $options.starAriaLabel(value),
      onFocus: function onFocus($event) {
        return $options.onFocus($event, value);
      },
      onBlur: _cache[4] || (_cache[4] = function () {
        return $options.onBlur && $options.onBlur.apply($options, arguments);
      }),
      onChange: function onChange($event) {
        return $options.onChange($event, value);
      }
    }, _ctx.ptm('hiddenItemInput')), null, 16, _hoisted_4)], 16), value <= _ctx.modelValue ? renderSlot(_ctx.$slots, "onicon", {
      key: 0,
      value: value,
      "class": normalizeClass(_ctx.cx('onIcon'))
    }, function () {
      return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.onIcon ? 'span' : 'StarFillIcon'), mergeProps({
        "class": [_ctx.cx('onIcon'), _ctx.onIcon]
      }, _ctx.ptm('onIcon')), null, 16, ["class"]))];
    }) : renderSlot(_ctx.$slots, "officon", {
      key: 1,
      value: value,
      "class": normalizeClass(_ctx.cx('offIcon'))
    }, function () {
      return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.offIcon ? 'span' : 'StarIcon'), mergeProps({
        "class": [_ctx.cx('offIcon'), _ctx.offIcon]
      }, _ctx.ptm('offIcon')), null, 16, ["class"]))];
    })], 16, _hoisted_3);
  }), 128))], 16);
}

script.render = render;

export { script as default };
