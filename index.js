// ==UserScript==
// @name         NickGPT
// @namespace    https://ugpt.nickname4th.vip/
// @version      0.4
// @description  Use NickGPT on Google Search page!
// @author       InJeCTrL
// @match        *://www.google.com/search*
// @match        *://www.google.com.hk/search*
// @match        *://www.google.co.uk/search*
// @match        *://www.baidu.com*
// @match        *://so.toutiao.com/search*
// @match        *://cn.bing.com/search*
// @match        *://www.bing.com/search*
// @match        *://duckduckgo.com/?*
// @match        *://www.so.com/s?*
// @grant        window.onurlchange
// @icon         https://s1.ax1x.com/2023/04/21/p9E40Ve.png
// @require      https://code.jquery.com/jquery-3.6.0.js
// @require      https://cdn.bootcdn.net/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js
// @resource css https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    function getSearchContent() {
        var url = window.location.href;
        if (url.indexOf("www.baidu.com") != -1) {
            return document.getElementById('kw').value;
        } else if (url.indexOf("www.google.") != -1) {
            return document.getElementsByTagName('textarea')[0].textContent;
        } else if (url.indexOf("so.toutiao.com") != -1) {
            return document.getElementsByTagName('input')[0].value;
        } else if (url.indexOf("bing.com") != -1) {
            return document.getElementById('sb_form_q').value;
        } else if (url.indexOf("duckduckgo.com") != -1) {
            return document.getElementById('search_form_input').value;
        } else if (url.indexOf("www.so.com") != -1) {
            return document.getElementById('keyword').value;
        }
    }

    function searchKeyword() {
        document.getElementById('nickgpt-wnd')
                .contentWindow.postMessage({
                "nickGPT": getSearchContent()
            }, '*');
    }

    function nickgptHandler(message) {
        if (message.data == "chatready") {
            searchKeyword();
        }
    }

    function insertWnd() {
        var box = document.createElement("div");
        var ifr = document.createElement("iframe");
        ifr.id = "nickgpt-wnd";
        ifr.src = "https://ugpt.nickname4th.vip";
        box.id = "nickgpt-box";
        box.appendChild(ifr);
        document.children[0].appendChild(box);

        $(function () {
            $("#nickgpt-box").draggable();
        });

        window.addEventListener("message", nickgptHandler);
    }

    function insertStyle() {
        var css = "\
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
}";
        const style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        document.children[0].appendChild(style);
    }

    if (window.onurlchange === null) {
        window.addEventListener('urlchange', (info) => {
            /*document.getElementById('nickgpt-wnd').remove();
            document.getElementById('nickgpt-box').remove();
            insertWnd();*/
            searchKeyword();
        });
    }

    insertStyle();
    insertWnd();
})();