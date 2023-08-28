import { DomHandler } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import { useStyle } from 'primevue/usestyle';
import { openBlock, createElementBlock, mergeProps, createElementVNode, renderSlot, normalizeProps, guardReactiveProps } from 'vue';

var quillStyles = "\n/*!\n * Quill Editor v1.3.3\n * https://quilljs.com/\n * Copyright (c) 2014, Jason Chen\n * Copyright (c) 2013, salesforce.com\n */\n.ql-container {\n    box-sizing: border-box;\n    font-family: Helvetica, Arial, sans-serif;\n    font-size: 13px;\n    height: 100%;\n    margin: 0px;\n    position: relative;\n}\n.ql-container.ql-disabled .ql-tooltip {\n    visibility: hidden;\n}\n.ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {\n    pointer-events: none;\n}\n.ql-clipboard {\n    left: -100000px;\n    height: 1px;\n    overflow-y: hidden;\n    position: absolute;\n    top: 50%;\n}\n.ql-clipboard p {\n    margin: 0;\n    padding: 0;\n}\n.ql-editor {\n    box-sizing: border-box;\n    line-height: 1.42;\n    height: 100%;\n    outline: none;\n    overflow-y: auto;\n    padding: 12px 15px;\n    tab-size: 4;\n    -moz-tab-size: 4;\n    text-align: left;\n    white-space: pre-wrap;\n    word-wrap: break-word;\n}\n.ql-editor > * {\n    cursor: text;\n}\n.ql-editor p,\n.ql-editor ol,\n.ql-editor ul,\n.ql-editor pre,\n.ql-editor blockquote,\n.ql-editor h1,\n.ql-editor h2,\n.ql-editor h3,\n.ql-editor h4,\n.ql-editor h5,\n.ql-editor h6 {\n    margin: 0;\n    padding: 0;\n    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol,\n.ql-editor ul {\n    padding-left: 1.5rem;\n}\n.ql-editor ol > li,\n.ql-editor ul > li {\n    list-style-type: none;\n}\n.ql-editor ul > li::before {\n    content: '\\2022';\n}\n.ql-editor ul[data-checked='true'],\n.ql-editor ul[data-checked='false'] {\n    pointer-events: none;\n}\n.ql-editor ul[data-checked='true'] > li *,\n.ql-editor ul[data-checked='false'] > li * {\n    pointer-events: all;\n}\n.ql-editor ul[data-checked='true'] > li::before,\n.ql-editor ul[data-checked='false'] > li::before {\n    color: #777;\n    cursor: pointer;\n    pointer-events: all;\n}\n.ql-editor ul[data-checked='true'] > li::before {\n    content: '\\2611';\n}\n.ql-editor ul[data-checked='false'] > li::before {\n    content: '\\2610';\n}\n.ql-editor li::before {\n    display: inline-block;\n    white-space: nowrap;\n    width: 1.2rem;\n}\n.ql-editor li:not(.ql-direction-rtl)::before {\n    margin-left: -1.5rem;\n    margin-right: 0.3rem;\n    text-align: right;\n}\n.ql-editor li.ql-direction-rtl::before {\n    margin-left: 0.3rem;\n    margin-right: -1.5rem;\n}\n.ql-editor ol li:not(.ql-direction-rtl),\n.ql-editor ul li:not(.ql-direction-rtl) {\n    padding-left: 1.5rem;\n}\n.ql-editor ol li.ql-direction-rtl,\n.ql-editor ul li.ql-direction-rtl {\n    padding-right: 1.5rem;\n}\n.ql-editor ol li {\n    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n    counter-increment: list-0;\n}\n.ql-editor ol li:before {\n    content: counter(list-0, decimal) '. ';\n}\n.ql-editor ol li.ql-indent-1 {\n    counter-increment: list-1;\n}\n.ql-editor ol li.ql-indent-1:before {\n    content: counter(list-1, lower-alpha) '. ';\n}\n.ql-editor ol li.ql-indent-1 {\n    counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-2 {\n    counter-increment: list-2;\n}\n.ql-editor ol li.ql-indent-2:before {\n    content: counter(list-2, lower-roman) '. ';\n}\n.ql-editor ol li.ql-indent-2 {\n    counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-3 {\n    counter-increment: list-3;\n}\n.ql-editor ol li.ql-indent-3:before {\n    content: counter(list-3, decimal) '. ';\n}\n.ql-editor ol li.ql-indent-3 {\n    counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-4 {\n    counter-increment: list-4;\n}\n.ql-editor ol li.ql-indent-4:before {\n    content: counter(list-4, lower-alpha) '. ';\n}\n.ql-editor ol li.ql-indent-4 {\n    counter-reset: list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-5 {\n    counter-increment: list-5;\n}\n.ql-editor ol li.ql-indent-5:before {\n    content: counter(list-5, lower-roman) '. ';\n}\n.ql-editor ol li.ql-indent-5 {\n    counter-reset: list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-6 {\n    counter-increment: list-6;\n}\n.ql-editor ol li.ql-indent-6:before {\n    content: counter(list-6, decimal) '. ';\n}\n.ql-editor ol li.ql-indent-6 {\n    counter-reset: list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-7 {\n    counter-increment: list-7;\n}\n.ql-editor ol li.ql-indent-7:before {\n    content: counter(list-7, lower-alpha) '. ';\n}\n.ql-editor ol li.ql-indent-7 {\n    counter-reset: list-8 list-9;\n}\n.ql-editor ol li.ql-indent-8 {\n    counter-increment: list-8;\n}\n.ql-editor ol li.ql-indent-8:before {\n    content: counter(list-8, lower-roman) '. ';\n}\n.ql-editor ol li.ql-indent-8 {\n    counter-reset: list-9;\n}\n.ql-editor ol li.ql-indent-9 {\n    counter-increment: list-9;\n}\n.ql-editor ol li.ql-indent-9:before {\n    content: counter(list-9, decimal) '. ';\n}\n.ql-editor .ql-indent-1:not(.ql-direction-rtl) {\n    padding-left: 3rem;\n}\n.ql-editor li.ql-indent-1:not(.ql-direction-rtl) {\n    padding-left: 4.5rem;\n}\n.ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right {\n    padding-right: 3rem;\n}\n.ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right {\n    padding-right: 4.5rem;\n}\n.ql-editor .ql-indent-2:not(.ql-direction-rtl) {\n    padding-left: 6rem;\n}\n.ql-editor li.ql-indent-2:not(.ql-direction-rtl) {\n    padding-left: 7.5rem;\n}\n.ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right {\n    padding-right: 6rem;\n}\n.ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right {\n    padding-right: 7.5rem;\n}\n.ql-editor .ql-indent-3:not(.ql-direction-rtl) {\n    padding-left: 9rem;\n}\n.ql-editor li.ql-indent-3:not(.ql-direction-rtl) {\n    padding-left: 10.5rem;\n}\n.ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right {\n    padding-right: 9rem;\n}\n.ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right {\n    padding-right: 10.5rem;\n}\n.ql-editor .ql-indent-4:not(.ql-direction-rtl) {\n    padding-left: 12rem;\n}\n.ql-editor li.ql-indent-4:not(.ql-direction-rtl) {\n    padding-left: 13.5rem;\n}\n.ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right {\n    padding-right: 12rem;\n}\n.ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right {\n    padding-right: 13.5rem;\n}\n.ql-editor .ql-indent-5:not(.ql-direction-rtl) {\n    padding-left: 15rem;\n}\n.ql-editor li.ql-indent-5:not(.ql-direction-rtl) {\n    padding-left: 16.5rem;\n}\n.ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right {\n    padding-right: 15rem;\n}\n.ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right {\n    padding-right: 16.5rem;\n}\n.ql-editor .ql-indent-6:not(.ql-direction-rtl) {\n    padding-left: 18rem;\n}\n.ql-editor li.ql-indent-6:not(.ql-direction-rtl) {\n    padding-left: 19.5rem;\n}\n.ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right {\n    padding-right: 18rem;\n}\n.ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right {\n    padding-right: 19.5rem;\n}\n.ql-editor .ql-indent-7:not(.ql-direction-rtl) {\n    padding-left: 21rem;\n}\n.ql-editor li.ql-indent-7:not(.ql-direction-rtl) {\n    padding-left: 22.5rem;\n}\n.ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right {\n    padding-right: 21rem;\n}\n.ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right {\n    padding-right: 22.5rem;\n}\n.ql-editor .ql-indent-8:not(.ql-direction-rtl) {\n    padding-left: 24rem;\n}\n.ql-editor li.ql-indent-8:not(.ql-direction-rtl) {\n    padding-left: 25.5rem;\n}\n.ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right {\n    padding-right: 24rem;\n}\n.ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right {\n    padding-right: 25.5rem;\n}\n.ql-editor .ql-indent-9:not(.ql-direction-rtl) {\n    padding-left: 27rem;\n}\n.ql-editor li.ql-indent-9:not(.ql-direction-rtl) {\n    padding-left: 28.5rem;\n}\n.ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right {\n    padding-right: 27rem;\n}\n.ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right {\n    padding-right: 28.5rem;\n}\n.ql-editor .ql-video {\n    display: block;\n    max-width: 100%;\n}\n.ql-editor .ql-video.ql-align-center {\n    margin: 0 auto;\n}\n.ql-editor .ql-video.ql-align-right {\n    margin: 0 0 0 auto;\n}\n.ql-editor .ql-bg-black {\n    background-color: #000;\n}\n.ql-editor .ql-bg-red {\n    background-color: #e60000;\n}\n.ql-editor .ql-bg-orange {\n    background-color: #f90;\n}\n.ql-editor .ql-bg-yellow {\n    background-color: #ff0;\n}\n.ql-editor .ql-bg-green {\n    background-color: #008a00;\n}\n.ql-editor .ql-bg-blue {\n    background-color: #06c;\n}\n.ql-editor .ql-bg-purple {\n    background-color: #93f;\n}\n.ql-editor .ql-color-white {\n    color: #fff;\n}\n.ql-editor .ql-color-red {\n    color: #e60000;\n}\n.ql-editor .ql-color-orange {\n    color: #f90;\n}\n.ql-editor .ql-color-yellow {\n    color: #ff0;\n}\n.ql-editor .ql-color-green {\n    color: #008a00;\n}\n.ql-editor .ql-color-blue {\n    color: #06c;\n}\n.ql-editor .ql-color-purple {\n    color: #93f;\n}\n.ql-editor .ql-font-serif {\n    font-family: Georgia, Times New Roman, serif;\n}\n.ql-editor .ql-font-monospace {\n    font-family: Monaco, Courier New, monospace;\n}\n.ql-editor .ql-size-small {\n    font-size: 0.75rem;\n}\n.ql-editor .ql-size-large {\n    font-size: 1.5rem;\n}\n.ql-editor .ql-size-huge {\n    font-size: 2.5rem;\n}\n.ql-editor .ql-direction-rtl {\n    direction: rtl;\n    text-align: inherit;\n}\n.ql-editor .ql-align-center {\n    text-align: center;\n}\n.ql-editor .ql-align-justify {\n    text-align: justify;\n}\n.ql-editor .ql-align-right {\n    text-align: right;\n}\n.ql-editor.ql-blank::before {\n    color: rgba(0, 0, 0, 0.6);\n    content: attr(data-placeholder);\n    font-style: italic;\n    left: 15px;\n    pointer-events: none;\n    position: absolute;\n    right: 15px;\n}\n.ql-snow.ql-toolbar:after,\n.ql-snow .ql-toolbar:after {\n    clear: both;\n    content: '';\n    display: table;\n}\n.ql-snow.ql-toolbar button,\n.ql-snow .ql-toolbar button {\n    background: none;\n    border: none;\n    cursor: pointer;\n    display: inline-block;\n    float: left;\n    height: 24px;\n    padding: 3px 5px;\n    width: 28px;\n}\n.ql-snow.ql-toolbar button svg,\n.ql-snow .ql-toolbar button svg {\n    float: left;\n    height: 100%;\n}\n.ql-snow.ql-toolbar button:active:hover,\n.ql-snow .ql-toolbar button:active:hover {\n    outline: none;\n}\n.ql-snow.ql-toolbar input.ql-image[type='file'],\n.ql-snow .ql-toolbar input.ql-image[type='file'] {\n    display: none;\n}\n.ql-snow.ql-toolbar button:hover,\n.ql-snow .ql-toolbar button:hover,\n.ql-snow.ql-toolbar button:focus,\n.ql-snow .ql-toolbar button:focus,\n.ql-snow.ql-toolbar button.ql-active,\n.ql-snow .ql-toolbar button.ql-active,\n.ql-snow.ql-toolbar .ql-picker-label:hover,\n.ql-snow .ql-toolbar .ql-picker-label:hover,\n.ql-snow.ql-toolbar .ql-picker-label.ql-active,\n.ql-snow .ql-toolbar .ql-picker-label.ql-active,\n.ql-snow.ql-toolbar .ql-picker-item:hover,\n.ql-snow .ql-toolbar .ql-picker-item:hover,\n.ql-snow.ql-toolbar .ql-picker-item.ql-selected,\n.ql-snow .ql-toolbar .ql-picker-item.ql-selected {\n    color: #06c;\n}\n.ql-snow.ql-toolbar button:hover .ql-fill,\n.ql-snow .ql-toolbar button:hover .ql-fill,\n.ql-snow.ql-toolbar button:focus .ql-fill,\n.ql-snow .ql-toolbar button:focus .ql-fill,\n.ql-snow.ql-toolbar button.ql-active .ql-fill,\n.ql-snow .ql-toolbar button.ql-active .ql-fill,\n.ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,\n.ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,\n.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,\n.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,\n.ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,\n.ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,\n.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,\n.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,\n.ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,\n.ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,\n.ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,\n.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,\n.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,\n.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,\n.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {\n    fill: #06c;\n}\n.ql-snow.ql-toolbar button:hover .ql-stroke,\n.ql-snow .ql-toolbar button:hover .ql-stroke,\n.ql-snow.ql-toolbar button:focus .ql-stroke,\n.ql-snow .ql-toolbar button:focus .ql-stroke,\n.ql-snow.ql-toolbar button.ql-active .ql-stroke,\n.ql-snow .ql-toolbar button.ql-active .ql-stroke,\n.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,\n.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,\n.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,\n.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,\n.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,\n.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,\n.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,\n.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,\n.ql-snow.ql-toolbar button:hover .ql-stroke-miter,\n.ql-snow .ql-toolbar button:hover .ql-stroke-miter,\n.ql-snow.ql-toolbar button:focus .ql-stroke-miter,\n.ql-snow .ql-toolbar button:focus .ql-stroke-miter,\n.ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,\n.ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,\n.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,\n.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,\n.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,\n.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,\n.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,\n.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,\n.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,\n.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {\n    stroke: #06c;\n}\n@media (pointer: coarse) {\n    .ql-snow.ql-toolbar button:hover:not(.ql-active),\n    .ql-snow .ql-toolbar button:hover:not(.ql-active) {\n        color: #444;\n    }\n    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-fill,\n    .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-fill,\n    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,\n    .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill {\n        fill: #444;\n    }\n    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke,\n    .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke,\n    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,\n    .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter {\n        stroke: #444;\n    }\n}\n.ql-snow {\n    box-sizing: border-box;\n}\n.ql-snow * {\n    box-sizing: border-box;\n}\n.ql-snow .ql-hidden {\n    display: none;\n}\n.ql-snow .ql-out-bottom,\n.ql-snow .ql-out-top {\n    visibility: hidden;\n}\n.ql-snow .ql-tooltip {\n    position: absolute;\n    transform: translateY(10px);\n}\n.ql-snow .ql-tooltip a {\n    cursor: pointer;\n    text-decoration: none;\n}\n.ql-snow .ql-tooltip.ql-flip {\n    transform: translateY(-10px);\n}\n.ql-snow .ql-formats {\n    display: inline-block;\n    vertical-align: middle;\n}\n.ql-snow .ql-formats:after {\n    clear: both;\n    content: '';\n    display: table;\n}\n.ql-snow .ql-stroke {\n    fill: none;\n    stroke: #444;\n    stroke-linecap: round;\n    stroke-linejoin: round;\n    stroke-width: 2;\n}\n.ql-snow .ql-stroke-miter {\n    fill: none;\n    stroke: #444;\n    stroke-miterlimit: 10;\n    stroke-width: 2;\n}\n.ql-snow .ql-fill,\n.ql-snow .ql-stroke.ql-fill {\n    fill: #444;\n}\n.ql-snow .ql-empty {\n    fill: none;\n}\n.ql-snow .ql-even {\n    fill-rule: evenodd;\n}\n.ql-snow .ql-thin,\n.ql-snow .ql-stroke.ql-thin {\n    stroke-width: 1;\n}\n.ql-snow .ql-transparent {\n    opacity: 0.4;\n}\n.ql-snow .ql-direction svg:last-child {\n    display: none;\n}\n.ql-snow .ql-direction.ql-active svg:last-child {\n    display: inline;\n}\n.ql-snow .ql-direction.ql-active svg:first-child {\n    display: none;\n}\n.ql-snow .ql-editor h1 {\n    font-size: 2rem;\n}\n.ql-snow .ql-editor h2 {\n    font-size: 1.5rem;\n}\n.ql-snow .ql-editor h3 {\n    font-size: 1.17rem;\n}\n.ql-snow .ql-editor h4 {\n    font-size: 1rem;\n}\n.ql-snow .ql-editor h5 {\n    font-size: 0.83rem;\n}\n.ql-snow .ql-editor h6 {\n    font-size: 0.67rem;\n}\n.ql-snow .ql-editor a {\n    text-decoration: underline;\n}\n.ql-snow .ql-editor blockquote {\n    border-left: 4px solid #ccc;\n    margin-bottom: 5px;\n    margin-top: 5px;\n    padding-left: 16px;\n}\n.ql-snow .ql-editor code,\n.ql-snow .ql-editor pre {\n    background-color: #f0f0f0;\n    border-radius: 3px;\n}\n.ql-snow .ql-editor pre {\n    white-space: pre-wrap;\n    margin-bottom: 5px;\n    margin-top: 5px;\n    padding: 5px 10px;\n}\n.ql-snow .ql-editor code {\n    font-size: 85%;\n    padding: 2px 4px;\n}\n.ql-snow .ql-editor pre.ql-syntax {\n    background-color: #23241f;\n    color: #f8f8f2;\n    overflow: visible;\n}\n.ql-snow .ql-editor img {\n    max-width: 100%;\n}\n.ql-snow .ql-picker {\n    color: #444;\n    display: inline-block;\n    float: left;\n    font-size: 14px;\n    font-weight: 500;\n    height: 24px;\n    position: relative;\n    vertical-align: middle;\n}\n.ql-snow .ql-picker-label {\n    cursor: pointer;\n    display: inline-block;\n    height: 100%;\n    padding-left: 8px;\n    padding-right: 2px;\n    position: relative;\n    width: 100%;\n}\n.ql-snow .ql-picker-label::before {\n    display: inline-block;\n    line-height: 22px;\n}\n.ql-snow .ql-picker-options {\n    background-color: #fff;\n    display: none;\n    min-width: 100%;\n    padding: 4px 8px;\n    position: absolute;\n    white-space: nowrap;\n}\n.ql-snow .ql-picker-options .ql-picker-item {\n    cursor: pointer;\n    display: block;\n    padding-bottom: 5px;\n    padding-top: 5px;\n}\n.ql-snow .ql-picker.ql-expanded .ql-picker-label {\n    color: #ccc;\n    z-index: 2;\n}\n.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {\n    fill: #ccc;\n}\n.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {\n    stroke: #ccc;\n}\n.ql-snow .ql-picker.ql-expanded .ql-picker-options {\n    display: block;\n    margin-top: -1px;\n    top: 100%;\n    z-index: 1;\n}\n.ql-snow .ql-color-picker,\n.ql-snow .ql-icon-picker {\n    width: 28px;\n}\n.ql-snow .ql-color-picker .ql-picker-label,\n.ql-snow .ql-icon-picker .ql-picker-label {\n    padding: 2px 4px;\n}\n.ql-snow .ql-color-picker .ql-picker-label svg,\n.ql-snow .ql-icon-picker .ql-picker-label svg {\n    right: 4px;\n}\n.ql-snow .ql-icon-picker .ql-picker-options {\n    padding: 4px 0px;\n}\n.ql-snow .ql-icon-picker .ql-picker-item {\n    height: 24px;\n    width: 24px;\n    padding: 2px 4px;\n}\n.ql-snow .ql-color-picker .ql-picker-options {\n    padding: 3px 5px;\n    width: 152px;\n}\n.ql-snow .ql-color-picker .ql-picker-item {\n    border: 1px solid transparent;\n    float: left;\n    height: 16px;\n    margin: 2px;\n    padding: 0px;\n    width: 16px;\n}\n.ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {\n    position: absolute;\n    margin-top: -9px;\n    right: 0;\n    top: 50%;\n    width: 18px;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-label]:not([data-label=''])::before,\n.ql-snow .ql-picker.ql-font .ql-picker-label[data-label]:not([data-label=''])::before,\n.ql-snow .ql-picker.ql-size .ql-picker-label[data-label]:not([data-label=''])::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-label]:not([data-label=''])::before,\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-label]:not([data-label=''])::before,\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-label]:not([data-label=''])::before {\n    content: attr(data-label);\n}\n.ql-snow .ql-picker.ql-header {\n    width: 98px;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item::before {\n    content: 'Normal';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {\n    content: 'Heading 1';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {\n    content: 'Heading 2';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {\n    content: 'Heading 3';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {\n    content: 'Heading 4';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {\n    content: 'Heading 5';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {\n    content: 'Heading 6';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {\n    font-size: 2rem;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {\n    font-size: 1.5rem;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {\n    font-size: 1.17rem;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {\n    font-size: 1rem;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {\n    font-size: 0.83rem;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {\n    font-size: 0.67rem;\n}\n.ql-snow .ql-picker.ql-font {\n    width: 108px;\n}\n.ql-snow .ql-picker.ql-font .ql-picker-label::before,\n.ql-snow .ql-picker.ql-font .ql-picker-item::before {\n    content: 'Sans Serif';\n}\n.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {\n    content: 'Serif';\n}\n.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {\n    content: 'Monospace';\n}\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {\n    font-family: Georgia, Times New Roman, serif;\n}\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {\n    font-family: Monaco, Courier New, monospace;\n}\n.ql-snow .ql-picker.ql-size {\n    width: 98px;\n}\n.ql-snow .ql-picker.ql-size .ql-picker-label::before,\n.ql-snow .ql-picker.ql-size .ql-picker-item::before {\n    content: 'Normal';\n}\n.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {\n    content: 'Small';\n}\n.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {\n    content: 'Large';\n}\n.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {\n    content: 'Huge';\n}\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {\n    font-size: 10px;\n}\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {\n    font-size: 18px;\n}\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {\n    font-size: 32px;\n}\n.ql-snow .ql-color-picker.ql-background .ql-picker-item {\n    background-color: #fff;\n}\n.ql-snow .ql-color-picker.ql-color .ql-picker-item {\n    background-color: #000;\n}\n.ql-toolbar.ql-snow {\n    border: 1px solid #ccc;\n    box-sizing: border-box;\n    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;\n    padding: 8px;\n}\n.ql-toolbar.ql-snow .ql-formats {\n    margin-right: 15px;\n}\n.ql-toolbar.ql-snow .ql-picker-label {\n    border: 1px solid transparent;\n}\n.ql-toolbar.ql-snow .ql-picker-options {\n    border: 1px solid transparent;\n    box-shadow: rgba(0, 0, 0, 0.2) 0 2px 8px;\n}\n.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {\n    border-color: #ccc;\n}\n.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {\n    border-color: #ccc;\n}\n.ql-toolbar.ql-snow .ql-color-picker .ql-picker-item.ql-selected,\n.ql-toolbar.ql-snow .ql-color-picker .ql-picker-item:hover {\n    border-color: #000;\n}\n.ql-toolbar.ql-snow + .ql-container.ql-snow {\n    border-top: 0px;\n}\n.ql-snow .ql-tooltip {\n    background-color: #fff;\n    border: 1px solid #ccc;\n    box-shadow: 0px 0px 5px #ddd;\n    color: #444;\n    padding: 5px 12px;\n    white-space: nowrap;\n}\n.ql-snow .ql-tooltip::before {\n    content: 'Visit URL:';\n    line-height: 26px;\n    margin-right: 8px;\n}\n.ql-snow .ql-tooltip input[type='text'] {\n    display: none;\n    border: 1px solid #ccc;\n    font-size: 13px;\n    height: 26px;\n    margin: 0px;\n    padding: 3px 5px;\n    width: 170px;\n}\n.ql-snow .ql-tooltip a.ql-preview {\n    display: inline-block;\n    max-width: 200px;\n    overflow-x: hidden;\n    text-overflow: ellipsis;\n    vertical-align: top;\n}\n.ql-snow .ql-tooltip a.ql-action::after {\n    border-right: 1px solid #ccc;\n    content: 'Edit';\n    margin-left: 16px;\n    padding-right: 8px;\n}\n.ql-snow .ql-tooltip a.ql-remove::before {\n    content: 'Remove';\n    margin-left: 8px;\n}\n.ql-snow .ql-tooltip a {\n    line-height: 26px;\n}\n.ql-snow .ql-tooltip.ql-editing a.ql-preview,\n.ql-snow .ql-tooltip.ql-editing a.ql-remove {\n    display: none;\n}\n.ql-snow .ql-tooltip.ql-editing input[type='text'] {\n    display: inline-block;\n}\n.ql-snow .ql-tooltip.ql-editing a.ql-action::after {\n    border-right: 0px;\n    content: 'Save';\n    padding-right: 0px;\n}\n.ql-snow .ql-tooltip[data-mode='link']::before {\n    content: 'Enter link:';\n}\n.ql-snow .ql-tooltip[data-mode='formula']::before {\n    content: 'Enter formula:';\n}\n.ql-snow .ql-tooltip[data-mode='video']::before {\n    content: 'Enter video:';\n}\n.ql-snow a {\n    color: #06c;\n}\n.ql-container.ql-snow {\n    border: 1px solid #ccc;\n}\n";
var classes = {
  root: 'p-editor-container',
  toolbar: 'p-editor-toolbar',
  content: 'p-editor-content'
};
var _useStyle = useStyle(quillStyles, {
    name: 'editor',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$1 = {
  name: 'BaseEditor',
  "extends": BaseComponent,
  props: {
    modelValue: String,
    placeholder: String,
    readonly: Boolean,
    formats: Array,
    editorStyle: null,
    modules: null
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  },
  beforeMount: function beforeMount() {
    loadStyle();
  },
  css: {
    classes: classes
  }
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var QuillJS = function () {
  try {
    return window.Quill;
  } catch (_unused) {
    return null;
  }
}();
var script = {
  name: 'Editor',
  "extends": script$1,
  emits: ['update:modelValue', 'text-change', 'selection-change', 'load'],
  data: function data() {
    return {
      reRenderColorKey: 0
    };
  },
  quill: null,
  watch: {
    modelValue: function modelValue(newValue, oldValue) {
      if (newValue !== oldValue && this.quill && !this.quill.hasFocus()) {
        this.reRenderColorKey++;
        this.renderValue(newValue);
      }
    }
  },
  mounted: function mounted() {
    var _this = this;
    var configuration = {
      modules: _objectSpread({
        toolbar: this.$refs.toolbarElement
      }, this.modules),
      readOnly: this.readonly,
      theme: 'snow',
      formats: this.formats,
      placeholder: this.placeholder
    };
    if (QuillJS) {
      // Loaded by script only
      this.quill = new QuillJS(this.$refs.editorElement, configuration);
      this.initQuill();
      this.handleLoad();
    } else {
      import('quill').then(function (module) {
        if (module && DomHandler.isExist(_this.$refs.editorElement)) {
          if (module["default"]) {
            // webpack
            _this.quill = new module["default"](_this.$refs.editorElement, configuration);
          } else {
            // parceljs
            _this.quill = new module(_this.$refs.editorElement, configuration);
          }
          _this.initQuill();
        }
      }).then(function () {
        _this.handleLoad();
      });
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.quill = null;
  },
  methods: {
    renderValue: function renderValue(value) {
      if (this.quill) {
        if (value) this.quill.setContents(this.quill.clipboard.convert(value));else this.quill.setText('');
      }
    },
    initQuill: function initQuill() {
      var _this2 = this;
      this.renderValue(this.modelValue);
      this.quill.on('text-change', function (delta, oldContents, source) {
        if (source === 'user') {
          var html = _this2.$refs.editorElement.children[0].innerHTML;
          var text = _this2.quill.getText().trim();
          if (html === '<p><br></p>') {
            html = '';
          }
          _this2.$emit('update:modelValue', html);
          _this2.$emit('text-change', {
            htmlValue: html,
            textValue: text,
            delta: delta,
            source: source,
            instance: _this2.quill
          });
        }
      });
      this.quill.on('selection-change', function (range, oldRange, source) {
        var html = _this2.$refs.editorElement.children[0].innerHTML;
        var text = _this2.quill.getText().trim();
        _this2.$emit('selection-change', {
          htmlValue: html,
          textValue: text,
          range: range,
          oldRange: oldRange,
          source: source,
          instance: _this2.quill
        });
      });
    },
    handleLoad: function handleLoad() {
      if (this.quill && this.quill.getModule('toolbar')) {
        this.$emit('load', {
          instance: this.quill
        });
      }
    }
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptm('root'), {
    "data-pc-name": "editor"
  }), [createElementVNode("div", mergeProps({
    ref: "toolbarElement",
    "class": _ctx.cx('toolbar')
  }, _ctx.ptm('toolbar')), [renderSlot(_ctx.$slots, "toolbar", {}, function () {
    return [createElementVNode("span", mergeProps({
      "class": "ql-formats"
    }, _ctx.ptm('formats')), [createElementVNode("select", mergeProps({
      "class": "ql-header",
      defaultValue: "0"
    }, _ctx.ptm('header')), [createElementVNode("option", mergeProps({
      value: "1"
    }, _ctx.ptm('option')), "Heading", 16), createElementVNode("option", mergeProps({
      value: "2"
    }, _ctx.ptm('option')), "Subheading", 16), createElementVNode("option", mergeProps({
      value: "0"
    }, _ctx.ptm('option')), "Normal", 16)], 16), createElementVNode("select", mergeProps({
      "class": "ql-font"
    }, _ctx.ptm('font')), [createElementVNode("option", normalizeProps(guardReactiveProps(_ctx.ptm('option'))), null, 16), createElementVNode("option", mergeProps({
      value: "serif"
    }, _ctx.ptm('option')), null, 16), createElementVNode("option", mergeProps({
      value: "monospace"
    }, _ctx.ptm('option')), null, 16)], 16)], 16), createElementVNode("span", mergeProps({
      "class": "ql-formats"
    }, _ctx.ptm('formats')), [createElementVNode("button", mergeProps({
      "class": "ql-bold",
      type: "button"
    }, _ctx.ptm('bold')), null, 16), createElementVNode("button", mergeProps({
      "class": "ql-italic",
      type: "button"
    }, _ctx.ptm('italic')), null, 16), createElementVNode("button", mergeProps({
      "class": "ql-underline",
      type: "button"
    }, _ctx.ptm('underline')), null, 16)], 16), (openBlock(), createElementBlock("span", mergeProps({
      key: $data.reRenderColorKey,
      "class": "ql-formats"
    }, _ctx.ptm('formats')), [createElementVNode("select", mergeProps({
      "class": "ql-color"
    }, _ctx.ptm('color')), null, 16), createElementVNode("select", mergeProps({
      "class": "ql-background"
    }, _ctx.ptm('background')), null, 16)], 16)), createElementVNode("span", mergeProps({
      "class": "ql-formats"
    }, _ctx.ptm('formats')), [createElementVNode("button", mergeProps({
      "class": "ql-list",
      value: "ordered",
      type: "button"
    }, _ctx.ptm('list')), null, 16), createElementVNode("button", mergeProps({
      "class": "ql-list",
      value: "bullet",
      type: "button"
    }, _ctx.ptm('list')), null, 16), createElementVNode("select", mergeProps({
      "class": "ql-align"
    }, _ctx.ptm('select')), [createElementVNode("option", mergeProps({
      defaultValue: ""
    }, _ctx.ptm('option')), null, 16), createElementVNode("option", mergeProps({
      value: "center"
    }, _ctx.ptm('option')), null, 16), createElementVNode("option", mergeProps({
      value: "right"
    }, _ctx.ptm('option')), null, 16), createElementVNode("option", mergeProps({
      value: "justify"
    }, _ctx.ptm('option')), null, 16)], 16)], 16), createElementVNode("span", mergeProps({
      "class": "ql-formats"
    }, _ctx.ptm('formats')), [createElementVNode("button", mergeProps({
      "class": "ql-link",
      type: "button"
    }, _ctx.ptm('link')), null, 16), createElementVNode("button", mergeProps({
      "class": "ql-image",
      type: "button"
    }, _ctx.ptm('image')), null, 16), createElementVNode("button", mergeProps({
      "class": "ql-code-block",
      type: "button"
    }, _ctx.ptm('codeBlock')), null, 16)], 16), createElementVNode("span", mergeProps({
      "class": "ql-formats"
    }, _ctx.ptm('formats')), [createElementVNode("button", mergeProps({
      "class": "ql-clean",
      type: "button"
    }, _ctx.ptm('clean')), null, 16)], 16)];
  })], 16), createElementVNode("div", mergeProps({
    ref: "editorElement",
    "class": _ctx.cx('content'),
    style: _ctx.editorStyle
  }, _ctx.ptm('content')), null, 16)], 16);
}

script.render = render;

export { script as default };
