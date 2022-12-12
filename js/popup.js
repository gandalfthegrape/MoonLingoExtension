console.log("Running popup.js");

document.getElementById("applyDefaultHighlights").addEventListener('click',
    function () {
        console.log("sending message");
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { "message": "applyDefaultHighlights" });
            console.log("message sent");
            //chrome.tabs.executeScript(tab.id, { file: "js/applyDefaultHighlights.js" });
        });
    }
);