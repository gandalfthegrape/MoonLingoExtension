console.log("Running content_script.js");
// chrome.tabs.query({ active: true }, tab => {
//     chrome.tabs.executeScript(tab.id, { file: "applyDefaultHighlights.js" });
// })
var currentElement;

function showMenu() {
    var text = currentElement.innerText;

    var menuDiv = document.createElement("div");
    menuDiv.setAttribute("id", "contextMenu");
    menuDiv.setAttribute("class", "noHideOnClick");
    menuDiv.innerHTML = `${text}<br>`;

    var textInput = document.createElement("input");
    textInput.setAttribute("type", "userDefinition");
    textInput.setAttribute("class", "noHideOnClick");
    menuDiv.appendChild(textInput);

    var okButton = document.createElement("input");
    okButton.setAttribute("type", "button");
    okButton.setAttribute("class", "noHideOnClick");
    okButton.setAttribute("value", "OK");
    okButton.onclick = function () { saveNote(text, textInput.value) };
    menuDiv.appendChild(okButton);

    currentElement.appendChild(menuDiv);
}

function hideMenu() {
    var menuDiv = document.getElementById("contextMenu");
    if (menuDiv === null) { return };
    menuDiv.parentElement.removeChild(menuDiv);
    hideMenu();
}

// Set up an event handler for the document right click
document.addEventListener("contextmenu", function(event) {
  // Only do something when the element that was actually right-clicked
  // on has the right class to trigger the menu
    if (event.target.classList.contains("defaultHighlight")) {
        hideMenu();
        event.preventDefault();
        currentElement = event.target;
        showMenu();
  }
});

// Close the menu when you left click anywhere
document.addEventListener("click", function (event) {
    //document.getElementById("contextMenu").classList.add("hidden");
    if (!(event.target.classList.contains("noHideOnClick"))) {
        hideMenu();
    };
});

///////////////////////////

//handling chrome.storage

var highlights;
var language = "English";

function saveNote(word, note) {
    console.log("getStorage");
    chrome.storage.local.get("highlights", results => {
        if (results.highlights) {
            highlights = results.highlights;
        } else {
            highlights = {};
        }
        if (!highlights[language]) {
            highlights[language] = {};
        };
        console.log(`Saving ${language} ${word} with note ${note}`)
        highlights[language][word] = [
            note
        ];
        chrome.storage.local.set({ highlights }, () => { });
        console.log("storage saved");
    })
};

