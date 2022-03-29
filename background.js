// Set the right icon in the given tab id, depending on that tab's active state.
function setIcon(tabId, isActive) {
    chrome.action.setIcon({tabId, path: isActive ? 'images/unlocked.png' : 'images/locked.png'});
    // const allInputs = document.querySelectorAll('input[type="password"]');
    // [...allInputs].map(input => input.setAttribute('extData', 'showPSW'));
    // const allEditedInputs = document.querySelectorAll('input[extData="showPSW"]');
    // const allMyPasswordFields = [...allInputs, ...allEditedInputs];
    // const tabState = isActive ? "Active" : "NOT Active";
    // allMyPasswordFields.map(input => input.setAttribute('type', isActive ? 'password' : 'text'));
}

chrome.action.onClicked.addListener((tab) => {
    if (!tab.url.includes("chrome://")) {
        chrome.tabs.sendMessage(tab.id, {
            message: "toggle-tab"
        }, function (isActive) {
            setIcon(tab.id, isActive);
        });
    }
});