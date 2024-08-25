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
        loadPerfil = document.getElementById("loadPerfil"),
        loadPensamientos = document.getElementById("loadPensamientos"),
        loadEntrevistas = document.getElementById("loadEntrevistas"),
        titleEditor = document.getElementById("titleEditor"),
      $msgContent = document.querySelector("#msgContent");

let typeLang = document.getElementById("typeLang");
load(typeLang[0].value);

loadEntrevistas.addEventListener("click", () => {
    updateElementClasses(loadPerfil, loadEntrevistas);
    updateElementClasses(loadPensamientos);
    titleEditor.innerText = "Editar Entrevistas"
    typeLang[0].value = "entrevistas-es";
    typeLang[1].value = "entrevistas-en";
    load(typeLang[0].value);
});
loadPensamientos.addEventListener("click", () => {
    updateElementClasses(loadPerfil, loadPensamientos);
    updateElementClasses(loadEntrevistas);
    titleEditor.innerText = "Editar Pensamientos"
    typeLang[0].value = "pensamientos-es";
    typeLang[1].value = "pensamientos-en";
    load(typeLang[0].value);
});
loadPerfil.addEventListener("click", () => {
    updateElementClasses(loadEntrevistas, loadPerfil);
    updateElementClasses(loadPensamientos);
    titleEditor.innerText = "Editar Exhibiciones y CV"
    typeLang[0].value = "perfil-es";
    typeLang[1].value = "perfil-en";
    load(typeLang[0].value);

});


$btnSave.addEventListener("click", () => {
    let editor = document.getElementById("editor");
    let contenido = editor.getElementsByTagName("div");
    let data = replaceSpecialChars(contenido[0].innerHTML);

    let claseLang = typeLang.options[typeLang.selectedIndex].value

    save(data, claseLang);
});
typeLang.addEventListener("change", () => {
    let langSelected = typeLang.value;
    load(langSelected);
})
async function load(lang) {
    console.log(lang)
    let query = {
        action: "read",
        lang: lang,
        cuerpo: null
    }
    let dataJson = JSON.stringify(query);
    await fetch("./editor.php", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: dataJson

    })
    .then(respuestaCodificada => respuestaCodificada.json()) // Decodificar JSON que nos responde PHP
    .then(respuestaDecodificada => {
        let editor = document.getElementById("editor");
        let contenido = editor.getElementsByTagName("div");
        contenido[0].innerHTML = respuestaDecodificada;
    });
    
}
async function save(data, claseLang) {
    $msgContent.style.display = "flex";
    $msgContent.innerHTML = "<svg class=\"flex-shrink-0 inline w-4 h-4 me-3\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\" viewBox=\"0 0 20 20\"> <path d=\"M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z\"/> </svg> <span class=\"sr-only\">Info</span> <div> <span class=\"font-medium\">Guardando...</span></div>";
    let query = {
        action: "save",
        cuerpo: data,
        lang: claseLang
    }
    let dataJson = JSON.stringify(query);
    fetch("./editor.php", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: dataJson
    }).then(respuestaHttp => {
        return respuestaHttp.text();
    }).then(respuestaComoTexto => {
        console.log("El servidor dice: " + respuestaComoTexto);
        $msgContent.innerHTML = "<svg class=\"flex-shrink-0 inline w-4 h-4 me-3\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\" viewBox=\"0 0 20 20\"> <path d=\"M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z\"/> </svg> <span class=\"sr-only\">Info</span> <div> <span class=\"font-medium\">Guardado con Exito!</span></div>";
        setTimeout(remove, 5000);
    })
}

function remove() {
    $msgContent.innerHTML = "";
}

function updateElementClasses(element1, element2 = null) {
    if (element1.classList.contains("text-white")) {
        element1.classList.replace("text-white", "text-gray-800");
    }
    if (element1.classList.contains("bg-blue-700")) {
        element1.classList.replace("bg-blue-700", "bg-white");
    }
    if (element1.classList.contains("hover:bg-blue-800")) {
        element1.classList.replace("hover:bg-blue-800", "hover:bg-gray-100");
    }
    if (element1.classList.contains("shadow-lg")) {
        element1.classList.remove("shadow-lg");
    }

    if (element1.firstElementChild && element1.firstElementChild.classList.contains("text-white")) {
        element1.firstElementChild.classList.replace("text-white", "text-gray-800");
    }
    if(element2 !== null){
        if (element2.classList.contains("text-gray-800")) {
            element2.classList.replace("text-gray-800", "text-white");
        }
        if (element2.classList.contains("bg-white")) {
            element2.classList.replace("bg-white", "bg-blue-700");
        }
        if (element2.classList.contains("hover:bg-gray-100")) {
            element2.classList.replace("hover:bg-gray-100", "hover:bg-blue-800");
        }
    
        if (!element2.classList.contains("shadow-lg")) {
            element2.classList.add("shadow-lg");
        }
    
        if (element2.firstElementChild && element2.firstElementChild.classList.contains("text-gray-800")) {
            element2.firstElementChild.classList.replace("text-gray-800", "text-white");
        }
    }
}



function replaceSpecialChars(str) { const charMap = { '¡': '&iexcl;', '¢': '&cent;', '£': '&pound;', '¤': '&curren;', '¥': '&yen;', '¦': '&brvbar;', '§': '&sect;', '¨': '&uml;', '©': '&copy;', 'ª': '&ordf;', '«': '&laquo;', '¬': '&not;', '­': '&shy;', '®': '&reg;', '¯': '&macr;', '°': '&deg;', '±': '&plusmn;', '²': '&sup2;', '³': '&sup3;', '´': '&acute;', 'µ': '&micro;', '¶': '&para;', '·': '&middot;', '¸': '&cedil;', '¹': '&sup1;', 'º': '&ordm;', '»': '&raquo;', '¼': '&frac14;', '½': '&frac12;', '¾': '&frac34;', '¿': '&iquest;', 'À': '&Agrave;', 'Á': '&Aacute;', 'Â': '&Acirc;', 'Ã': '&Atilde;', 'Ä': '&Auml;', 'Å': '&Aring;', 'Æ': '&AElig;', 'Ç': '&Ccedil;', 'È': '&Egrave;', 'É': '&Eacute;', 'Ê': '&Ecirc;', 'Ë': '&Euml;', 'Ì': '&Igrave;', 'Í': '&Iacute;', 'Î': '&Icirc;', 'Ï': '&Iuml;', 'Ð': '&ETH;', 'Ñ': '&Ntilde;', 'Ò': '&Ograve;', 'Ó': '&Oacute;', 'Ô': '&Ocirc;', 'Õ': '&Otilde;', 'Ö': '&Ouml;', '×': '&times;', 'Ø': '&Oslash;', 'Ù': '&Ugrave;', 'Ú': '&Uacute;', 'Û': '&Ucirc;', 'Ü': '&Uuml;', 'Ý': '&Yacute;', 'Þ': '&THORN;', 'ß': '&szlig;', 'à': '&agrave;', 'á': '&aacute;', 'â': '&acirc;', 'ã': '&atilde;', 'ä': '&auml;', 'å': '&aring;', 'æ': '&aelig;', 'ç': '&ccedil;', 'è': '&egrave;', 'é': '&eacute;', 'ê': '&ecirc;', 'ë': '&euml;', 'ì': '&igrave;', 'í': '&iacute;', 'î': '&icirc;', 'ï': '&iuml;', 'ð': '&eth;', 'ñ': '&ntilde;', 'ò': '&ograve;', 'ó': '&oacute;', 'ô': '&ocirc;', 'õ': '&otilde;', 'ö': '&ouml;', '÷': '&divide;', 'ø': '&oslash;', 'ù': '&ugrave;', 'ú': '&uacute;', 'û': '&ucirc;', 'ü': '&uuml;', 'ý': '&yacute;', 'þ': '&thorn;', 'ÿ': '&yuml;', '–':'&#8211;', '“':'&#8220;','”':'&#8221;','„':'&#8222;' };

return str.replace(/[¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ–“”„]/g, function(match) { return charMap[match]; }); }
