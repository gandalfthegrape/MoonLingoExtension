console.log("Running background.js");

chrome.commands.onCommand.addListener(command => {
    if (command === "applyDefaultHighlights") {
        chrome.tabs.query({ active: true }, tab => {
            chrome.tabs.executeScript(tab.id, { file: "js/applyDefaultHighlights.js" });
        })
    };
});