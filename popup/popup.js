
const switchOnoff = document.getElementById('switch');

chrome.storage.sync.get({
    isOn: true
}, items => {
    switchOnoff.checked = items.isOn
})
let current_tab;
// 获取当前窗口对象
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    current_tab = tabs[0]
});

// 挂载事件
switchOnoff.onchange = function (e) {
    console.log("checked", e.target.checked)
    if (e.target.checked) {
        openExtension(current_tab)
    } else {
        closeExtension(current_tab)
    }
}


// 打开插件
function openExtension(current_tab) {
    chrome.tabs.sendMessage(current_tab.id, { switch_status: true }, function (response) {
        console.log(response);
    })
    chrome.storage.sync.set({ isOn: true })
}

// 关闭插件
function closeExtension(current_tab) {
    chrome.tabs.sendMessage(current_tab.id, { switch_status: false }, function (response) {
        console.log(response);
    })
    chrome.storage.sync.set({ isOn: false })
}


