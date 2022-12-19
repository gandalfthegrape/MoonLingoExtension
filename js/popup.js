console.log("Running popup.js");

let isoLangs = {
    "ab":{
        "name":"Abkhaz",
        "nativeName":"аҧсуа"
    },
    "aa":{
        "name":"Afar",
        "nativeName":"Afaraf"
    },
    "af":{
        "name":"Afrikaans",
        "nativeName":"Afrikaans"
    },
    "ak":{
        "name":"Akan",
        "nativeName":"Akan"
    },
    "sq":{
        "name":"Albanian",
        "nativeName":"Shqip"
    },
    "am":{
        "name":"Amharic",
        "nativeName":"አማርኛ"
    },
    "ar":{
        "name":"Arabic",
        "nativeName":"العربية"
    },
    "an":{
        "name":"Aragonese",
        "nativeName":"Aragonés"
    },
    "hy":{
        "name":"Armenian",
        "nativeName":"Հայերեն"
    },
    "as":{
        "name":"Assamese",
        "nativeName":"অসমীয়া"
    },
    "av":{
        "name":"Avaric",
        "nativeName":"авар мацӀ, магӀарул мацӀ"
    },
    "ae":{
        "name":"Avestan",
        "nativeName":"avesta"
    },
    "ay":{
        "name":"Aymara",
        "nativeName":"aymar aru"
    },
    "az":{
        "name":"Azerbaijani",
        "nativeName":"azərbaycan dili"
    },
    "bm":{
        "name":"Bambara",
        "nativeName":"bamanankan"
    },
    "ba":{
        "name":"Bashkir",
        "nativeName":"башҡорт теле"
    },
    "eu":{
        "name":"Basque",
        "nativeName":"euskara, euskera"
    },
    "be":{
        "name":"Belarusian",
        "nativeName":"Беларуская"
    },
    "bn":{
        "name":"Bengali",
        "nativeName":"বাংলা"
    },
    "bh":{
        "name":"Bihari",
        "nativeName":"भोजपुरी"
    },
    "bi":{
        "name":"Bislama",
        "nativeName":"Bislama"
    },
    "bs":{
        "name":"Bosnian",
        "nativeName":"bosanski jezik"
    },
    "br":{
        "name":"Breton",
        "nativeName":"brezhoneg"
    },
    "bg":{
        "name":"Bulgarian",
        "nativeName":"български език"
    },
    "my":{
        "name":"Burmese",
        "nativeName":"ဗမာစာ"
    },
    "ca":{
        "name":"Catalan; Valencian",
        "nativeName":"Català"
    },
    "ch":{
        "name":"Chamorro",
        "nativeName":"Chamoru"
    },
    "ce":{
        "name":"Chechen",
        "nativeName":"нохчийн мотт"
    },
    "ny":{
        "name":"Chichewa; Chewa; Nyanja",
        "nativeName":"chiCheŵa, chinyanja"
    },
    "zh":{
        "name":"Chinese",
        "nativeName":"中文 (Zhōngwén), 汉语, 漢語"
    },
    "cv":{
        "name":"Chuvash",
        "nativeName":"чӑваш чӗлхи"
    },
    "kw":{
        "name":"Cornish",
        "nativeName":"Kernewek"
    },
    "co":{
        "name":"Corsican",
        "nativeName":"corsu, lingua corsa"
    },
    "cr":{
        "name":"Cree",
        "nativeName":"ᓀᐦᐃᔭᐍᐏᐣ"
    },
    "hr":{
        "name":"Croatian",
        "nativeName":"hrvatski"
    },
    "cs":{
        "name":"Czech",
        "nativeName":"česky, čeština"
    },
    "da":{
        "name":"Danish",
        "nativeName":"dansk"
    },
    "dv":{
        "name":"Divehi; Dhivehi; Maldivian;",
        "nativeName":"ދިވެހި"
    },
    "nl":{
        "name":"Dutch",
        "nativeName":"Nederlands, Vlaams"
    },
    "en":{
        "name":"English",
        "nativeName":"English"
    },
    "eo":{
        "name":"Esperanto",
        "nativeName":"Esperanto"
    },
    "et":{
        "name":"Estonian",
        "nativeName":"eesti, eesti keel"
    },
    "ee":{
        "name":"Ewe",
        "nativeName":"Eʋegbe"
    },
    "fo":{
        "name":"Faroese",
        "nativeName":"føroyskt"
    },
    "fj":{
        "name":"Fijian",
        "nativeName":"vosa Vakaviti"
    },
    "fi":{
        "name":"Finnish",
        "nativeName":"suomi, suomen kieli"
    },
    "fr":{
        "name":"French",
        "nativeName":"français, langue française"
    },
    "ff":{
        "name":"Fula; Fulah; Pulaar; Pular",
        "nativeName":"Fulfulde, Pulaar, Pular"
    },
    "gl":{
        "name":"Galician",
        "nativeName":"Galego"
    },
    "ka":{
        "name":"Georgian",
        "nativeName":"ქართული"
    },
    "de":{
        "name":"German",
        "nativeName":"Deutsch"
    },
    "el":{
        "name":"Greek, Modern",
        "nativeName":"Ελληνικά"
    },
    "gn":{
        "name":"Guaraní",
        "nativeName":"Avañeẽ"
    },
    "gu":{
        "name":"Gujarati",
        "nativeName":"ગુજરાતી"
    },
    "ht":{
        "name":"Haitian; Haitian Creole",
        "nativeName":"Kreyòl ayisyen"
    },
    "ha":{
        "name":"Hausa",
        "nativeName":"Hausa, هَوُسَ"
    },
    "he":{
        "name":"Hebrew (modern)",
        "nativeName":"עברית"
    },
    "hz":{
        "name":"Herero",
        "nativeName":"Otjiherero"
    },
    "hi":{
        "name":"Hindi",
        "nativeName":"हिन्दी, हिंदी"
    },
    "ho":{
        "name":"Hiri Motu",
        "nativeName":"Hiri Motu"
    },
    "hu":{
        "name":"Hungarian",
        "nativeName":"Magyar"
    },
    "ia":{
        "name":"Interlingua",
        "nativeName":"Interlingua"
    },
    "id":{
        "name":"Indonesian",
        "nativeName":"Bahasa Indonesia"
    },
    "ie":{
        "name":"Interlingue",
        "nativeName":"Originally called Occidental; then Interlingue after WWII"
    },
    "ga":{
        "name":"Irish",
        "nativeName":"Gaeilge"
    },
    "ig":{
        "name":"Igbo",
        "nativeName":"Asụsụ Igbo"
    },
    "ik":{
        "name":"Inupiaq",
        "nativeName":"Iñupiaq, Iñupiatun"
    },
    "io":{
        "name":"Ido",
        "nativeName":"Ido"
    },
    "is":{
        "name":"Icelandic",
        "nativeName":"Íslenska"
    },
    "it":{
        "name":"Italian",
        "nativeName":"Italiano"
    },
    "iu":{
        "name":"Inuktitut",
        "nativeName":"ᐃᓄᒃᑎᑐᑦ"
    },
    "ja":{
        "name":"Japanese",
        "nativeName":"日本語 (にほんご／にっぽんご)"
    },
    "jv":{
        "name":"Javanese",
        "nativeName":"basa Jawa"
    },
    "kl":{
        "name":"Kalaallisut, Greenlandic",
        "nativeName":"kalaallisut, kalaallit oqaasii"
    },
    "kn":{
        "name":"Kannada",
        "nativeName":"ಕನ್ನಡ"
    },
    "kr":{
        "name":"Kanuri",
        "nativeName":"Kanuri"
    },
    "ks":{
        "name":"Kashmiri",
        "nativeName":"कश्मीरी, كشميري‎"
    },
    "kk":{
        "name":"Kazakh",
        "nativeName":"Қазақ тілі"
    },
    "km":{
        "name":"Khmer",
        "nativeName":"ភាសាខ្មែរ"
    },
    "ki":{
        "name":"Kikuyu, Gikuyu",
        "nativeName":"Gĩkũyũ"
    },
    "rw":{
        "name":"Kinyarwanda",
        "nativeName":"Ikinyarwanda"
    },
    "ky":{
        "name":"Kirghiz, Kyrgyz",
        "nativeName":"кыргыз тили"
    },
    "kv":{
        "name":"Komi",
        "nativeName":"коми кыв"
    },
    "kg":{
        "name":"Kongo",
        "nativeName":"KiKongo"
    },
    "ko":{
        "name":"Korean",
        "nativeName":"한국어 (韓國語), 조선말 (朝鮮語)"
    },
    "ku":{
        "name":"Kurdish",
        "nativeName":"Kurdî, كوردی‎"
    },
    "kj":{
        "name":"Kwanyama, Kuanyama",
        "nativeName":"Kuanyama"
    },
    "la":{
        "name":"Latin",
        "nativeName":"latine, lingua latina"
    },
    "lb":{
        "name":"Luxembourgish, Letzeburgesch",
        "nativeName":"Lëtzebuergesch"
    },
    "lg":{
        "name":"Luganda",
        "nativeName":"Luganda"
    },
    "li":{
        "name":"Limburgish, Limburgan, Limburger",
        "nativeName":"Limburgs"
    },
    "ln":{
        "name":"Lingala",
        "nativeName":"Lingála"
    },
    "lo":{
        "name":"Lao",
        "nativeName":"ພາສາລາວ"
    },
    "lt":{
        "name":"Lithuanian",
        "nativeName":"lietuvių kalba"
    },
    "lu":{
        "name":"Luba-Katanga",
        "nativeName":"Luba-Katanga"
    },
    "lv":{
        "name":"Latvian",
        "nativeName":"latviešu valoda"
    },
    "gv":{
        "name":"Manx",
        "nativeName":"Gaelg, Gailck"
    },
    "mk":{
        "name":"Macedonian",
        "nativeName":"македонски јазик"
    },
    "mg":{
        "name":"Malagasy",
        "nativeName":"Malagasy fiteny"
    },
    "ms":{
        "name":"Malay",
        "nativeName":"bahasa Melayu, بهاس ملايو‎"
    },
    "ml":{
        "name":"Malayalam",
        "nativeName":"മലയാളം"
    },
    "mt":{
        "name":"Maltese",
        "nativeName":"Malti"
    },
    "mi":{
        "name":"Māori",
        "nativeName":"te reo Māori"
    },
    "mr":{
        "name":"Marathi (Marāṭhī)",
        "nativeName":"मराठी"
    },
    "mh":{
        "name":"Marshallese",
        "nativeName":"Kajin M̧ajeļ"
    },
    "mn":{
        "name":"Mongolian",
        "nativeName":"монгол"
    },
    "na":{
        "name":"Nauru",
        "nativeName":"Ekakairũ Naoero"
    },
    "nv":{
        "name":"Navajo, Navaho",
        "nativeName":"Diné bizaad, Dinékʼehǰí"
    },
    "nb":{
        "name":"Norwegian Bokmål",
        "nativeName":"Norsk bokmål"
    },
    "nd":{
        "name":"North Ndebele",
        "nativeName":"isiNdebele"
    },
    "ne":{
        "name":"Nepali",
        "nativeName":"नेपाली"
    },
    "ng":{
        "name":"Ndonga",
        "nativeName":"Owambo"
    },
    "nn":{
        "name":"Norwegian Nynorsk",
        "nativeName":"Norsk nynorsk"
    },
    "no":{
        "name":"Norwegian",
        "nativeName":"Norsk"
    },
    "ii":{
        "name":"Nuosu",
        "nativeName":"ꆈꌠ꒿ Nuosuhxop"
    },
    "nr":{
        "name":"South Ndebele",
        "nativeName":"isiNdebele"
    },
    "oc":{
        "name":"Occitan",
        "nativeName":"Occitan"
    },
    "oj":{
        "name":"Ojibwe, Ojibwa",
        "nativeName":"ᐊᓂᔑᓈᐯᒧᐎᓐ"
    },
    "cu":{
        "name":"Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
        "nativeName":"ѩзыкъ словѣньскъ"
    },
    "om":{
        "name":"Oromo",
        "nativeName":"Afaan Oromoo"
    },
    "or":{
        "name":"Oriya",
        "nativeName":"ଓଡ଼ିଆ"
    },
    "os":{
        "name":"Ossetian, Ossetic",
        "nativeName":"ирон æвзаг"
    },
    "pa":{
        "name":"Panjabi, Punjabi",
        "nativeName":"ਪੰਜਾਬੀ, پنجابی‎"
    },
    "pi":{
        "name":"Pāli",
        "nativeName":"पाऴि"
    },
    "fa":{
        "name":"Persian",
        "nativeName":"فارسی"
    },
    "pl":{
        "name":"Polish",
        "nativeName":"polski"
    },
    "ps":{
        "name":"Pashto, Pushto",
        "nativeName":"پښتو"
    },
    "pt":{
        "name":"Portuguese",
        "nativeName":"Português"
    },
    "qu":{
        "name":"Quechua",
        "nativeName":"Runa Simi, Kichwa"
    },
    "rm":{
        "name":"Romansh",
        "nativeName":"rumantsch grischun"
    },
    "rn":{
        "name":"Kirundi",
        "nativeName":"kiRundi"
    },
    "ro":{
        "name":"Romanian, Moldavian, Moldovan",
        "nativeName":"română"
    },
    "ru":{
        "name":"Russian",
        "nativeName":"русский язык"
    },
    "sa":{
        "name":"Sanskrit (Saṁskṛta)",
        "nativeName":"संस्कृतम्"
    },
    "sc":{
        "name":"Sardinian",
        "nativeName":"sardu"
    },
    "sd":{
        "name":"Sindhi",
        "nativeName":"सिन्धी, سنڌي، سندھی‎"
    },
    "se":{
        "name":"Northern Sami",
        "nativeName":"Davvisámegiella"
    },
    "sm":{
        "name":"Samoan",
        "nativeName":"gagana faa Samoa"
    },
    "sg":{
        "name":"Sango",
        "nativeName":"yângâ tî sängö"
    },
    "sr":{
        "name":"Serbian",
        "nativeName":"српски језик"
    },
    "gd":{
        "name":"Scottish Gaelic; Gaelic",
        "nativeName":"Gàidhlig"
    },
    "sn":{
        "name":"Shona",
        "nativeName":"chiShona"
    },
    "si":{
        "name":"Sinhala, Sinhalese",
        "nativeName":"සිංහල"
    },
    "sk":{
        "name":"Slovak",
        "nativeName":"slovenčina"
    },
    "sl":{
        "name":"Slovene",
        "nativeName":"slovenščina"
    },
    "so":{
        "name":"Somali",
        "nativeName":"Soomaaliga, af Soomaali"
    },
    "st":{
        "name":"Southern Sotho",
        "nativeName":"Sesotho"
    },
    "es":{
        "name":"Spanish; Castilian",
        "nativeName":"español, castellano"
    },
    "su":{
        "name":"Sundanese",
        "nativeName":"Basa Sunda"
    },
    "sw":{
        "name":"Swahili",
        "nativeName":"Kiswahili"
    },
    "ss":{
        "name":"Swati",
        "nativeName":"SiSwati"
    },
    "sv":{
        "name":"Swedish",
        "nativeName":"svenska"
    },
    "ta":{
        "name":"Tamil",
        "nativeName":"தமிழ்"
    },
    "te":{
        "name":"Telugu",
        "nativeName":"తెలుగు"
    },
    "tg":{
        "name":"Tajik",
        "nativeName":"тоҷикӣ, toğikī, تاجیکی‎"
    },
    "th":{
        "name":"Thai",
        "nativeName":"ไทย"
    },
    "ti":{
        "name":"Tigrinya",
        "nativeName":"ትግርኛ"
    },
    "bo":{
        "name":"Tibetan Standard, Tibetan, Central",
        "nativeName":"བོད་ཡིག"
    },
    "tk":{
        "name":"Turkmen",
        "nativeName":"Türkmen, Түркмен"
    },
    "tl":{
        "name":"Tagalog",
        "nativeName":"Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"
    },
    "tn":{
        "name":"Tswana",
        "nativeName":"Setswana"
    },
    "to":{
        "name":"Tonga (Tonga Islands)",
        "nativeName":"faka Tonga"
    },
    "tr":{
        "name":"Turkish",
        "nativeName":"Türkçe"
    },
    "ts":{
        "name":"Tsonga",
        "nativeName":"Xitsonga"
    },
    "tt":{
        "name":"Tatar",
        "nativeName":"татарча, tatarça, تاتارچا‎"
    },
    "tw":{
        "name":"Twi",
        "nativeName":"Twi"
    },
    "ty":{
        "name":"Tahitian",
        "nativeName":"Reo Tahiti"
    },
    "ug":{
        "name":"Uighur, Uyghur",
        "nativeName":"Uyƣurqə, ئۇيغۇرچە‎"
    },
    "uk":{
        "name":"Ukrainian",
        "nativeName":"українська"
    },
    "ur":{
        "name":"Urdu",
        "nativeName":"اردو"
    },
    "uz":{
        "name":"Uzbek",
        "nativeName":"zbek, Ўзбек, أۇزبېك‎"
    },
    "ve":{
        "name":"Venda",
        "nativeName":"Tshivenḓa"
    },
    "vi":{
        "name":"Vietnamese",
        "nativeName":"Tiếng Việt"
    },
    "vo":{
        "name":"Volapük",
        "nativeName":"Volapük"
    },
    "wa":{
        "name":"Walloon",
        "nativeName":"Walon"
    },
    "cy":{
        "name":"Welsh",
        "nativeName":"Cymraeg"
    },
    "wo":{
        "name":"Wolof",
        "nativeName":"Wollof"
    },
    "fy":{
        "name":"Western Frisian",
        "nativeName":"Frysk"
    },
    "xh":{
        "name":"Xhosa",
        "nativeName":"isiXhosa"
    },
    "yi":{
        "name":"Yiddish",
        "nativeName":"ייִדיש"
    },
    "yo":{
        "name":"Yoruba",
        "nativeName":"Yorùbá"
    },
    "za":{
        "name":"Zhuang, Chuang",
        "nativeName":"Saɯ cueŋƅ, Saw cuengh"
    }
}
let languageOptions = Object.keys(isoLangs);

let defaultUserLanguage;
let userLanguageSelect = document.getElementById("userLanguageSelect");
let defaultLanguage;
let languageSelect = document.getElementById("languageSelect");

//create all the options for language selection.
for (var i = 0; i < languageOptions.length; i++){
    let opt = languageOptions[i];
    let elem = document.createElement("option");
    elem.value = opt;
    elem.textContent = isoLangs[opt]["nativeName"];
    userLanguageSelect.appendChild(elem);

    let elem2 = document.createElement("option");
    elem2.value = opt;
    elem2.textContent = isoLangs[opt]["name"];
    languageSelect.appendChild(elem2);
}

chrome.storage.local.get(["prefs"], function (results) {
    if (results["prefs"]) {
        defaultUserLanguage = results["prefs"]["userLanguage"];
        console.log(defaultUserLanguage);
        if (defaultUserLanguage) {
            userLanguageSelect.value = defaultUserLanguage;
        }
    }
});


chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.detectLanguage(tabs[0].id, async (lang) => {
        console.log("Detected: " + lang);
        if ((lang == undefined) || (lang == "und")) {
            lang = await getDOMLanguage();
            console.log("DOMLang: " + lang);
        }
        defaultLanguage = lang.substring(0,2);
        if (languageOptions.includes(defaultLanguage)) {
            languageSelect.value = defaultLanguage;
            updateWordCount();
        }
    });
});

const getDOMLanguage = async () => {
    return new Promise(function (resolve, reject) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { "message": "getDOMLanguage" }, function (response) {
                if (!response) {
                    reject();
                } else {
                    resolve(response.language);
                }
            })
        })
    });
}

document.getElementById("applyDefaultHighlightsButton").addEventListener('click',
    function () {
        console.log("sending message");
        let language = languageSelect.value;
        let userLanguage = userLanguageSelect.value;
        if (language == "") {
            alert("No language selected.");
            return;
        }
        console.log(language);
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { "message": "applyDefaultHighlights", "language": language, "userLanguage": userLanguage });
            console.log("message sent");
            //chrome.tabs.executeScript(tab.id, { file: "js/applyDefaultHighlights.js" });
        });
    }
);

document.getElementById("removeAllHighlightsButton").addEventListener('click',
    function () {
        console.log("sending message");
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { "message": "removeAllHighlights" });
            console.log("message sent");
            //chrome.tabs.executeScript(tab.id, { file: "js/applyDefaultHighlights.js" });
        });
    }
);
const readLocalStorage = () => {
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

async function combineAndSave(newHighlights, language) {
    let highlights = await readLocalStorage();
    if (highlights[language] == undefined) {
        highlights[language] = newHighlights[language];
    } else {
        let hKeys = Object.keys(newHighlights[language]);
        console.log(hKeys);
        for (let i = 0; i < hKeys.length; i++) {
            if (highlights[language][hKeys[i].toLowerCase()] == undefined) {
                highlights[language][hKeys[i].toLowerCase()] = newHighlights[language][hKeys[i]];
            } else {
                //handle duplicate meanings/phrases
                let hLightVal = highlights[language][hKeys[i].toLowerCase()];
                let newhLightVal = newHighlights[language][hKeys[i]];
                highlights[language][hKeys[i].toLowerCase()].meaning = [...new Set([...hLightVal.meaning, ...newhLightVal.meaning])];
                highlights[language][hKeys[i].toLowerCase()].phrase = [...new Set([...hLightVal.phrase, ...newhLightVal.phrase])];
                highlights[language][hKeys[i].toLowerCase()].level = hLightVal.level < newhLightVal.level ? newhLightVal.level : hLightVal.level;
            }
        }; 
    }
    console.log(highlights);
    console.log("going to save!");
    await chrome.storage.local.set({ highlights }, () => { });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { "message": "refresh", "language": languageSelect.value, "userLanguage": userLanguageSelect.value });
    })
    
}

document.getElementById("csvInputButton").addEventListener('click',
    function () {
        console.log("csvInputButton clicked");
        let language = languageSelect.value;
        let csvInput = document.getElementById("csvInput").files[0];
        console.log(csvInput);

        Papa.parse(csvInput, {
            header: true,
            complete: async function (results) {
                let data = results.data;
                console.log(data);


                let languageHighlights = {};
                let n = data.length;
                for (let i = 0; i < n; i++) {
                    let item = data[i];
                    if (item.term == "") { console.log(item); continue; };
                    languageHighlights[item.term] = { meaning: [item.meaning1], phrase: [item.phrase], level : 1};
                      // .push({ `${item.term}` : [meaning: item.meaning1, phrase: item.phrase]} )
                }
                newHighlights = {};
                newHighlights[language] = languageHighlights;

                await combineAndSave(newHighlights, language);
            }
        })

        // if (csvInput) {
        //     console.log("path found");
        //     let reader = new FileReader();
        //     reader.onload = function (e) {
        //         console.log("reader loaded");
        //         let contents = e.target.result;
        //         contents = contents.replace(/[r|rn]/g, "n");
        //         let csvArrays = $.csv.toArray(contents);
        //         console.log(csvArrays);
        //     }
        //     reader.readAsText(csvInput);

        // }
        return;
        // can probably handle this here instead of passing to content script. Maybe need to refresh content script highlights afterward though.
    }
);

document.getElementById("languageCheckBox").addEventListener('click',
    function () {
        languageSelect.disabled = !languageSelect.disabled;
        return;
    }
);

document.getElementById("userLanguageSelect").addEventListener('change',
    function () {
        let userLanguage = userLanguageSelect.value;
        if (userLanguage != "--User language--") {
            defaultUserLanguage = userLanguage;
            savePreferences({ "userLanguage": userLanguage });
        }
        return;
    }
);

document.getElementById("languageSelect").addEventListener('change',
    () => {
        let lang = languageSelect.value;
        if (lang != "") {
            defaultLanguage = lang;
            //savePreferences({ "userLanguage": userLanguage });
        }

        updateWordCount();
    }
);    

function updateWordCount() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, { "message": "updateWordCount", "language": defaultLanguage }, response => {
                if (!response) {
                    reject();
                } else {
                    console.log(response);
                    document.getElementById("wordCount").innerText = `Word Count: ${response.wordCount}`;
                    resolve();
                }
               
            })
        })
    })
}

async function getPreferences() {
    return;
}

async function savePreferences(prefs) {
    await chrome.storage.local.set({ prefs }, () => { })
}

//////////////////////////////////////////////////////////////////////


document.getElementById("lingqRequest").addEventListener('click',
    async function () {
        let newHighlights = {};
        let lingqs = [];
        let lingq;

        //get lingqs

        // for (let i = 1; i <= 10; i++) {
        //     lingq = await lingqRequest(i, defaultLanguage);
        //     if (lingq.length == 0) { break }
        //     lingqs.push(...lingq);
        // }
        // // console.log(lingqs);
        // lingqs = processLingqs(lingqs);
        // newHighlights[defaultLanguage] = lingqs;
        // await combineAndSave(newHighlights, defaultLanguage);

        //get known words

        lingqs = [];
        for (let i = 1; i <= 100; i++) {
            lingq = await lingqKnownWordsRequest(i, defaultLanguage);
            if (lingq.length==0) { break; }
            lingqs.push(...lingq);
        }
        // console.log(lingqs);

        lingqs = processKnownWords(lingqs);
        // console.log(lingqsProcessed);
        newHighlights[defaultLanguage] = lingqs;
        await combineAndSave(newHighlights, defaultLanguage);

        return;
    }
);

function processLingqs(words) {
    let newWords = {};
    for (let i = 0; i < words.length; i++){
        let data = words[i];
        let word = data.term;
        let phrase = data.fragment;
        let notes = [];
        for (let j = 0; j < data.hints.length; j++){
            notes.push(data.hints[j].text);
        }
        let level = data.status;
        newWords[word] = {
            meaning: notes,
            phrase: [phrase],
            level: level
        }

    }

    return;
}

function processKnownWords(words) {
    let newWords = {};
    for (let i = 0; i < words.length; i++){
        let data = words[i];
        let word = data.word;
        if (!isNaN(parseFloat(word))) {
            continue;
        }
        newWords[data.word] = {
            meaning: [],
            phrase: [],
            level: 5
        }
    }
    return newWords;
}

function lingqRequest(page, lang) {
    return new Promise(function(resolve, reject){
        const url = `https://www.lingq.com/api/v3/${lang}/cards/?page=${page}&page_size=1000&search_criteria=startsWith&sort=alpha&status=1&status=2&status=3&status=4`;
        const req = new XMLHttpRequest();
        req.open("GET", url);
        req.send();
        req.onreadystatechange = (e) => {
            let status = req.status;
            if (status == 200) {
                let results = req.responseText;
                let json = JSON.parse(results);
                let lingqs = json.results;
               //console.log(lingqs);
                resolve(lingqs);
            } else {
                resolve([]);
            }
        }
    })
}
function lingqKnownWordsRequest(page, lang) {
    return new Promise(function (resolve, reject) {
        const url = `https://www.lingq.com/api/v2/${lang}/known-words/?page=${page}&page_size=1000`;
        const req = new XMLHttpRequest();
        req.open("GET", url);
        req.send();
        req.onreadystatechange = (e) => {
            let status = req.status;
            if (status == 200) {
                let results = req.responseText;
                let json = JSON.parse(results);
                let lingqs = json.results;
               //console.log(lingqs);
                resolve(lingqs);
            } else {
                resolve([]);
            }
        }
    })
}









async function getIPAText(word) {
    return new Promise(function (resolve, reject) {
        console.log(word);
        url = `https://${defaultLanguage}.wiktionary.org/wiki/` + word;
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
                let ipaText = dummy.getElementsByClassName("ipa") || dummy.getElementsByClassName("IPA");
                if (ipaText.length==0) {
                    resolve("");
                }
                resolve(results);
            } else {
                resolve("");
            }
        }
    })
}

chrome.runtime.onMessage.addListener(
    async function (request, sender, sendResonse) {
        console.log("message received");
        if (request.message === "getIPA") {
            console.log("Message = getIPA");
            let ipa = await getIPAText(request.word);
            sendReponse({ipa: ipa})
        }
    }
);
// let testNode = document.getElementById("test");
// testNode.addEventListener('click', async () => { return getIPAText("lernen") });