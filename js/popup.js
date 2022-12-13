console.log("Running popup.js");

let defaultLanguage;

chrome.tabs.query({ active: true }, tab => {
    chrome.tabs.detectLanguage(tab.id, lang => {
        defaultLanguage = lang;
        console.log(defaultLanguage);
        document.getElementById("languageSelect").value = defaultLanguage;
    });
});

document.getElementById("applyDefaultHighlightsButton").addEventListener('click',
    function () {
        console.log("sending message");
        let language = document.getElementById("languageSelect").value;
        console.log(language);
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { "message": "applyDefaultHighlights", "language": language });
            console.log("message sent");
            //chrome.tabs.executeScript(tab.id, { file: "js/applyDefaultHighlights.js" });
        });
    }
);

document.getElementById("csvInputButton").addEventListener('click',
    function () {
        return;
        // can probably handle this here instead of passing to content script. Maybe need to refresh content script highlights afterward though.
    }
);

document.getElementById("languageCheckBox").addEventListener('click',
    function () {
        let ls = document.getElementById("languageSelect");
        ls.disabled = !ls.disabled;
        return;
    }
);
