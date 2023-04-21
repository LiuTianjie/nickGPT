// ==UserScript==
// @name         NickGPT
// @namespace    https://ugpt.nickname4th.vip/
// @version      0.3
// @description  Use NickGPT on Google Search page!
// @author       InJeCTrL
// @include      /^https?://www\.google\.(com|com.hk|co.uk)/search*/
// @grant        GM_addStyle
// @icon         https://s1.ax1x.com/2023/04/21/p9E40Ve.png
// @require      https://code.jquery.com/jquery-3.6.0.js
// @require      https://cdn.bootcdn.net/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js
// @resource css https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    GM_addStyle("\
#nickgpt-box {\
border: 1px solid #cceff5;\
position: fixed;\
right: 10%;\
top: 8%;\
width: 30%;\
height: 80%;\
z-index: 998;\
padding-top:25px;\
background: #1E90FF;\
cursor: grab;\
border-radius: 25px;\
box-shadow: 1px 1px 1px 1px grey;\
}\
#nickgpt-wnd {\
border: none;\
width: 100%;\
height: 100%;\
z-index: 999;\
background: white;\
border-radius: 25px;\
}\
");

    function answer() {
        document.getElementById('nickgpt-wnd')
            .contentWindow.postMessage({
                "nickGPT": document.getElementById('APjFqb').textContent
            }, '*');
    }

    var box = document.createElement("div");
    var ifr = document.createElement("iframe");
    ifr.id = "nickgpt-wnd";
    ifr.src = "https://ugpt.nickname4th.vip";
    box.id = "nickgpt-box";
    document.body.appendChild(box);
    box.appendChild(ifr);

    window.setTimeout(answer, 3000);

    $(function () {
        $("#nickgpt-box").draggable();
    });
})();