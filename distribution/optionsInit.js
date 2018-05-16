!function(e){var t={};function o(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},o.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=132)}({10:function(e,t,o){class n{constructor(e="options"){this.storageName=e}define(e){e=Object.assign({defaults:{},migrations:[]},e),chrome.runtime.onInstalled?chrome.runtime.onInstalled.addListener(()=>this._applyDefinition(e)):this._applyDefinition(e)}async _applyDefinition(e){const t=Object.assign(e.defaults,await this.getAll());console.info("Current options:",t),e.migrations.length>0&&(console.info("Running",e.migrations.length,"migrations"),e.migrations.forEach(o=>o(t,e.defaults))),this.setAll(t)}_parseNumbers(e){for(const t of Object.keys(e))e[t]===String(Number(e[t]))&&(e[t]=Number(e[t]));return e}getAll(){return new Promise(e=>{chrome.storage.sync.get(this.storageName,t=>e(t[this.storageName]||{}))}).then(this._parseNumbers)}setAll(e){return new Promise(t=>{chrome.storage.sync.set({[this.storageName]:e},t)})}async set(e){const t=await this.getAll();this.setAll(Object.assign(t,e))}syncForm(e){"string"==typeof e&&(e=document.querySelector(e)),this.getAll().then(t=>n._applyToForm(t,e)),e.addEventListener("input",e=>this._handleFormUpdates(e)),e.addEventListener("change",e=>this._handleFormUpdates(e))}static _applyToForm(e,t){for(const o of Object.keys(e)){const n=t.querySelectorAll(`[name="${o}"]`),[s]=n;if(s)switch(console.info("Set option",o,"to",e[o]),s.type){case"checkbox":s.checked=e[o];break;case"radio":{const[t]=[...n].filter(t=>t.value===e[o]);t&&(t.checked=!0);break}default:s.value=e[o]}else console.warn("Stored option {",o,":",e[o],"} was not found on the page")}}_handleFormUpdates({target:e}){const t=e.name;let o=e.value;if(t&&e.validity.valid){switch(e.type){case"select-one":o=e.options[e.selectedIndex].value;break;case"checkbox":o=e.checked}console.info("Saving option",e.name,"to",o),this.set({[t]:o})}}}n.migrations={removeUnused(e,t){for(const o of Object.keys(e))o in t||delete e[o]}},e.exports=n},132:function(e,t,o){"use strict";var n;(new(((n=o(10))&&n.__esModule?n:{default:n}).default)).define({defaults:{modifierKeybind:"ctrlKey",nightModeToggleKeybind:"b",momentToggleDisplayKeybind:"m",momentToggleDisplay:"block",retweetToggleDisplay:!1,promotedToggleDisplay:!0,followToggleDisplay:!0,likeToggleDisplay:!1,autoLoadTweetTime:5,originalImageToggleDisplay:!0,trendsBoxToggleDisplay:!1,uselessNotifsToggleDisplay:!0}})}});