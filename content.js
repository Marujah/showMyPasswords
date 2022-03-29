// Let each content script manage its own active state.
let isActive = false;
// When the background page sends a message telling this tab to toggle its
// active state, do so, and then respond with the new active state.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.message === "toggle-tab") {
    isActive = !isActive; // toggle the active state
    const allInputs = document.querySelectorAll('input[type="password"]');
    [...allInputs].map(input => input.setAttribute('extData', 'showPSW'));
    const allEditedInputs = document.querySelectorAll('input[extData="showPSW"]');
    const allMyPasswordFields = [...allInputs, ...allEditedInputs];
    allMyPasswordFields.map(input => {
        input.style.border = isActive ? '2px solid green' : '';
        input.setAttribute('type', isActive ? 'text' : 'password')
    });
    sendResponse(isActive); // respond with the new active state
  }
});