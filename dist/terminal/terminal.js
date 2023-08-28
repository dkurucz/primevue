this.primevue = this.primevue || {};
this.primevue.terminal = (function (TerminalService, BaseComponent, usestyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var TerminalService__default = /*#__PURE__*/_interopDefaultLegacy(TerminalService);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var styles = "\n.p-terminal {\n    height: 18rem;\n    overflow: auto;\n}\n\n.p-terminal-prompt-container {\n    display: flex;\n    align-items: center;\n}\n\n.p-terminal-input {\n    flex: 1 1 auto;\n    border: 0 none;\n    background-color: transparent;\n    color: inherit;\n    padding: 0;\n    outline: 0 none;\n}\n\n.p-terminal-input::-ms-clear {\n    display: none;\n}\n";
    var classes = {
      root: 'p-terminal p-component',
      content: 'p-terminal-content',
      prompt: 'p-terminal-prompt',
      command: 'p-terminal-command',
      response: 'p-terminal-response',
      container: 'p-terminal-prompt-container',
      commandText: 'p-terminal-input'
    };
    var _useStyle = usestyle.useStyle(styles, {
        name: 'terminal',
        manual: true
      }),
      loadStyle = _useStyle.load;
    var script$1 = {
      name: 'BaseTerminal',
      "extends": BaseComponent__default["default"],
      props: {
        welcomeMessage: {
          type: String,
          "default": null
        },
        prompt: {
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

    var script = {
      name: 'Terminal',
      "extends": script$1,
      data: function data() {
        return {
          commandText: null,
          commands: []
        };
      },
      mounted: function mounted() {
        TerminalService__default["default"].on('response', this.responseListener);
        this.$refs.input.focus();
      },
      updated: function updated() {
        this.$el.scrollTop = this.$el.scrollHeight;
      },
      beforeUnmount: function beforeUnmount() {
        TerminalService__default["default"].off('response', this.responseListener);
      },
      methods: {
        onClick: function onClick() {
          this.$refs.input.focus();
        },
        onKeydown: function onKeydown(event) {
          if (event.code === 'Enter' && this.commandText) {
            this.commands.push({
              text: this.commandText
            });
            TerminalService__default["default"].emit('command', this.commandText);
            this.commandText = '';
          }
        },
        responseListener: function responseListener(response) {
          this.commands[this.commands.length - 1].response = response;
        }
      }
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root'),
        onClick: _cache[2] || (_cache[2] = function () {
          return $options.onClick && $options.onClick.apply($options, arguments);
        })
      }, _ctx.ptm('root'), {
        "data-pc-name": "terminal"
      }), [_ctx.welcomeMessage ? (vue.openBlock(), vue.createElementBlock("div", vue.normalizeProps(vue.mergeProps({
        key: 0
      }, _ctx.ptm('welcomeMessage'))), vue.toDisplayString(_ctx.welcomeMessage), 17)) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('content')
      }, _ctx.ptm('content')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.commands, function (command, i) {
        return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
          key: command.text + i.toString()
        }, _ctx.ptm('commands')), [vue.createElementVNode("span", vue.mergeProps({
          "class": _ctx.cx('prompt')
        }, _ctx.ptm('prompt')), vue.toDisplayString(_ctx.prompt), 17), vue.createElementVNode("span", vue.mergeProps({
          "class": _ctx.cx('command')
        }, _ctx.ptm('command')), vue.toDisplayString(command.text), 17), vue.createElementVNode("div", vue.mergeProps({
          "class": _ctx.cx('response'),
          "aria-live": "polite"
        }, _ctx.ptm('response')), vue.toDisplayString(command.response), 17)], 16);
      }), 128))], 16), vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('container')
      }, _ctx.ptm('container')), [vue.createElementVNode("span", vue.mergeProps({
        "class": _ctx.cx('prompt')
      }, _ctx.ptm('prompt')), vue.toDisplayString(_ctx.prompt), 17), vue.withDirectives(vue.createElementVNode("input", vue.mergeProps({
        ref: "input",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          return $data.commandText = $event;
        }),
        type: "text",
        "class": _ctx.cx('commandText'),
        autocomplete: "off",
        onKeydown: _cache[1] || (_cache[1] = function () {
          return $options.onKeydown && $options.onKeydown.apply($options, arguments);
        })
      }, _ctx.ptm('commandText')), null, 16), [[vue.vModelText, $data.commandText]])], 16)], 16);
    }

    script.render = render;

    return script;

})(primevue.terminalservice, primevue.basecomponent, primevue.usestyle, Vue);
