const nickGPT = $('<div id="drag" class="iframe-container"><iframe id="nickGPT" class="nickname-container" src="https://ugpt.nickname4th.vip">test</iframe></div>')[0]
$('.main').append(nickGPT)

console.log("============NickGPT MOUNTED============")

// Get search input from parent
function getSearchInput() {
    const searchInput = $('textarea.gLFyf')[0]
    if (searchInput) {
        console.log(searchInput.innerHTML);
        return searchInput.innerHTML
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
    else {
        return
    }
})

$(function () {
    console.log($('#drag'))
    $("#drag").draggable();
});