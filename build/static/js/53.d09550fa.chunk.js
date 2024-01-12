(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{315:function(e,t,n){var r,s,i;s=[n(0)],void 0===(i="function"===typeof(r=function(e){"use strict";function t(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var n=[],r=!0,s=!1,i=void 0;try{for(var a,o=e[Symbol.iterator]();!(r=(a=o.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){s=!0,i=e}finally{try{r||null==o.return||o.return()}finally{if(s)throw i}}return n}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(n,!0).forEach(function(t){o(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l=function(){function r(){var t=this,i=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,r),o(this,"showMessageFor",function(e){t.visibleFields.includes(e)||t.visibleFields.push(e),t.helpers.forceUpdateIfNeeded()}),o(this,"hideMessageFor",function(e){var n=t.visibleFields.indexOf(e);-1<n&&t.visibleFields.splice(n,1),t.helpers.forceUpdateIfNeeded()}),o(this,"helpers",{parent:this,passes:function(e,t,n,r){return r.hasOwnProperty(e)?!(this.isRequired(e,r)||!this.isBlank(t))||!1!==r[e].rule(t,n,this.parent):(console.error("Rule Not Found: There is no rule with the name ".concat(e,".")),!0)},isRequired:function(e,t){return t[e].hasOwnProperty("required")&&t[e].required},isBlank:function(e){return null==e||this.testRegex(e,/^[\s]*$/)},normalizeValues:function(e,t){return[this.valueOrEmptyString(e),this.getValidation(t),this.getOptions(t)]},getValidation:function(e){return e===Object(e)&&Object.keys(e).length?Object.keys(e)[0]:e.split(":")[0]},getOptions:function(e){if(e===Object(e)&&Object.values(e).length){var t=Object.values(e)[0];return Array.isArray(t)?t:[t]}return 1<(t=e.split(":")).length?t[1].split(","):[]},valueOrEmptyString:function(e){return null==e?"":e},toSentence:function(e){return e.slice(0,-2).join(", ")+(e.slice(0,-2).length?", ":"")+e.slice(-2).join(2<e.length?", or ":" or ")},testRegex:function(e,t){return null!==e.toString().match(t)},forceUpdateIfNeeded:function(){this.parent.autoForceUpdate&&this.parent.autoForceUpdate.forceUpdate()},message:function(e,t,n,r){n.messages=n.messages||{};var s=n.messages[e]||n.messages.default||this.parent.messages[e]||this.parent.messages.default||r[e].message;return s.replace(":attribute",this.humanizeFieldName(t))},humanizeFieldName:function(e){return e.replace(/([A-Z])/g," $1").replace(/_/g," ").toLowerCase()},element:function(e,t){var n=t.element||this.parent.element;return n(e,t.className)},numeric:function(e){return this.testRegex(e,/^(\d+.?\d*)?$/)},momentInstalled:function(){return!(!window||!window.moment)||(console.warn("Date validators require using momentjs https://momentjs.com and moment objects."),!1)},size:function(e,t){return"string"===t||void 0===t||"array"===t?e.length:"num"===t?parseFloat(e):void 0},sizeText:function(e){return"string"===e||void 0===e?" characters":"array"===e?" elements":""}}),this.fields={},this.visibleFields=[],this.errorMessages={},this.messagesShown=!1,this.rules=s({accepted:{message:"The :attribute must be accepted.",rule:function(e){return!0===e},required:!0},after:{message:"The :attribute must be after :date.",rule:function(e,n){return t.helpers.momentInstalled()&&moment.isMoment(e)&&e.isAfter(n[0],"day")},messageReplace:function(e,t){return e.replace(":date",t[0].format("MM/DD/YYYY"))}},after_or_equal:{message:"The :attribute must be after or on :date.",rule:function(e,n){return t.helpers.momentInstalled()&&moment.isMoment(e)&&e.isSameOrAfter(n[0],"day")},messageReplace:function(e,t){return e.replace(":date",t[0].format("MM/DD/YYYY"))}},alpha:{message:"The :attribute may only contain letters.",rule:function(e){return t.helpers.testRegex(e,/^[A-Z]*$/i)}},alpha_space:{message:"The :attribute may only contain letters and spaces.",rule:function(e){return t.helpers.testRegex(e,/^[A-Z\s]*$/i)}},alpha_num:{message:"The :attribute may only contain letters and numbers.",rule:function(e){return t.helpers.testRegex(e,/^[A-Z0-9]*$/i)}},alpha_num_space:{message:"The :attribute may only contain letters, numbers, and spaces.",rule:function(e){return t.helpers.testRegex(e,/^[A-Z0-9\s]*$/i)}},alpha_num_dash:{message:"The :attribute may only contain letters, numbers, and dashes.",rule:function(e){return t.helpers.testRegex(e,/^[A-Z0-9_-]*$/i)}},alpha_num_dash_space:{message:"The :attribute may only contain letters, numbers, dashes, and spaces.",rule:function(e){return t.helpers.testRegex(e,/^[A-Z0-9_-\s]*$/i)}},array:{message:"The :attribute must be an array.",rule:function(e){return Array.isArray(e)}},before:{message:"The :attribute must be before :date.",rule:function(e,n){return t.helpers.momentInstalled()&&moment.isMoment(e)&&e.isBefore(n[0],"day")},messageReplace:function(e,t){return e.replace(":date",t[0].format("MM/DD/YYYY"))}},before_or_equal:{message:"The :attribute must be before or on :date.",rule:function(e,n){return t.helpers.momentInstalled()&&moment.isMoment(e)&&e.isSameOrBefore(n[0],"day")},messageReplace:function(e,t){return e.replace(":date",t[0].format("MM/DD/YYYY"))}},between:{message:"The :attribute must be between :min and :max:type.",rule:function(e,n){return t.helpers.size(e,n[2])>=parseFloat(n[0])&&t.helpers.size(e,n[2])<=parseFloat(n[1])},messageReplace:function(e,n){return e.replace(":min",n[0]).replace(":max",n[1]).replace(":type",t.helpers.sizeText(n[2]))}},boolean:{message:"The :attribute must be a boolean.",rule:function(e){return!1===e||!0===e}},card_exp:{message:"The :attribute must be a valid expiration date.",rule:function(e){return t.helpers.testRegex(e,/^(([0]?[1-9]{1})|([1]{1}[0-2]{1}))\s?\/\s?(\d{2}|\d{4})$/)}},card_num:{message:"The :attribute must be a valid credit card number.",rule:function(e){return t.helpers.testRegex(e,/^\d{4}\s?\d{4,6}\s?\d{4,5}\s?\d{0,8}$/)}},currency:{message:"The :attribute must be a valid currency.",rule:function(e){return t.helpers.testRegex(e,/^\$?(\d{1,3})(\,?\d{3})*\.?\d{0,2}$/)}},date:{message:"The :attribute must be a date.",rule:function(e){return t.helpers.momentInstalled()&&moment.isMoment(e)}},date_equals:{message:"The :attribute must be on :date.",rule:function(e,n){return t.helpers.momentInstalled()&&moment.isMoment(e)&&e.isSame(n[0],"day")},messageReplace:function(e,t){return e.replace(":date",t[0].format("MM/DD/YYYY"))}},email:{message:"The :attribute must be a valid email address.",rule:function(e){return t.helpers.testRegex(e,/^[A-Z0-9.!#$%&'*+-\/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)}},in:{message:"The selected :attribute must be :values.",rule:function(e,t){return t.includes(e)},messageReplace:function(e,n){return e.replace(":values",t.helpers.toSentence(n))}},integer:{message:"The :attribute must be an integer.",rule:function(e){return t.helpers.testRegex(e,/^\d*$/)}},max:{message:"The :attribute may not be greater than :max:type.",rule:function(e,n){return t.helpers.size(e,n[1])<=parseFloat(n[0])},messageReplace:function(e,n){return e.replace(":max",n[0]).replace(":type",t.helpers.sizeText(n[1]))}},min:{message:"The :attribute must be at least :min:type.",rule:function(e,n){return t.helpers.size(e,n[1])>=parseFloat(n[0])},messageReplace:function(e,n){return e.replace(":min",n[0]).replace(":type",t.helpers.sizeText(n[1]))}},not_in:{message:"The selected :attribute must not be :values.",rule:function(e,t){return!t.includes(e)},messageReplace:function(e,n){return e.replace(":values",t.helpers.toSentence(n))}},not_regex:{message:"The :attribute must not match the required pattern.",rule:function(e,n){return!t.helpers.testRegex(e,"string"==typeof n[0]||n[0]instanceof String?new RegExp(n[0]):n[0])}},numeric:{message:"The :attribute must be a number.",rule:function(e){return t.helpers.numeric(e)}},phone:{message:"The :attribute must be a valid phone number.",rule:function(e){return t.helpers.testRegex(e,/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/)}},regex:{message:"The :attribute must match the required pattern.",rule:function(e,n){return t.helpers.testRegex(e,"string"==typeof n[0]||n[0]instanceof String?new RegExp(n[0]):n[0])}},required:{message:"The :attribute field is required.",rule:function(e){return!t.helpers.isBlank(e)},required:!0},size:{message:"The :attribute must be :size:type.",rule:function(e,n){return t.helpers.size(e,n[1])==parseFloat(n[0])},messageReplace:function(e,n){return e.replace(":size",n[0]).replace(":type",t.helpers.sizeText(n[1]))}},string:{message:"The :attribute must be a string.",rule:function(e){return n(e)===n("string")}},typeof:{message:"The :attribute is not the correct type of :type.",rule:function(e,t){return n(e)===n(t[0])},messageReplace:function(e,t){return e.replace(":type",n(t[0]))}},url:{message:"The :attribute must be a url.",rule:function(e){return t.helpers.testRegex(e,/^(https?|ftp):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i)}}},i.validators||{}),r.locales.hasOwnProperty(i.locale)||console.warn("Locale not found! Make sure it is spelled correctly and the locale file is loaded.");var a=r.locales[i.locale]||{};Object.keys(this.rules).forEach(function(e){t.rules[e].message=a[e]||t.rules[e].message}),this.messages=i.messages||{},this.className=i.className,this.autoForceUpdate=i.autoForceUpdate||!1,!1===i.element?this.element=function(e){return e}:i.hasOwnProperty("element")?this.element=i.element:"object"===("undefined"==typeof navigator?"undefined":n(navigator))&&"ReactNative"===navigator.product?this.element=function(e){return e}:this.element=function(n,r){return e.createElement("div",{className:r||t.className||"srv-validation-message"},n)}}return a(r,null,[{key:"addLocale",value:function(e,t){this.locales[e]=t}}]),a(r,[{key:"getErrorMessages",value:function(){return this.errorMessages}},{key:"showMessages",value:function(){this.messagesShown=!0,this.helpers.forceUpdateIfNeeded()}},{key:"hideMessages",value:function(){this.messagesShown=!1,this.helpers.forceUpdateIfNeeded()}},{key:"allValid",value:function(){for(var e in this.fields)if(!1===this.fieldValid(e))return!1;return!0}},{key:"fieldValid",value:function(e){return this.fields.hasOwnProperty(e)&&!0===this.fields[e]}},{key:"purgeFields",value:function(){this.fields={},this.errorMessages={}}},{key:"messageWhenPresent",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if(!this.helpers.isBlank(e)&&this.messagesShown)return this.helpers.element(e,t)}},{key:"messageAlways",value:function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};if(console.warn("The messageAlways() method is deprecated in SimpleReactValidator. Please see the documentation and switch to the messageWhenPresent() method."),t&&this.messagesShown)return this.helpers.element(t,n)}},{key:"message",value:function(e,n,r){var i=3<arguments.length&&void 0!==arguments[3]?arguments[3]:{};this.errorMessages[e]=null,this.fields[e]=!0,Array.isArray(r)||(r=r.split("|"));var a=i.validators?s({},this.rules,{},i.validators):this.rules,o=!0,l=!1,u=void 0;try{for(var c,p=r[Symbol.iterator]();!(o=(c=p.next()).done);o=!0){var f=c.value,h=t(this.helpers.normalizeValues(n,f),3),d=h[0],g=h[1],m=h[2];if(!this.helpers.passes(g,d,m,a)){this.fields[e]=!1;var y=this.helpers.message(g,e,i,a);if(0<m.length&&a[g].hasOwnProperty("messageReplace")&&(y=a[g].messageReplace(y,m)),this.errorMessages[e]=y,this.messagesShown||this.visibleFields.includes(e))return this.helpers.element(y,i)}}}catch(e){l=!0,u=e}finally{try{o||null==p.return||p.return()}finally{if(l)throw u}}}}]),r}();return o(l,"version","1.2.4"),o(l,"locales",{en:{}}),l})?r.apply(t,s):r)||(e.exports=i)},331:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),i=o(s),a=o(n(2));function o(e){return e&&e.__esModule?e:{default:e}}var l=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleTriggerClick=n.handleTriggerClick.bind(n),n.handleTransitionEnd=n.handleTransitionEnd.bind(n),n.continueOpenCollapsible=n.continueOpenCollapsible.bind(n),n.setInnerRef=n.setInnerRef.bind(n),e.open?n.state={isClosed:!1,shouldSwitchAutoOnNextCycle:!1,height:"auto",transition:"none",hasBeenOpened:!0,overflow:e.overflowWhenOpen,inTransition:!1}:n.state={isClosed:!0,shouldSwitchAutoOnNextCycle:!1,height:0,transition:"height "+e.transitionTime+"ms "+e.easing,hasBeenOpened:!1,overflow:"hidden",inTransition:!1},n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,s.Component),r(t,[{key:"componentDidUpdate",value:function(e,t){var n=this;this.state.shouldOpenOnNextCycle&&this.continueOpenCollapsible(),"auto"===t.height&&!0===this.state.shouldSwitchAutoOnNextCycle&&window.setTimeout(function(){n.setState({height:0,overflow:"hidden",isClosed:!0,shouldSwitchAutoOnNextCycle:!1})},50),e.open!==this.props.open&&(!0===this.props.open?(this.openCollapsible(),this.props.onOpening()):(this.closeCollapsible(),this.props.onClosing()))}},{key:"closeCollapsible",value:function(){this.setState({shouldSwitchAutoOnNextCycle:!0,height:this.innerRef.offsetHeight,transition:"height "+(this.props.transitionCloseTime?this.props.transitionCloseTime:this.props.transitionTime)+"ms "+this.props.easing,inTransition:!0})}},{key:"openCollapsible",value:function(){this.setState({inTransition:!0,shouldOpenOnNextCycle:!0})}},{key:"continueOpenCollapsible",value:function(){this.setState({height:this.innerRef.offsetHeight,transition:"height "+this.props.transitionTime+"ms "+this.props.easing,isClosed:!1,hasBeenOpened:!0,inTransition:!0,shouldOpenOnNextCycle:!1})}},{key:"handleTriggerClick",value:function(e){e.preventDefault(),this.props.triggerDisabled||(this.props.handleTriggerClick?this.props.handleTriggerClick(this.props.accordionPosition):!0===this.state.isClosed?(this.openCollapsible(),this.props.onOpening()):(this.closeCollapsible(),this.props.onClosing()))}},{key:"renderNonClickableTriggerElement",value:function(){return this.props.triggerSibling&&"string"===typeof this.props.triggerSibling?i.default.createElement("span",{className:this.props.classParentString+"__trigger-sibling"},this.props.triggerSibling):this.props.triggerSibling?i.default.createElement(this.props.triggerSibling,null):null}},{key:"handleTransitionEnd",value:function(){this.state.isClosed?(this.setState({inTransition:!1}),this.props.onClose()):(this.setState({height:"auto",overflow:this.props.overflowWhenOpen,inTransition:!1}),this.props.onOpen())}},{key:"setInnerRef",value:function(e){this.innerRef=e}},{key:"render",value:function(){var e=this,t={height:this.state.height,WebkitTransition:this.state.transition,msTransition:this.state.transition,transition:this.state.transition,overflow:this.state.overflow},n=this.state.isClosed?"is-closed":"is-open",r=this.props.triggerDisabled?"is-disabled":"",s=!1===this.state.isClosed&&void 0!==this.props.triggerWhenOpen?this.props.triggerWhenOpen:this.props.trigger,a=this.props.triggerTagName,o=this.props.lazyRender&&!this.state.hasBeenOpened&&this.state.isClosed&&!this.state.inTransition?null:this.props.children,l=this.props.classParentString+"__trigger "+n+" "+r+" "+(this.state.isClosed?this.props.triggerClassName:this.props.triggerOpenedClassName),u=this.props.classParentString+" "+(this.state.isClosed?this.props.className:this.props.openedClassName),c=this.props.classParentString+"__contentOuter "+this.props.contentOuterClassName,p=this.props.classParentString+"__contentInner "+this.props.contentInnerClassName;return i.default.createElement("div",{className:u.trim()},i.default.createElement(a,{className:l.trim(),onClick:this.handleTriggerClick,style:this.props.triggerStyle&&this.props.triggerStyle,onKeyPress:function(t){var n=t.key;" "!==n&&"Enter"!==n||e.handleTriggerClick(t)},tabIndex:this.props.tabIndex&&this.props.tabIndex},s),this.renderNonClickableTriggerElement(),i.default.createElement("div",{className:c.trim(),style:t,onTransitionEnd:this.handleTransitionEnd},i.default.createElement("div",{className:p.trim(),ref:this.setInnerRef},o)))}}]),t}();l.propTypes={transitionTime:a.default.number,transitionCloseTime:a.default.number,triggerTagName:a.default.string,easing:a.default.string,open:a.default.bool,classParentString:a.default.string,openedClassName:a.default.string,triggerStyle:a.default.object,triggerClassName:a.default.string,triggerOpenedClassName:a.default.string,contentOuterClassName:a.default.string,contentInnerClassName:a.default.string,accordionPosition:a.default.oneOfType([a.default.string,a.default.number]),handleTriggerClick:a.default.func,onOpen:a.default.func,onClose:a.default.func,onOpening:a.default.func,onClosing:a.default.func,trigger:a.default.oneOfType([a.default.string,a.default.element]),triggerWhenOpen:a.default.oneOfType([a.default.string,a.default.element]),triggerDisabled:a.default.bool,lazyRender:a.default.bool,overflowWhenOpen:a.default.oneOf(["hidden","visible","auto","scroll","inherit","initial","unset"]),triggerSibling:a.default.oneOfType([a.default.element,a.default.func]),tabIndex:a.default.number},l.defaultProps={transitionTime:400,transitionCloseTime:null,triggerTagName:"span",easing:"linear",open:!1,classParentString:"Collapsible",triggerDisabled:!1,lazyRender:!1,overflowWhenOpen:"hidden",openedClassName:"",triggerStyle:null,triggerClassName:"",triggerOpenedClassName:"",contentOuterClassName:"",contentInnerClassName:"",className:"",triggerSibling:null,onOpen:function(){},onClose:function(){},onOpening:function(){},onClosing:function(){},tabIndex:null},t.default=l},343:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==y(e)&&"function"!==typeof e)return{default:e};var n=i(t);if(n&&n.has(e))return n.get(e);var r={},s=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var o=s?Object.getOwnPropertyDescriptor(e,a):null;o&&(o.get||o.set)?Object.defineProperty(r,a,o):r[a]=e[a]}r.default=e,n&&n.set(e,r);return r}(n(0)),s=["placeholder","separator","isLastChild","inputStyle","focus","isDisabled","hasErrored","errorStyle","focusStyle","disabledStyle","shouldAutoFocus","isInputNum","index","value","className","isInputSecure"];function i(e){if("function"!==typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(i=function(e){return e?n:t})(e)}function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function o(e,t){if(null==e)return{};var n,r,s=function(e,t){if(null==e)return{};var n,r,s={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(e,t,n){return t&&u(e.prototype,t),n&&u(e,n),e}function p(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function h(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var n,r=g(e);if(t){var s=g(this).constructor;n=Reflect.construct(r,arguments,s)}else n=r.apply(this,arguments);return function(e,t){if(t&&("object"===y(t)||"function"===typeof t))return t;return d(e)}(this,n)}}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function y(e){return(y="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var b=8,v=37,O=39,w=46,C=32,S=function(e){return"object"===y(e)},T=function(e){p(n,r.PureComponent);var t=h(n);function n(e){var s;return l(this,n),m(d(s=t.call(this,e)),"getClasses",function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter(function(e){return!S(e)&&!1!==e}).join(" ")}),m(d(s),"getType",function(){var e=s.props,t=e.isInputSecure,n=e.isInputNum;return t?"password":n?"tel":"text"}),s.input=r.default.createRef(),s}return c(n,[{key:"componentDidMount",value:function(){var e=this.props,t=e.focus,n=e.shouldAutoFocus,r=this.input.current;r&&t&&n&&r.focus()}},{key:"componentDidUpdate",value:function(e){var t=this.props.focus,n=this.input.current;e.focus!==t&&n&&t&&(n.focus(),n.select())}},{key:"render",value:function(){var e=this.props,t=e.placeholder,n=e.separator,i=e.isLastChild,l=e.inputStyle,u=e.focus,c=e.isDisabled,p=e.hasErrored,f=e.errorStyle,h=e.focusStyle,d=e.disabledStyle,g=(e.shouldAutoFocus,e.isInputNum),m=e.index,y=e.value,b=e.className,v=(e.isInputSecure,o(e,s));return r.default.createElement("div",{className:b,style:{display:"flex",alignItems:"center"}},r.default.createElement("input",a({"aria-label":"".concat(0===m?"Please enter verification code. ":"").concat(g?"Digit":"Character"," ").concat(m+1),autoComplete:"off",style:Object.assign({width:"1em",textAlign:"center"},S(l)&&l,u&&S(h)&&h,c&&S(d)&&d,p&&S(f)&&f),placeholder:t,className:this.getClasses(l,u&&h,c&&d,p&&f),type:this.getType(),maxLength:"1",ref:this.input,disabled:c,value:y||""},v)),!i&&n)}}]),n}(),I=function(e){p(n,r.Component);var t=h(n);function n(){var e;l(this,n);for(var s=arguments.length,i=new Array(s),a=0;a<s;a++)i[a]=arguments[a];return m(d(e=t.call.apply(t,[this].concat(i))),"state",{activeInput:0}),m(d(e),"getOtpValue",function(){return e.props.value?e.props.value.toString().split(""):[]}),m(d(e),"getPlaceholderValue",function(){var t=e.props,n=t.placeholder,r=t.numInputs;if("string"===typeof n){if(n.length===r)return n;n.length>0&&console.error("Length of the placeholder should be equal to the number of inputs.")}}),m(d(e),"handleOtpChange",function(t){(0,e.props.onChange)(t.join(""))}),m(d(e),"isInputValueValid",function(t){return(e.props.isInputNum?!isNaN(parseInt(t,10)):"string"===typeof t)&&1===t.trim().length}),m(d(e),"focusInput",function(t){var n=e.props.numInputs,r=Math.max(Math.min(n-1,t),0);e.setState({activeInput:r})}),m(d(e),"focusNextInput",function(){var t=e.state.activeInput;e.focusInput(t+1)}),m(d(e),"focusPrevInput",function(){var t=e.state.activeInput;e.focusInput(t-1)}),m(d(e),"changeCodeAtFocus",function(t){var n=e.state.activeInput,r=e.getOtpValue();r[n]=t[0],e.handleOtpChange(r)}),m(d(e),"handleOnPaste",function(t){t.preventDefault();var n=e.state.activeInput,r=e.props,s=r.numInputs;if(!r.isDisabled){for(var i=e.getOtpValue(),a=n,o=t.clipboardData.getData("text/plain").slice(0,s-n).split(""),l=0;l<s;++l)l>=n&&o.length>0&&(i[l]=o.shift(),a++);e.setState({activeInput:a},function(){e.focusInput(a),e.handleOtpChange(i)})}}),m(d(e),"handleOnChange",function(t){var n=t.target.value;e.isInputValueValid(n)&&e.changeCodeAtFocus(n)}),m(d(e),"handleOnKeyDown",function(t){t.keyCode===b||"Backspace"===t.key?(t.preventDefault(),e.changeCodeAtFocus(""),e.focusPrevInput()):t.keyCode===w||"Delete"===t.key?(t.preventDefault(),e.changeCodeAtFocus("")):t.keyCode===v||"ArrowLeft"===t.key?(t.preventDefault(),e.focusPrevInput()):t.keyCode===O||"ArrowRight"===t.key?(t.preventDefault(),e.focusNextInput()):t.keyCode!==C&&" "!==t.key&&"Spacebar"!==t.key&&"Space"!==t.key||t.preventDefault()}),m(d(e),"handleOnInput",function(t){if(e.isInputValueValid(t.target.value))e.focusNextInput();else if(!e.props.isInputNum){var n=t.nativeEvent;null===n.data&&"deleteContentBackward"===n.inputType&&(t.preventDefault(),e.changeCodeAtFocus(""),e.focusPrevInput())}}),m(d(e),"renderInputs",function(){for(var t=e.state.activeInput,n=e.props,s=n.numInputs,i=n.inputStyle,a=n.focusStyle,o=n.separator,l=n.isDisabled,u=n.disabledStyle,c=n.hasErrored,p=n.errorStyle,f=n.shouldAutoFocus,h=n.isInputNum,d=n.isInputSecure,g=n.className,m=[],y=e.getOtpValue(),b=e.getPlaceholderValue(),v=e.props["data-cy"],O=e.props["data-testid"],w=function(n){m.push(r.default.createElement(T,{placeholder:b&&b[n],key:n,index:n,focus:t===n,value:y&&y[n],onChange:e.handleOnChange,onKeyDown:e.handleOnKeyDown,onInput:e.handleOnInput,onPaste:e.handleOnPaste,onFocus:function(t){e.setState({activeInput:n}),t.target.select()},onBlur:function(){return e.setState({activeInput:-1})},separator:o,inputStyle:i,focusStyle:a,isLastChild:n===s-1,isDisabled:l,disabledStyle:u,hasErrored:c,errorStyle:p,shouldAutoFocus:f,isInputNum:h,isInputSecure:d,className:g,"data-cy":v&&"".concat(v,"-").concat(n),"data-testid":O&&"".concat(O,"-").concat(n)}))},C=0;C<s;C++)w(C);return m}),e}return c(n,[{key:"render",value:function(){var e=this.props.containerStyle;return r.default.createElement("div",{style:Object.assign({display:"flex"},S(e)&&e),className:S(e)?"":e},this.renderInputs())}}]),n}();m(I,"defaultProps",{numInputs:4,onChange:function(e){return console.log(e)},isDisabled:!1,shouldAutoFocus:!1,value:"",isInputSecure:!1});var k=I;t.default=k}}]);
//# sourceMappingURL=53.d09550fa.chunk.js.map