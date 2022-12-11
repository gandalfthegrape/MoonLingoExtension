console.log("Running content_script.js");

document.getElementById("applyDefaultHighlights").addEventListener('click',
    function () {
        chrome.tabs.query({ active: true }, tab => {
            chrome.tabs.executeScript(tab.id, { file: "js/applyDefaultHighlights.js" });
        });
    }
);