console.log("Running content_script.js");
// chrome.tabs.query({ active: true }, tab => {
//     chrome.tabs.executeScript(tab.id, { file: "applyDefaultHighlights.js" });
// })

function showMenu(element) {
    var menuDiv = document.createElement("div");
    menuDiv.setAttribute("id", "contextMenu");
    //menuDiv.setAttribute("class", "hidden");
    menuDiv.innerHTML =
        `<ul>
            <li>menu item</li>
            <li>menu item</li>
            <li>menu item</li>
            <li>menu item</li>
            <li>menu item</li>
            <li>menu item</li>
        </ul>`;
    element.appendChild(menuDiv);
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
  if(event.target.classList.contains("defaultHighlight")){
    event.preventDefault();
    showMenu(event.target);
  }
});

// Close the menu when you left click anywhere
document.addEventListener("click", function(event){
    //document.getElementById("contextMenu").classList.add("hidden");
    hideMenu();
});