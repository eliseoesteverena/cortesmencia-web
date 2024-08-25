const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    ['image'],

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']   
];
const quill = new Quill('#editor', {
    modules: {
        toolbar: {
        container: toolbarOptions,
        handlers: {
            image: function () {
            selectLocalImage();
            }
        }
        }
    },
    theme: 'snow'
});  
function selectLocalImage() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
        const file = input.files[0];
        if (/^image\//.test(file.type)) {
        saveToServer(file);
        } else {
        console.warn('Please upload an image file.');
        }
    };
}

function saveToServer(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', e.target.result);
    };
    reader.readAsDataURL(file);
}
const $btnSave = document.getElementById("saveBtn"),
      $msgContent = document.querySelector("#msgContent"),
      editorParent = document.getElementById("editor"),
      cabecera = document.getElementById("cabecera");

let optionContent = document.getElementById("optionContent");
loadResume("profile", "es");

$btnSave.addEventListener("click", () => {
    $msgContent.style.display = "flex";
    
    $msgContent.innerHTML = `<svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" 
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/> </svg> 
                            <span class="sr-only">Info</span> 
                            <div>
                                <span class="font-medium">Guardando...</span>
                            </div>`;

    let claseLang = optionContent.options[optionContent.selectedIndex].value
    console.log(claseLang);
    
    let editor = editorParent.getElementsByTagName("div");
    let content = replaceSpecialChars(editor[0].innerHTML);

    if(claseLang == "profile-es"){
        save("profile", content, "es");
    } else if(claseLang == "profile-en") {
        save("profile", content, "en");
    } else if(claseLang == "thoughts-es") {
        save("thoughts", content, "es");
    } else if(claseLang == "thoughts-en") {
        save("thoughts", content, "en");
    } else if(claseLang == "reviews-es") {
        save("reviews", content, "es");
    } else if(claseLang == "reviews-en") {
        save("reviews", content, "en");
    }

    $msgContent.innerHTML = "<svg class=\"flex-shrink-0 inline w-4 h-4 me-3\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\" viewBox=\"0 0 20 20\"> <path d=\"M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z\"/> </svg> <span class=\"sr-only\">Info</span> <div> <span class=\"font-medium\">Guardado con Exito!</span></div>";
    setTimeout(remove, 4000);
    
});

function remove() {
    $msgContent.innerHTML = "";
}

optionContent.addEventListener("change", () => {
    let itemSelected = optionContent.value;
    console.log(itemSelected);
    if(itemSelected == "profile-es"){
        loadResume("profile", "es");
    } else if(itemSelected == "profile-en") {
        loadResume("profile", "en");
    } else if(itemSelected == "thoughts-es") {
        loadResume("thoughts", "es");
    } else if(itemSelected == "thoughts-en") {
        loadResume("thoughts", "en");
    } else if(itemSelected == "reviews-es") {
        loadResume("reviews", "es");
    } else if(itemSelected == "reviews-en") {
        loadResume("reviews", "en");
    }
})
async function loadResume(clase, lang) {
    let editor = editorParent.getElementsByTagName("div");
    console.log(editor);
    let query = {
        action: "read",
        type: clase,
        lang: lang,
        cuerpo: null
    }
    let dataJson = JSON.stringify(query);
    await fetch("./resume.php", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: dataJson

    })
    .then(respuestaCodificada => respuestaCodificada.json()) // Decodificar JSON que nos responde PHP
    .then(respuestaDecodificada => {
        console.log(respuestaDecodificada)
        editor[0].innerHTML = respuestaDecodificada;
    });
    
}
async function save(clase, data, langSelected) {
    let query = {
        action: "save",
        type: clase,
        cuerpo: data,
        lang: langSelected
    }
    let dataJson = JSON.stringify(query);
    fetch("./resume.php", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: dataJson
    }).then(respuestaHttp => {
        return respuestaHttp.text();
    }).then(respuestaComoTexto => {
        console.log("El servidor dice: " + respuestaComoTexto);
    })
}

function replaceSpecialChars(str) { const charMap = { '¡': '&iexcl;', '¢': '&cent;', '£': '&pound;', '¤': '&curren;', '¥': '&yen;', '¦': '&brvbar;', '§': '&sect;', '¨': '&uml;', '©': '&copy;', 'ª': '&ordf;', '«': '&laquo;', '¬': '&not;', '­': '&shy;', '®': '&reg;', '¯': '&macr;', '°': '&deg;', '±': '&plusmn;', '²': '&sup2;', '³': '&sup3;', '´': '&acute;', 'µ': '&micro;', '¶': '&para;', '·': '&middot;', '¸': '&cedil;', '¹': '&sup1;', 'º': '&ordm;', '»': '&raquo;', '¼': '&frac14;', '½': '&frac12;', '¾': '&frac34;', '¿': '&iquest;', 'À': '&Agrave;', 'Á': '&Aacute;', 'Â': '&Acirc;', 'Ã': '&Atilde;', 'Ä': '&Auml;', 'Å': '&Aring;', 'Æ': '&AElig;', 'Ç': '&Ccedil;', 'È': '&Egrave;', 'É': '&Eacute;', 'Ê': '&Ecirc;', 'Ë': '&Euml;', 'Ì': '&Igrave;', 'Í': '&Iacute;', 'Î': '&Icirc;', 'Ï': '&Iuml;', 'Ð': '&ETH;', 'Ñ': '&Ntilde;', 'Ò': '&Ograve;', 'Ó': '&Oacute;', 'Ô': '&Ocirc;', 'Õ': '&Otilde;', 'Ö': '&Ouml;', '×': '&times;', 'Ø': '&Oslash;', 'Ù': '&Ugrave;', 'Ú': '&Uacute;', 'Û': '&Ucirc;', 'Ü': '&Uuml;', 'Ý': '&Yacute;', 'Þ': '&THORN;', 'ß': '&szlig;', 'à': '&agrave;', 'á': '&aacute;', 'â': '&acirc;', 'ã': '&atilde;', 'ä': '&auml;', 'å': '&aring;', 'æ': '&aelig;', 'ç': '&ccedil;', 'è': '&egrave;', 'é': '&eacute;', 'ê': '&ecirc;', 'ë': '&euml;', 'ì': '&igrave;', 'í': '&iacute;', 'î': '&icirc;', 'ï': '&iuml;', 'ð': '&eth;', 'ñ': '&ntilde;', 'ò': '&ograve;', 'ó': '&oacute;', 'ô': '&ocirc;', 'õ': '&otilde;', 'ö': '&ouml;', '÷': '&divide;', 'ø': '&oslash;', 'ù': '&ugrave;', 'ú': '&uacute;', 'û': '&ucirc;', 'ü': '&uuml;', 'ý': '&yacute;', 'þ': '&thorn;', 'ÿ': '&yuml;', '–':'&#8211;', '“':'&#8220;','”':'&#8221;','„':'&#8222;' };

return str.replace(/[¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ–“”„]/g, function(match) { return charMap[match]; }); }
