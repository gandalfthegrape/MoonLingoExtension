console.log("Running content_script.js");
// chrome.tabs.query({ active: true }, tab => {
//     chrome.tabs.executeScript(tab.id, { file: "applyDefaultHighlights.js" });
// })
let currentElement;

async function showMenu() {
    const parent = currentElement.parentElement;
    if (parent.nodeName == "A") {
        toggleDisableLink(parent);
    };

    const text = currentElement.dataset.word;
    const note = currentElement.dataset.note || "";
    const level = currentElement.dataset.level || 1;

    let menuDiv = document.createElement("div");
    menuDiv.setAttribute("id", "contextMenu");
    menuDiv.setAttribute("class", "noHideOnClick");
    menuDiv.innerHTML = `${text}<br>`;

    // let ipaNode = document.createElement("span");
    // ipaNode.setAttribute("id", "ipaNode");
    // ipaNode.setAttribute("class", "noHideOnClick");

    let textInput = document.createElement("input");
    textInput.setAttribute("id", "userDefinition")
    textInput.setAttribute("type", "text");
    textInput.setAttribute("class", "noHideOnClick");
    textInput.setAttribute("value", note);
    menuDiv.appendChild(textInput);

    let levelInput = document.createElement("select");
    levelInput.setAttribute("id", "levelInput");
    levelInput.setAttribute("class", "noHideOnClick");
    levelInput.setAttribute("value", level);
    let elem;
    for (let i = 1; i <= 5; i++){
        elem = document.createElement("option");
        elem.value = i;
        elem.textContent = i;
        if(level == i){elem.setAttribute("selected", null)}
        levelInput.appendChild(elem);
    }
    menuDiv.appendChild(levelInput);

    let okButton = document.createElement("input");
    okButton.setAttribute("id", "contextMenuButton");
    okButton.setAttribute("type", "button");
    okButton.setAttribute("class", "noHideOnClick");
    okButton.setAttribute("value", "Save");
    okButton.onclick = async function () { await saveNote(text, textInput.value, levelInput.value) };
    menuDiv.appendChild(okButton);

    let knownButton = document.createElement("input");
    knownButton.setAttribute("id", "contextMenuKnownButton");
    knownButton.setAttribute("type", "button");
    knownButton.setAttribute("class", "noHideOnClick");
    knownButton.setAttribute("value", "Known");
    knownButton.onclick = async function () { levelInput.value = 5;  await saveNote(text, textInput.value, levelInput.value) };
    menuDiv.appendChild(knownButton);
    

    let wictionaryLink1 = document.createElement("input");
    wictionaryLink1.setAttribute("id", "wictionaryLink1");
    wictionaryLink1.setAttribute("type", "button");
    wictionaryLink1.setAttribute("class", "noHideOnClick");
    wictionaryLink1.setAttribute("value", `Wiktionary(${language})`);
    wictionaryLink1.onclick = async function (){ await window.open(`https://${language}.wiktionary.org/wiki/${text}`) }
    menuDiv.appendChild(wictionaryLink1);

    let wictionaryLink2 = document.createElement("input");
    wictionaryLink2.setAttribute("id", "wictionaryLink2");
    wictionaryLink2.setAttribute("type", "button");
    wictionaryLink2.setAttribute("class", "noHideOnClick");
    wictionaryLink2.setAttribute("value", `Wiktionary(${userLanguage})`);
    wictionaryLink2.onclick = async function (){ await window.open(`https://${userLanguage}.wiktionary.org/wiki/${text}`) }
    menuDiv.appendChild(wictionaryLink2);

    currentElement.appendChild(menuDiv);

    // ipaNode.textContent = 
    // await getIPAText(text);
}

async function getIPAText(word) {
    return new Promise(function (resolve, reject) {
        console.log(word);
        url = `https://${language}.wiktionary.org/wiki/` + word;
        console.log(url);

        let request = new XMLHttpRequest();
    
        request.open('GET', url, true),
        request.send()
        request.onreadystatechange = (e) => {
            let status = request.status;
            if (status == 200) {
                let results = request.responseText;
                let dummy = document.createElement("html");
                dummy.innerHTML = results;
                let ipaText = dummy.getElementsByClassName("IPA");
                console.log(ipaText.textContent);
                resolve(results);
            } else {
                resolve(undefined);
            }
        }
    })
}

function hideMenu() {
    const menuDiv = document.getElementById("contextMenu");
    if (menuDiv === null) { return };

    const parent = menuDiv.parentElement;
    if (parent.nodeName == "A") {
        toggleDisableLink(parent);
    };
    parent.removeChild(menuDiv);
    hideMenu();
}

function toggleDisableLink(node) {
    const link = node.href;
    const data = node.dataset.link;
    if (link != undefined) {
        node.classList.add("disabledLink");
        node.setAttribute("data-link", link);
        node.removeAttribute("href");
    } else if (data != undefined) {
        node.classList.remove("disabledLink");
        node.setAttribute("href", data);
        node.removeAttribute("data-link");
    }
}
// Set up an event handler for the document right click
document.addEventListener("contextmenu", async function(event) {
  // Only do something when the element that was actually right-clicked
  // on has the right class to trigger the menu
    if (event.target.className.includes("highlight-")) {
        hideMenu();
        event.preventDefault();
        currentElement = event.target;
        await showMenu();
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

let highlights;
let language = "en";
let userLanguage = "en";


const readLocalStorage = async () => {
    console.log("readLocalStorage");
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(["highlights"], function (results) {
            if (results["highlights"] === undefined) {
                resolve({}); // this is potentially dangerous, if the get is unsuccessful but highlights do exist, they will get overwritten later.
            } else {
                resolve(results["highlights"]);
            }
        });
    });
};

async function initializeHighlights() {
    console.log("initializeHighlights");
    console.log(language);
    highlights = await readLocalStorage();
   // chrome.storage.local.get("highlights", results => {
    if (!highlights) {
        results = {};
    };
    if (!highlights[language]) {
        highlights[language] = {};
    };
    await chrome.storage.local.set({ highlights }, () => { });
};

async function saveNote(word, note, level) {
    console.log("saveNote");

    console.log(`Saving ${language} ${word} with note ${note}`)

    //eventually want to handle adding / removing notes

    // if (highlights[language][word] != undefined) {
    //     highlights[language][word] = {
    //         meaning: [...new Set([...highlights[language][word], [note]])],
    //         phrase: [...new Set([...highlights[language][word], []])]
    //     }
    // } else {
    

    highlights[language][word] = {
        meaning: [note],
        phrase: [],
        level: level,
    };
    // }
    await chrome.storage.local.set({ highlights }, () => { });
    console.log("storage saved");

    // need some way to distribute element to the same word elsewhere on the page.
    document.querySelectorAll(`[data-word="${word}"`).forEach(el => {
        el.setAttribute("class", "highlight-" + level);
        el.setAttribute("data-note", note);
        el.setAttribute("data-level", level);
    }
    )
};











///////////////////////////////////////////////


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("message received");
        if (request.message === "applyDefaultHighlights") {
            console.log("Message = applyDefaultHighlights");
            removeAllHighlights();
            userLanguage = request.userLanguage;
            language = request.language;
            hightlightEntirePage();
        }else if (request.message === "refresh") {
            console.log("Message = applyDefaultHighlights");
            initializeHighlights();
            removeAllHighlights();
            userLanguage = request.userLanguage;
            language = request.language;
            hightlightEntirePage();
        }else if (request.message === "removeAllHighlights") {
            removeAllHighlights();
        }else if (request.message === "getDOMLanguage") {
            sendResponse({ "language": document.documentElement.lang })
        } else if (request.message === "updateWordCount") {
            getWordCount(request.language).then(wordCount => { sendResponse({ "wordCount": wordCount }) })
        } else {
            sendResponse({ "message": "invalid message" })
        }
        return true;
    }
);

async function getWordCount(lang) {
    if (highlights===undefined) {
        await initializeHighlights();
    }
    let words = highlights[lang];
    let wordCount = 0;
    if (words != undefined) {
        wordCount = Object.keys(words).length;
    }
    console.log("WordCount: " + wordCount);
    return wordCount;
}

function removeAllHighlights() {
    document.querySelectorAll('[class*=highlight]').forEach(el => el.replaceWith(el.innerText));
    return;
}

async function hightlightEntirePage() {
    console.log("highlightEntirePage");
   // setZIndices();
    await initializeHighlights();
    findAndReplaceDOMText(
        document.body,
        {
            preset: 'prose',
            //find: /[-'’A-Za-zÀ-ÖØ-öø-ÿ]+/g,
            find: /[-'’\p{L}]+/gu,
            replace: replacementNodes
    //     wrap: 'span',
    //     wrapClass: 'defaultHighlight',
        }
    );
};

function tokenizeScript(text, language) {
    var it = Intl.v8BreakIterator([language], {type:'word'})
    it.adoptText(text)
    var words = []
  
    var cur = 0, prev = 0
  
    while (cur < text.length) {
      prev = cur
      cur = it.next()
      words.push(text.substring(prev, cur))
    }
  
    return words
}

function replacementNodes(portion, match) {
    let node;
    if (language == "zh") {
        node = document.createElement("span");
        let words = tokenizeScript(portion.text, language);
        // console.log(words);
        for (let i = 0; i < words.length; i++){
            let wordNode = createWordNode(words[i]);
            node.appendChild(wordNode);
        }
    } else {
        node = createWordNode(portion.text);
    }
    return node;
};

function createWordNode(word) {
    let wordNode = document.createElement("span");
    wordNode.innerText = word;

    word = word.toLowerCase();
    word = word.replace(/^[-'’]+|[-'’]+$/gu, '');

    wordNode.setAttribute("data-word", word);
    let wordData = highlights[language][word];
    if (!wordData) {
        wordNode.setAttribute("class", "highlight-0");
    } else {
        wordNode.setAttribute("class", "highlight-" + wordData.level);
        wordNode.setAttribute("data-note", wordData.meaning[0]);//just displaying the first note for now
        wordNode.setAttribute("data-level", wordData.level);
    }
    return wordNode;
}


/////////////////////
//findAndReplaceDOMText

(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
    } else {
    // Browser globals
    root.findAndReplaceDOMText = factory();
    }
}(this, function factory() {

let PORTION_MODE_RETAIN = 'retain';
let PORTION_MODE_FIRST = 'first';

let doc = document;
let hasOwn = {}.hasOwnProperty;

function escapeRegExp(s) {
    return String(s).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
}

function exposed() {
    // Try deprecated arg signature first:
    return deprecated.apply(null, arguments) || findAndReplaceDOMText.apply(null, arguments);
}

function deprecated(regex, node, replacement, captureGroup, elFilter) {
    if ((node && !node.nodeType) && arguments.length <= 2) {
    return false;
    }
    let isReplacementFunction = typeof replacement == 'function';

    if (isReplacementFunction) {
    replacement = (function(original) {
        return function(portion, match) {
        return original(portion.text, match.startIndex);
        };
    }(replacement));
    }

    // Awkward support for deprecated argument signature (<0.4.0)
    let instance = findAndReplaceDOMText(node, {

    find: regex,

    wrap: isReplacementFunction ? null : replacement,
    replace: isReplacementFunction ? replacement : '$' + (captureGroup || '&'),

    prepMatch: function(m, mi) {

        // Support captureGroup (a deprecated feature)

        if (!m[0]) throw 'findAndReplaceDOMText cannot handle zero-length matches';

        if (captureGroup > 0) {
        let cg = m[captureGroup];
        m.index += m[0].indexOf(cg);
        m[0] = cg;
        }

        m.endIndex = m.index + m[0].length;
        m.startIndex = m.index;
        m.index = mi;

        return m;
    },
    filterElements: elFilter
    });

    exposed.revert = function() {
    return instance.revert();
    };

    return true;
}

/**
 * findAndReplaceDOMText
 *
 * Locates matches and replaces with replacementNode
 *
 * @param {Node} node Element or Text node to search within
 * @param {RegExp} options.find The regular expression to match
 * @param {String|Element} [options.wrap] A NodeName, or a Node to clone
 * @param {String} [options.wrapClass] A classname to append to the wrapping element
 * @param {String|Function} [options.replace='$&'] What to replace each match with
 * @param {Function} [options.filterElements] A Function to be called to check whether to
 *	process an element. (returning true = process element,
    *	returning false = avoid element)
    */
function findAndReplaceDOMText(node, options) {
    return new Finder(node, options);
}

exposed.NON_PROSE_ELEMENTS = {
    br:1, hr:1,
    // Media / Source elements:
    script:1, style:1, img:1, video:1, audio:1, canvas:1, svg:1, map:1, object:1,
    // Input elements
    input:1, textarea:1, select:1, option:1, optgroup: 1, button:1
};

exposed.NON_CONTIGUOUS_PROSE_ELEMENTS = {

    // Elements that will not contain prose or block elements where we don't
    // want prose to be matches across element borders:

    // Block Elements
    address:1, article:1, aside:1, blockquote:1, dd:1, div:1,
    dl:1, fieldset:1, figcaption:1, figure:1, footer:1, form:1, h1:1, h2:1, h3:1,
    h4:1, h5:1, h6:1, header:1, hgroup:1, hr:1, main:1, nav:1, noscript:1, ol:1,
    output:1, p:1, pre:1, section:1, ul:1,
    // Other misc. elements that are not part of continuous inline prose:
    br:1, li: 1, summary: 1, dt:1, details:1, rp:1, rt:1, rtc:1,
    // Media / Source elements:
    script:1, style:1, img:1, video:1, audio:1, canvas:1, svg:1, map:1, object:1,
    // Input elements
    input:1, textarea:1, select:1, option:1, optgroup:1, button:1,
    // Table related elements:
    table:1, tbody:1, thead:1, th:1, tr:1, td:1, caption:1, col:1, tfoot:1, colgroup:1

};

exposed.NON_INLINE_PROSE = function(el) {
    return hasOwn.call(exposed.NON_CONTIGUOUS_PROSE_ELEMENTS, el.nodeName.toLowerCase());
};

// Presets accessed via `options.preset` when calling findAndReplaceDOMText():
exposed.PRESETS = {
    prose: {
    forceContext: exposed.NON_INLINE_PROSE,
    filterElements: function(el) {
        return !hasOwn.call(exposed.NON_PROSE_ELEMENTS, el.nodeName.toLowerCase());
    }
    }
};

exposed.Finder = Finder;

/**
 * Finder -- encapsulates logic to find and replace.
 */
function Finder(node, options) {

    let preset = options.preset && exposed.PRESETS[options.preset];

    options.portionMode = options.portionMode || PORTION_MODE_RETAIN;

    if (preset) {
    for (let i in preset) {
        if (hasOwn.call(preset, i) && !hasOwn.call(options, i)) {
        options[i] = preset[i];
        }
    }
    }

    this.node = node;
    this.options = options;

    // Enable match-preparation method to be passed as option:
    this.prepMatch = options.prepMatch || this.prepMatch;

    this.reverts = [];

    this.matches = this.search();

    if (this.matches.length) {
    this.processMatches();
    }

}

Finder.prototype = {

    /**
     * Searches for all matches that comply with the instance's 'match' option
     */
    search: function() {

    let match;
    let matchIndex = 0;
    let offset = 0;
    let regex = this.options.find;
    let textAggregation = this.getAggregateText();
    let matches = [];
    let self = this;
    console.log(regex);
    regex = typeof regex === 'string' ? RegExp(escapeRegExp(regex), 'g') : regex;
    console.log(regex);
    matchAggregation(textAggregation);

    function matchAggregation(textAggregation) {
        for (let i = 0, l = textAggregation.length; i < l; ++i) {

        let text = textAggregation[i];

        if (typeof text !== 'string') {
            // Deal with nested contexts: (recursive)
            matchAggregation(text);
            continue;
        }

        if (regex.global) {
            while (match = regex.exec(text)) {
            matches.push(self.prepMatch(match, matchIndex++, offset));
            }
        } else {
            if (match = text.match(regex)) {
            matches.push(self.prepMatch(match, 0, offset));
            }
        }

        offset += text.length;
        }
    }

    return matches;

    },

    /**
     * Prepares a single match with useful meta info:
     */
    prepMatch: function(match, matchIndex, characterOffset) {

    if (!match[0]) {
        throw new Error('findAndReplaceDOMText cannot handle zero-length matches');
    }

    match.endIndex = characterOffset + match.index + match[0].length;
    match.startIndex = characterOffset + match.index;
    match.index = matchIndex;

    return match;
    },

    /**
     * Gets aggregate text within subject node
     */
    getAggregateText: function() {

    let elementFilter = this.options.filterElements;
    let forceContext = this.options.forceContext;

    return getText(this.node);

    /**
     * Gets aggregate text of a node without resorting
     * to broken innerText/textContent
     */
    function getText(node) {

        if (node.nodeType === Node.TEXT_NODE) {
        return [node.data];
        }

        if (elementFilter && !elementFilter(node)) {
        return [];
        }

        let txt = [''];
        let i = 0;

        if (node = node.firstChild) do {

        if (node.nodeType === Node.TEXT_NODE) {
            txt[i] += node.data;
            continue;
        }

        let innerText = getText(node);

        if (
            forceContext &&
            node.nodeType === Node.ELEMENT_NODE &&
            (forceContext === true || forceContext(node))
        ) {
            txt[++i] = innerText;
            txt[++i] = '';
        } else {
            if (typeof innerText[0] === 'string') {
            // Bridge nested text-node data so that they're
            // not considered their own contexts:
            // I.e. ['some', ['thing']] -> ['something']
            txt[i] += innerText.shift();
            }
            if (innerText.length) {
            txt[++i] = innerText;
            txt[++i] = '';
            }
        }
        } while (node = node.nextSibling);

        return txt;

    }

    },

    /**
     * Steps through the target node, looking for matches, and
     * calling replaceFn when a match is found.
     */
    processMatches: function() {

    let matches = this.matches;
    let node = this.node;
    let elementFilter = this.options.filterElements;

    let startPortion,
        endPortion,
        innerPortions = [],
        curNode = node,
        match = matches.shift(),
        atIndex = 0, // i.e. nodeAtIndex
        matchIndex = 0,
        portionIndex = 0,
        doAvoidNode,
        nodeStack = [node];

    out: while (true) {

        if (curNode.nodeType === Node.TEXT_NODE) {

        if (!endPortion && curNode.length + atIndex >= match.endIndex) {
            // We've found the ending
            // (Note that, in the case of a single portion, it'll be an
            // endPortion, not a startPortion.)
            endPortion = {
            node: curNode,
            index: portionIndex++,
            text: curNode.data.substring(match.startIndex - atIndex, match.endIndex - atIndex),

            // If it's the first match (atIndex==0) we should just return 0
            indexInMatch: atIndex === 0 ? 0 : atIndex - match.startIndex,

            indexInNode: match.startIndex - atIndex,
            endIndexInNode: match.endIndex - atIndex,
            isEnd: true
            };

        } else if (startPortion) {
            // Intersecting node
            innerPortions.push({
            node: curNode,
            index: portionIndex++,
            text: curNode.data,
            indexInMatch: atIndex - match.startIndex,
            indexInNode: 0 // always zero for inner-portions
            });
        }

        if (!startPortion && curNode.length + atIndex > match.startIndex) {
            // We've found the match start
            startPortion = {
            node: curNode,
            index: portionIndex++,
            indexInMatch: 0,
            indexInNode: match.startIndex - atIndex,
            endIndexInNode: match.endIndex - atIndex,
            text: curNode.data.substring(match.startIndex - atIndex, match.endIndex - atIndex)
            };
        }

        atIndex += curNode.data.length;

        }

        doAvoidNode = curNode.nodeType === Node.ELEMENT_NODE && elementFilter && !elementFilter(curNode);

        if (startPortion && endPortion) {

        curNode = this.replaceMatch(match, startPortion, innerPortions, endPortion);

        // processMatches has to return the node that replaced the endNode
        // and then we step back so we can continue from the end of the
        // match:

        atIndex -= (endPortion.node.data.length - endPortion.endIndexInNode);

        startPortion = null;
        endPortion = null;
        innerPortions = [];
        match = matches.shift();
        portionIndex = 0;
        matchIndex++;

        if (!match) {
            break; // no more matches
        }

        } else if (
        !doAvoidNode &&
        (curNode.firstChild || curNode.nextSibling)
        ) {
        // Move down or forward:
        if (curNode.firstChild) {
            nodeStack.push(curNode);
            curNode = curNode.firstChild;
        } else {
            curNode = curNode.nextSibling;
        }
        continue;
        }

        // Move forward or up:
        while (true) {
        if (curNode.nextSibling) {
            curNode = curNode.nextSibling;
            break;
        }
        curNode = nodeStack.pop();
        if (curNode === node) {
            break out;
        }
        }

    }

    },

    /**
     * Reverts ... TODO
     */
    revert: function() {
    // Reversion occurs backwards so as to avoid nodes subsequently
    // replaced during the matching phase (a forward process):
    for (let l = this.reverts.length; l--;) {
        this.reverts[l]();
    }
    this.reverts = [];
    },

    prepareReplacementString: function(string, portion, match) {
    let portionMode = this.options.portionMode;
    if (
        portionMode === PORTION_MODE_FIRST &&
        portion.indexInMatch > 0
    ) {
        return '';
    }
    string = string.replace(/\$(\d+|&|`|')/g, function($0, t) {
        let replacement;
        switch(t) {
        case '&':
            replacement = match[0];
            break;
        case '`':
            replacement = match.input.substring(0, match.startIndex);
            break;
        case '\'':
            replacement = match.input.substring(match.endIndex);
            break;
        default:
            replacement = match[+t] || '';
        }
        return replacement;
    });

    if (portionMode === PORTION_MODE_FIRST) {
        return string;
    }

    if (portion.isEnd) {
        return string.substring(portion.indexInMatch);
    }

    return string.substring(portion.indexInMatch, portion.indexInMatch + portion.text.length);
    },

    getPortionReplacementNode: function(portion, match) {

    let replacement = this.options.replace || '$&';
    let wrapper = this.options.wrap;
    let wrapperClass = this.options.wrapClass;

    if (wrapper && wrapper.nodeType) {
        // Wrapper has been provided as a stencil-node for us to clone:
        let clone = doc.createElement('div');
        clone.innerHTML = wrapper.outerHTML || new XMLSerializer().serializeToString(wrapper);
        wrapper = clone.firstChild;
    }

    if (typeof replacement == 'function') {
        replacement = replacement(portion, match);
        if (replacement && replacement.nodeType) {
        return replacement;
        }
        return doc.createTextNode(String(replacement));
    }

    let el = typeof wrapper == 'string' ? doc.createElement(wrapper) : wrapper;

    if (el && wrapperClass) {
        el.className = wrapperClass;
    }

    replacement = doc.createTextNode(
        this.prepareReplacementString(
        replacement, portion, match
        )
    );

    if (!replacement.data) {
        return replacement;
    }

    if (!el) {
        return replacement;
    }

    el.appendChild(replacement);

    return el;
    },

    replaceMatch: function(match, startPortion, innerPortions, endPortion) {

    let matchStartNode = startPortion.node;
    let matchEndNode = endPortion.node;

    let precedingTextNode;
    let followingTextNode;

    if (matchStartNode === matchEndNode) {

        let node = matchStartNode;

        if (startPortion.indexInNode > 0) {
        // Add `before` text node (before the match)
        precedingTextNode = doc.createTextNode(node.data.substring(0, startPortion.indexInNode));
        node.parentNode.insertBefore(precedingTextNode, node);
        }

        // Create the replacement node:
        let newNode = this.getPortionReplacementNode(
        endPortion,
        match
        );

        node.parentNode.insertBefore(newNode, node);

        if (endPortion.endIndexInNode < node.length) { // ?????
        // Add `after` text node (after the match)
        followingTextNode = doc.createTextNode(node.data.substring(endPortion.endIndexInNode));
        node.parentNode.insertBefore(followingTextNode, node);
        }

        node.parentNode.removeChild(node);

        this.reverts.push(function() {
        if (precedingTextNode === newNode.previousSibling) {
            precedingTextNode.parentNode.removeChild(precedingTextNode);
        }
        if (followingTextNode === newNode.nextSibling) {
            followingTextNode.parentNode.removeChild(followingTextNode);
        }
        newNode.parentNode.replaceChild(node, newNode);
        });

        return newNode;

    } else {
        // Replace matchStartNode -> [innerMatchNodes...] -> matchEndNode (in that order)


        precedingTextNode = doc.createTextNode(
        matchStartNode.data.substring(0, startPortion.indexInNode)
        );

        followingTextNode = doc.createTextNode(
        matchEndNode.data.substring(endPortion.endIndexInNode)
        );

        let firstNode = this.getPortionReplacementNode(
        startPortion,
        match
        );

        let innerNodes = [];

        for (let i = 0, l = innerPortions.length; i < l; ++i) {
        let portion = innerPortions[i];
        let innerNode = this.getPortionReplacementNode(
            portion,
            match
        );
        portion.node.parentNode.replaceChild(innerNode, portion.node);
        this.reverts.push((function(portion, innerNode) {
            return function() {
            innerNode.parentNode.replaceChild(portion.node, innerNode);
            };
        }(portion, innerNode)));
        innerNodes.push(innerNode);
        }

        let lastNode = this.getPortionReplacementNode(
        endPortion,
        match
        );

        matchStartNode.parentNode.insertBefore(precedingTextNode, matchStartNode);
        matchStartNode.parentNode.insertBefore(firstNode, matchStartNode);
        matchStartNode.parentNode.removeChild(matchStartNode);

        matchEndNode.parentNode.insertBefore(lastNode, matchEndNode);
        matchEndNode.parentNode.insertBefore(followingTextNode, matchEndNode);
        matchEndNode.parentNode.removeChild(matchEndNode);

        this.reverts.push(function() {
        precedingTextNode.parentNode.removeChild(precedingTextNode);
        firstNode.parentNode.replaceChild(matchStartNode, firstNode);
        followingTextNode.parentNode.removeChild(followingTextNode);
        lastNode.parentNode.replaceChild(matchEndNode, lastNode);
        });

        return lastNode;
    }
    }

};

return exposed;

}));
  
