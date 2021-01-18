(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./resources/js/academic-bodies/helps-by-academic-body/helps.page.scss?vue&type=style&index=0&id=0570aa37&scoped=true&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./resources/js/academic-bodies/helps-by-academic-body/helps.page.scss?vue&type=style&index=0&id=0570aa37&scoped=true&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./resources/js/academic-bodies/helps-by-academic-body/helps.page.scss?vue&type=style&index=0&id=0570aa37&scoped=true&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/dist/cjs.js??ref--8-3!./resources/js/academic-bodies/helps-by-academic-body/helps.page.scss?vue&type=style&index=0&id=0570aa37&scoped=true&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--8-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!./helps.page.scss?vue&type=style&index=0&id=0570aa37&scoped=true&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./resources/js/academic-bodies/helps-by-academic-body/helps.page.scss?vue&type=style&index=0&id=0570aa37&scoped=true&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/ts-loader/index.js?!./resources/js/academic-bodies/helps-by-academic-body/helps.page.ts?vue&type=script&lang=ts&":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--5!./resources/js/academic-bodies/helps-by-academic-body/helps.page.ts?vue&type=script&lang=ts& ***!
  \*************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_class_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-class-component */ "./node_modules/vue-class-component/dist/vue-class-component.esm.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var HelpsPage = /** @class */ (function (_super) {
    __extends(HelpsPage, _super);
    function HelpsPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tableTitle = "Apoyos de *academic_unit.name";
        _this.apiResource = "academic_body(id: " + _this.$route.params.id + ")";
        _this.spanishResourceName = 'apoyo';
        _this.toolbar = new Set(['add', 'edit']);
        _this.fields = [
            { key: 'helps.type', label: 'Tipo', sortable: true },
            { key: 'helps.date', label: 'Fecha', sortable: true },
            { key: 'helps.amount', label: 'Cantidad', sortable: true },
            { key: 'helps.benefited_employee.name', label: 'Beneficiario', sortable: true },
            { key: 'helps.academic_body.leader.academic_unit.name', label: 'Unidad académica', sortable: true },
            { key: 'helps.academic_body.leader.academic_unit.campus', label: 'Campus', sortable: true },
            { key: 'actions', label: 'Acciones' }
        ];
        _this.schema = {
            fields: [
                {
                    type: 'select',
                    label: 'Tipo de apoyo',
                    model: 'type',
                    values: [
                        'Estancias cortas',
                        'Apoyo a publicación',
                        'Convocatoria redes',
                        'Convocatoria fortalecimiento de CA',
                        'Becas posdoctorado'
                    ]
                },
                {
                    type: 'calendar',
                    label: 'Fecha',
                    model: 'date'
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Monto',
                    model: 'amount'
                },
                {
                    type: 'graphql-select',
                    label: 'Empleado beneficiado',
                    model: "benefited_employee_id",
                    query: 'employees',
                    textKey: 'name'
                },
            ]
        };
        return _this;
    }
    HelpsPage = __decorate([
        vue_class_component__WEBPACK_IMPORTED_MODULE_1__["default"]
    ], HelpsPage);
    return HelpsPage;
}(vue__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (HelpsPage);


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/academic-bodies/helps-by-academic-body/index.vue?vue&type=template&id=0570aa37&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/academic-bodies/helps-by-academic-body/index.vue?vue&type=template&id=0570aa37&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("siip-table", {
    attrs: {
      toolbar: _vm.toolbar,
      schema: _vm.schema,
      spanishResourceName: _vm.spanishResourceName,
      tableTitle: _vm.tableTitle,
      fields: _vm.fields,
      communicationType: "GraphQL",
      resource: _vm.apiResource
    }
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/academic-bodies/helps-by-academic-body/helps.page.scss?vue&type=style&index=0&id=0570aa37&scoped=true&lang=scss&":
/*!***************************************************************************************************************************************!*\
  !*** ./resources/js/academic-bodies/helps-by-academic-body/helps.page.scss?vue&type=style&index=0&id=0570aa37&scoped=true&lang=scss& ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_helps_page_scss_vue_type_style_index_0_id_0570aa37_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--8-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--8-3!./helps.page.scss?vue&type=style&index=0&id=0570aa37&scoped=true&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./resources/js/academic-bodies/helps-by-academic-body/helps.page.scss?vue&type=style&index=0&id=0570aa37&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_helps_page_scss_vue_type_style_index_0_id_0570aa37_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_helps_page_scss_vue_type_style_index_0_id_0570aa37_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_helps_page_scss_vue_type_style_index_0_id_0570aa37_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_2_node_modules_sass_loader_dist_cjs_js_ref_8_3_helps_page_scss_vue_type_style_index_0_id_0570aa37_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/academic-bodies/helps-by-academic-body/helps.page.ts?vue&type=script&lang=ts&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/academic-bodies/helps-by-academic-body/helps.page.ts?vue&type=script&lang=ts& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_5_helps_page_ts_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/ts-loader??ref--5!./helps.page.ts?vue&type=script&lang=ts& */ "./node_modules/ts-loader/index.js?!./resources/js/academic-bodies/helps-by-academic-body/helps.page.ts?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_5_helps_page_ts_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/academic-bodies/helps-by-academic-body/index.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/academic-bodies/helps-by-academic-body/index.vue ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_0570aa37_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=0570aa37&scoped=true& */ "./resources/js/academic-bodies/helps-by-academic-body/index.vue?vue&type=template&id=0570aa37&scoped=true&");
/* harmony import */ var _helps_page_ts_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helps.page.ts?vue&type=script&lang=ts& */ "./resources/js/academic-bodies/helps-by-academic-body/helps.page.ts?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _helps_page_scss_vue_type_style_index_0_id_0570aa37_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helps.page.scss?vue&type=style&index=0&id=0570aa37&scoped=true&lang=scss& */ "./resources/js/academic-bodies/helps-by-academic-body/helps.page.scss?vue&type=style&index=0&id=0570aa37&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _helps_page_ts_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_0570aa37_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_0570aa37_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0570aa37",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/academic-bodies/helps-by-academic-body/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/academic-bodies/helps-by-academic-body/index.vue?vue&type=template&id=0570aa37&scoped=true&":
/*!******************************************************************************************************************!*\
  !*** ./resources/js/academic-bodies/helps-by-academic-body/index.vue?vue&type=template&id=0570aa37&scoped=true& ***!
  \******************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_0570aa37_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=0570aa37&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/academic-bodies/helps-by-academic-body/index.vue?vue&type=template&id=0570aa37&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_0570aa37_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_0570aa37_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);