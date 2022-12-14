console.log("Running background.js");

// chrome.commands.onCommand.addListener(command => {
//     if (command === "applyDefaultHighlights") {
//         chrome.tabs.query({ active: true }, tab => {
//             chrome.scripting.executeScript(tab.id, { file: "js/applyDefaultHighlights.js" });
//         })
//     };
// });