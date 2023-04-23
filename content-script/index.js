const nickGPT = $('<div id="drag" class="iframe-container"><iframe id="nickGPT" class="nickname-container" src="https://ugpt.nickname4th.vip"></iframe></div>')


console.log("============NickGPT MOUNTED============")

const searchInput = $('textarea.gLFyf')[0] || $('textarea.b_searchbox')[0] || $('input.s_ipt')[0] || $('input.input_key')[0] || $('input.input_eZQfPE')[0] || $('input.search__input--adv')[0]

// 适配baidu搜索
if (window.location.href.includes("baidu")) {
    $('input#kw').blur(function () {
        postToNickGPT()
    })
}

// 适配360搜索
if (window.location.href.includes("www.so.com")) {
    $('input#keyword').blur(function () {
        postToNickGPT()
    })
}

// Get search input from parent
function getSearchInput() {
    // google, bing, sougo, baidu, toutiao, duckduckgo
    if (searchInput) {
        return searchInput.innerHTML || searchInput.value
    } else {
        console.log("no search input")
    }
}

// Post search input to iframe
function postToNickGPT() {
    const queryObj = {
        "nickGPT": getSearchInput(),
    }
    $("#nickGPT")[0].contentWindow.postMessage(queryObj, "*");
}

// Monitor when iframe is ready
window.addEventListener("message", e => {
    const isReady = e.data;
    if (isReady == "chatready") {
        $(document).ready(function () {
            postToNickGPT()
        })
    }
})

$(function () {
    console.log($('#drag'))
    $("#drag").draggable();
});


function mountOrUnmountGPT(msg) {
    if (msg.switch_status) {
        $('html').append(nickGPT)
    } else {
        $('#drag').remove()
    }
}

chrome.storage.sync.get({
    isOn: true
}, items => {
    console.log('items form contnet', items)
    const isOn = items.isOn
    mountOrUnmountGPT({ switch_status: isOn })
})

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    console.log('msg', msg);
    mountOrUnmountGPT(msg)
    response({ status: true });
});