!function(e){var t={};function o(n){if(t[n])return t[n].exports;var l=t[n]={i:n,l:!1,exports:{}};return e[n].call(l.exports,l,l.exports,o),l.l=!0,l.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},o.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=8)}({8:function(e,t){document.addEventListener("DOMContentLoaded",function(){chrome.storage.sync.get(["retweetToggleDisplay","promotedToggleDisplay","followToggleDisplay","trendsBoxToggleDisplay"],function(e){document.getElementById("retweetToggleDisplay").checked=e.retweetToggleDisplay,document.getElementById("promotedToggleDisplay").checked=e.promotedToggleDisplay,document.getElementById("followToggleDisplay").checked=e.followToggleDisplay,document.getElementById("trendsBoxToggleDisplay").checked=e.trendsBoxToggleDisplay})}),document.getElementById("save").addEventListener("click",function(){var e=document.getElementById("retweetToggleDisplay").checked,t=document.getElementById("promotedToggleDisplay").checked,o=document.getElementById("followToggleDisplay").checked,n=document.getElementById("trendsBoxToggleDisplay").checked;chrome.storage.sync.set({retweetToggleDisplay:e,promotedToggleDisplay:t,followToggleDisplay:o,trendsBoxToggleDisplay:n},function(){var e=document.getElementById("status");e.textContent="Options saved!",setTimeout(function(){e.textContent=""},2e3),chrome.tabs.query({active:!0,currentWindow:!0},function(e){chrome.tabs.update(e[0].id,{url:e[0].url})})})})}});