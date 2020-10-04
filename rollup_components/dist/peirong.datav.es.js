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
var script = {
  name: 'TestComponent',
  data: function data() {
    return {
      message: 'hello world!!!!!'
    };
  } // setup() {
  //     const message = 'hello world?????'
  //     return {
  //         message
  //     }
  // }

};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "test" }, [
    _vm._v("\n    " + _vm._s(_vm.message) + "\n    "),
    _c(
      "svg",
      { attrs: { width: "100%", height: "100%", viewBox: "0 0 100 100" } },
      [
        _c("line", {
          attrs: {
            x1: "0",
            y1: "50",
            x2: "100",
            y2: "50",
            "stroke-width": "8",
            stroke: "currentcolor"
          }
        }),
        _vm._v(" "),
        _c("line", {
          attrs: {
            x1: "50",
            y1: "0",
            x2: "50",
            y2: "100",
            "stroke-width": "8",
            stroke: "currentcolor"
          }
        })
      ]
    )
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-c0cd65cc_0", { source: "\n\n/*# sourceMappingURL=Test.vue.map */", map: {"version":3,"sources":["Test.vue"],"names":[],"mappings":";;AAEA,mCAAmC","file":"Test.vue","sourcesContent":["\n\n/*# sourceMappingURL=Test.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-c0cd65cc";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

function Test (Vue) {
  Vue.component(__vue_component__.name, __vue_component__);
}

//
//
//
//
//
//
var script$1 = {
  name: 'TestComponent2',
  setup: function setup() {
    var message = 'hello world222222';
    return {
      message: message
    };
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "test2" }, [
    _c("div", [_vm._v(_vm._s(_vm.message))])
  ])
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-47f63cbd_0", { source: ".test2[data-v-47f63cbd] {\n  color: blue;\n}\n\n/*# sourceMappingURL=Test2.vue.map */", map: {"version":3,"sources":["E:\\my_work\\rollup_test\\src\\components\\Test2\\Test2.vue","Test2.vue"],"names":[],"mappings":"AAmBA;EACA,WAAA;AClBA;;AAEA,oCAAoC","file":"Test2.vue","sourcesContent":["<template>\r\n    <div class=\"test2\">\r\n        <div>{{ message }}</div>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n    name: 'TestComponent2',\r\n    setup() {\r\n        const message = 'hello world222222'\r\n        return {\r\n            message\r\n        }\r\n    }\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\" scoped>\r\n    .test2{\r\n        color: blue;\r\n    }\r\n</style>",".test2 {\n  color: blue;\n}\n\n/*# sourceMappingURL=Test2.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = "data-v-47f63cbd";
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    createInjector,
    undefined,
    undefined
  );

function Test2 (Vue) {
  Vue.component(__vue_component__$1.name, __vue_component__$1);
}

//
//
//
//
//
//
var script$2 = {
  name: 'TestComponent3',
  setup: function setup() {
    var message = 'hello world3333333';
    return {
      message: message
    };
  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "test3" }, [
    _c("div", [_vm._v(_vm._s(_vm.message))])
  ])
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-6de588c4_0", { source: ".test3[data-v-6de588c4] {\n  color: green;\n}\n\n/*# sourceMappingURL=Test3.vue.map */", map: {"version":3,"sources":["E:\\my_work\\rollup_test\\src\\components\\Test3\\Test3.vue","Test3.vue"],"names":[],"mappings":"AAmBA;EACA,YAAA;AClBA;;AAEA,oCAAoC","file":"Test3.vue","sourcesContent":["<template>\r\n    <div class=\"test3\">\r\n        <div>{{ message }}</div>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n    name: 'TestComponent3',\r\n    setup() {\r\n        const message = 'hello world3333333'\r\n        return {\r\n            message\r\n        }\r\n    }\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\" scoped>\r\n    .test3{\r\n        color: green;\r\n    }\r\n</style>",".test3 {\n  color: green;\n}\n\n/*# sourceMappingURL=Test3.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = "data-v-6de588c4";
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    createInjector,
    undefined,
    undefined
  );

function Test3 (Vue) {
  Vue.component(__vue_component__$2.name, __vue_component__$2);
}

function index (Vue) {
  Vue.use(Test2);
  Vue.use(Test3);
  Vue.use(Test);
} // export function test(Vue) {
//     Vue.use(Test)
// }
// export function test2(Vue) {
//     Vue.use(Test2)
// }
// export function test3(Vue) {
//     Vue.use(Test3)
// }

export default index;
