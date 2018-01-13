!function e(t,r,s){function i(a,u){if(!r[a]){if(!t[a]){var o="function"==typeof require&&require;if(!u&&o)return o(a,!0);if(n)return n(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var m=r[a]={exports:{}};t[a][0].call(m.exports,function(e){var r=t[a][1][e];return i(r?r:e)},m,m.exports,e,t,r,s)}return r[a].exports}for(var n="function"==typeof require&&require,a=0;a<s.length;a++)i(s[a]);return i}({1:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s=e("./search"),i=function(){function e(){}return e.main=function(){var e=this;this.searchBoxElem=document.getElementById("search-box");var t=new s.Search(this.searchBoxElem);if(document.querySelector(".search-form").onsubmit=function(){return t.execQuery(e.searchBoxElem.value,!0),!1},this.searchBoxElem.disabled=!1,"/"!==window.location.pathname){var r=/\/\u\/(\d{17})$/g.exec(window.location.pathname),i=r&&r.length>=2?r[1]:null;null===i?window.history.pushState("SteamID Lookup","SteamID Lookup","/"):(this.searchBoxElem.style.animation="unset",this.searchBoxElem.style.opacity="1 !important",t.execQuery(i,!0))}return 0},e}();i.main()},{"./search":2}],2:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s=function(){function e(e){this.inputElem=e,this.searchTimeout=null,this.xhReq=null,this.userSteamIDElem=null,this.userSteamID64Elem=null,this.userSteamID32Elem=null,this.userSteamID3Elem=null,this.inputElemHasBlurred=!1,this.hasSearched=!1,this.xhReq=new XMLHttpRequest,this.xhReq.onerror=function(){},e.addEventListener("keyup",this.inputElemKeyUpEvent.bind(this)),e.addEventListener("focus",this.inputElemFocusEvent.bind(this)),e.addEventListener("blur",this.inputElemBlurEvent.bind(this)),this.userSteamIDElem=document.getElementById("user-id").querySelector("input"),tippy(this.userSteamIDElem,{trigger:"manual",arrow:!0,flip:!1,size:"small"}),new Clipboard(this.userSteamIDElem).on("success",this.onClipboardCopySuccess.bind(this.userSteamIDElem._tippy)),this.userSteamID64Elem=document.getElementById("user-id64").querySelector("input"),tippy(this.userSteamID64Elem,{trigger:"manual",arrow:!0,flip:!1,size:"small"}),new Clipboard(this.userSteamID64Elem).on("success",this.onClipboardCopySuccess.bind(this.userSteamID64Elem._tippy)),this.userSteamID32Elem=document.getElementById("user-id32").querySelector("input"),tippy(this.userSteamID32Elem,{trigger:"manual",arrow:!0,flip:!1,size:"small"}),new Clipboard(this.userSteamID32Elem).on("success",this.onClipboardCopySuccess.bind(this.userSteamID32Elem._tippy)),this.userSteamID3Elem=document.getElementById("user-id3").querySelector("input"),tippy(this.userSteamID3Elem,{trigger:"manual",arrow:!0,flip:!1,size:"small"}),new Clipboard(this.userSteamID3Elem).on("success",this.onClipboardCopySuccess.bind(this.userSteamID3Elem._tippy))}return e.prototype.inputElemKeyUpEvent=function(t){var r=this;if(13!==t.keyCode){clearTimeout(this.searchTimeout);var s=this.inputElem.value;""!=s&&(this.searchTimeout=setTimeout(function(){r.execQuery(s,!0)},e.KeyUpSearchDelay))}},e.prototype.inputElemFocusEvent=function(e){u(document.querySelector(".search-form"),"smaller")&&this.inputElem.select()},e.prototype.inputElemBlurEvent=function(e){this.hasSearched&&!this.inputElemHasBlurred&&(this.inputElemHasBlurred=!0,n(document.querySelector(".search-form"),"smaller"))},e.prototype.onClipboardCopySuccess=function(e){var t=this;e.clearSelection(),setTimeout(function(){var e=t;e.show(),setTimeout(function(){e.hide()},1500)},1)},e.prototype.execQuery=function(e,t){var r=this;void 0===t&&(t=!1),n("logo","slide-to-top-hide"),o("user-results"),o("not-found-results"),l("loading-results"),this.hasSearched=!0;var s=null;return this.xhReq.open("GET","/api/search?query="+e,t),this.xhReq.onloadend=function(e){if(200===r.xhReq.status){var t=JSON.parse(r.xhReq.responseText);if(t){if(!t.success)return s=!1,o("loading-results"),l("not-found-results"),r.inputElem.focus(),window.history.pushState("SteamID Lookup","SteamID Lookup","/"),void(document.title="Steam ID Lookup");switch(s=!0,t.resolvedVia){case i.VANITY_URL:document.getElementById("resolved-via").innerText="Vanity URL";break;case i.ID:document.getElementById("resolved-via").innerText="Steam ID";break;case i.ID3:document.getElementById("resolved-via").innerText="Steam ID 3";break;case i.ID32:document.getElementById("resolved-via").innerText="Steam ID 32";break;case i.ID64:document.getElementById("resolved-via").innerText="Steam ID 64"}switch(t.resolvedVia>0&&n("search-box-meta","fade-in"),t.playerSummary.personastate){case 1:case 2:case 3:case 4:case 5:case 6:n("user-pic-container","state-online")}var a=document.getElementById("steam-level"),u=void 0;u=t.playerSummary.steamLevel<100?16:t.playerSummary.steamLevel<1e3?14:11,a.style.fontSize=u+"px",a.innerText=t.playerSummary.steamLevel.toString(),document.getElementById("user-pic").src=t.playerSummary.avatarfull;var m=document.getElementById("user-name");m.innerText=t.playerSummary.personaname;var c=document.getElementById("user-url").querySelector("a");c.innerText=t.playerSummary.profileurl,c.setAttribute("href",t.playerSummary.profileurl),r.userSteamIDElem.value=t.playerSummary.ids.id,r.userSteamID64Elem.value=t.playerSummary.ids.id64.toString(),r.userSteamID32Elem.value=t.playerSummary.ids.id32.toString(),r.userSteamID3Elem.value=t.playerSummary.ids.id3,o("loading-results"),l("user-results"),n("user-results","fade-in-slow"),window.history.pushState("SteamID Lookup","SteamID Lookup","/u/"+t.playerSummary.ids.id64),document.title="Steam ID Lookup | "+t.playerSummary.personaname}}},this.xhReq.send(null),s},e.KeyUpSearchDelay=500,e}();r.Search=s;var i;(function(){function e(){}return e})();!function(e){e[e.FAILED=0]="FAILED",e[e.VANITY_URL=1]="VANITY_URL",e[e.ID=2]="ID",e[e.ID3=3]="ID3",e[e.ID32=4]="ID32",e[e.ID64=5]="ID64"}(i||(i={}));var n=function(e,t){"string"==typeof e&&(e=document.getElementById(e)),e.classList?e.classList.add(t):e.className+=" "+t},a=function(e,t){"string"==typeof e&&(e=document.getElementById(e)),e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," ")},u=function(e,t){return"string"==typeof e&&(e=document.getElementById(e)),e.classList?e.classList.contains(t):new RegExp("(^| )"+t+"( |$)","gi").test(e.className)},o=function(e){n(e,"hidden")},l=function(e){a(e,"hidden")}},{}]},{},[1]);