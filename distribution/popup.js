!function(e){var t={};function n(o){if(t[o])return t[o].exports;var s=t[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=130)}({10:function(e,t,n){class o{constructor(e="options"){this.storageName=e}define(e){e=Object.assign({defaults:{},migrations:[]},e),chrome.runtime.onInstalled?chrome.runtime.onInstalled.addListener(()=>this._applyDefinition(e)):this._applyDefinition(e)}async _applyDefinition(e){const t=Object.assign(e.defaults,await this.getAll());console.info("Current options:",t),e.migrations.length>0&&(console.info("Running",e.migrations.length,"migrations"),e.migrations.forEach(n=>n(t,e.defaults))),this.setAll(t)}_parseNumbers(e){for(const t of Object.keys(e))e[t]===String(Number(e[t]))&&(e[t]=Number(e[t]));return e}getAll(){return new Promise(e=>{chrome.storage.sync.get(this.storageName,t=>e(t[this.storageName]||{}))}).then(this._parseNumbers)}setAll(e){return new Promise(t=>{chrome.storage.sync.set({[this.storageName]:e},t)})}async set(e){const t=await this.getAll();this.setAll(Object.assign(t,e))}syncForm(e){"string"==typeof e&&(e=document.querySelector(e)),this.getAll().then(t=>o._applyToForm(t,e)),e.addEventListener("input",e=>this._handleFormUpdates(e)),e.addEventListener("change",e=>this._handleFormUpdates(e))}static _applyToForm(e,t){for(const n of Object.keys(e)){const o=t.querySelectorAll(`[name="${n}"]`),[s]=o;if(s)switch(console.info("Set option",n,"to",e[n]),s.type){case"checkbox":s.checked=e[n];break;case"radio":{const[t]=[...o].filter(t=>t.value===e[n]);t&&(t.checked=!0);break}default:s.value=e[n]}else console.warn("Stored option {",n,":",e[n],"} was not found on the page")}}_handleFormUpdates({target:e}){const t=e.name;let n=e.value;if(t&&e.validity.valid){switch(e.type){case"select-one":n=e.options[e.selectedIndex].value;break;case"checkbox":n=e.checked}console.info("Saving option",e.name,"to",n),this.set({[t]:n})}}}o.migrations={removeUnused(e,t){for(const n of Object.keys(e))n in t||delete e[n]}},e.exports=o},130:function(e,t,n){"use strict";var o;(new(((o=n(10))&&o.__esModule?o:{default:o}).default)).syncForm(document.querySelector("form#options-form")),document.getElementById("save").addEventListener("click",function(){var e=document.getElementById("status");e.textContent="Options saved!",setTimeout(function(){e.textContent=""},2e3),chrome.tabs.query({active:!0,currentWindow:!0},function(e){chrome.tabs.update(e[0].id,{url:e[0].url})})})}});