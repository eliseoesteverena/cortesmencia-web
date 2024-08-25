
localStorage.removeItem('tags');
const $titulo = document.querySelector("#title"),
        $medidas = document.querySelector("#medidas"),
        $anio = document.querySelector("#anio"),
        vendido = document.getElementById("vendido"),
        tecnica = document.getElementById("tecnica"),
        series = document.getElementById("series"),
        $contentInput = document.querySelector("#contentInput"),
        $inputArchivos = document.querySelector("#inputArchivos"),
        $btnNewTag = document.querySelector("#newTagBtn"),
        $btnCancelar = document.querySelector("#abortBtn"),
        $btnEnviar = document.querySelector("#subirCuadroBtn"),
        $msg = document.querySelector("#msg"),
        titleForm = document.getElementById("titleForm");
        const loading = "<div class=\"w-full\" role=\"status\"> <svg aria-hidden=\"true\" class=\"w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600\" viewBox=\"0 0 100 101\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z\" fill=\"currentColor\"/><path d=\"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z\" fill=\"currentFill\"/></svg> <span class=\"sr-only\">Loading...</span> </div>";


let idInMemory = localStorage.getItem('id');
let action;
let resultadoTipo;

if(idInMemory !== null){action = "update"; resultadoTipo = " actualizado "; load(idInMemory);}
else {
    titleForm.textContent = "Nuevo Cuadro"
    action = "insert";
    resultadoTipo = " añadido ";
    let getTecnicas = {action: "getTecnicas", languague: "es"}
    fillSelect(getTecnicas, tecnica);
    let getSeries = {action: "getSeries", languague: "es"}
    fillSelect(getSeries, series);
}

console.log("id:", idInMemory);
console.log("action:", action);

/*
function load(idInMemory) {
    const datos = {
        action: "searchById",
        languague: "es",
        param: {
            id: idInMemory
        }
   };
    let datosJSON = JSON.stringify(datos);
    console.log(datosJSON);
    fetch('../../app.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: datosJSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Obtén la respuesta como JSON
    })
    .then(data => {
        console.log(data);
        setValues(data); 
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
};*/
async function load() {
    const datos = {
        action: "byId",
        languague: "es",
        param: {
            id: idInMemory
        }
    };
    let response = await get(datos);
    setValues(response);    
};

$btnNewTag.addEventListener("click", () => {
    openModal('new_tag');
})
$btnCancelar.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "https://cortesmencia.art/administracion/cuadros";
})

$btnEnviar.addEventListener("click", async () => {
    let vendidoCheck = document.getElementById("vendido");
    let titulo = $titulo.value,
        medidas = $medidas.value,
        anio = $anio.value,
        vendido = vendidoCheck.checked,
        tecnicaValue = tecnica.options[tecnica.selectedIndex].value,
        serieValue = series.options[series.selectedIndex].value,
        imagen = document.getElementById("img");
        const srcValue = imagen.getAttribute("src");
        const fileName = srcValue.split('/').pop();

    const datos = {
        action: action,
        languague: "es",
        param: {
            id: idInMemory,
            titulo: titulo,
            medidas: medidas,
            anio: anio,
            imagen: fileName,
            tecnica: tecnicaValue,
            serie: serieValue,
            vendido: vendido
        }
    };
    await put(datos);
    $msg.setAttribute("class", "flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400");
    $msg.innerHTML = "<svg class=\"flex-shrink-0 inline w-4 h-4 me-3\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\" viewBox=\"0 0 20 20\"> <path d=\"M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z\"/> </svg> <span class=\"sr-only\">Info</span> <div> <span class=\"text-lg\">¡Cuadro" + resultadoTipo + "con Exito!</span></div>";
    
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' // 'auto' para un desplazamiento instantáneo
      });;
});

$inputArchivos.addEventListener('change', async (event) => {
    if ($inputArchivos.files.length > 0) {
        console.log('File loaded:', $inputArchivos.files[0].name);
        let archivosParaSubir = $inputArchivos.files
        let imgName = await upFile(archivosParaSubir);
        let img = await writeImg(imgName);
        $contentInput.appendChild(img);
    } else {
        console.log('No file loaded');
        message.textContent = 'No file loaded';
    }
});

function upFile(archivosParaSubir) {
    return new Promise((resolve) => {
            // Preparamos el formdata
            const formData = new FormData();
            // Agregamos cada archivo a "archivos[]". Los corchetes son importantes
            for (const archivo of archivosParaSubir) {
                formData.append("archivos[]", archivo);
            }

            fetch("./guardar.php", {
                method: "POST",
                body: formData,
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                resolve(response.json()); // Obtén la respuesta como JSON
            })
            .then(data => {
                return data; // Imprime la respuesta en formato JSON
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    });
}

function openModal(action) {
        let titleModal = function(){if(action == "new_tag"){return "Nueva Etiqueta";}else{ tagName = capitalizar(action); return "Editar Etiqueta: " + tagName;}}
        let modalElement = document.createElement("div")
        let modalElementClass = modalElement.classList;
        modalElement.setAttribute("id", "modal")
        modalElementClass.add("w-full", "max-w-96", "bg-white", "rounded-lg", "shadowz-50", "modal", "shadow-md");
        if(action == "new_tag"){
            let modal = "<div class=\"flex items-center justify-between p-4 md:p-5 border-b rounded-t\"> <h3 class=\"text-l font-semibold text-gray-900\">" + titleModal() + "</h3> <button type=\"button\" class=\"close-modal end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center\" onclick=\"closeModal()\"> <svg class=\"w-3 h-3\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 14 14\"> <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6\"/> </svg> <span class=\"sr-only\">Close modal</span> </button> </div> <div class=\"p-4 md:p-5\"> <div class=\"space-y-4\" action=\"#\"> <div> <label for=\"tagEs\" class=\"tagEs block mb-2 text-sm font-medium text-gray-900\">Categoría en Español</label> <input type=\"text\" id=\"tagEs\" name=\"text\" class=\"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5\"  value=\"\" /> </div> <div> <label for=\"tagEn\" class=\"tagEn block mb-2 text-sm font-medium text-gray-900\">Categoría en Inglés</label> <input type=\"text\" id=\"tagEn\" value=\"\" class=\"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5\"/> </div> <button onclick=\"stateCategory(\'" + action + "\')\" class=\"set-category w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center\">Aceptar</button> </div> </div>";
            modalElement.innerHTML = modal;
            writeModal(modalElement);
        } else if(action == "new_option_tecnica"){
            let modal = "<div class=\"flex items-center justify-between p-4 md:p-5 border-b rounded-t\"> <h3 class=\"text-l font-semibold text-gray-900\">Tecnica Serie</h3> <button type=\"button\" class=\"close-modal end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center\" onclick=\"closeModal()\"> <svg class=\"w-3 h-3\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 14 14\"> <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6\"/> </svg> <span class=\"sr-only\">Close modal</span> </button> </div> <div class=\"p-4 md:p-5\"> <div class=\"space-y-4\" action=\"#\"> <div> <label for=\"tecnicaEs\" class=\"tagEs block mb-2 text-sm font-medium text-gray-900\">Tecnica en Español</label> <input type=\"text\" id=\"tecnicaEs\" name=\"text\" class=\"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5\"  value=\"\" /> </div> <div> <label for=\"tecnicaEn\" class=\"tagEn block mb-2 text-sm font-medium text-gray-900\">Tecnica en Inglés</label> <input type=\"text\" id=\"tecnicaEn\" value=\"\" class=\"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5\"/> </div> <button onclick=\"setNewTecnica()\" class=\"set-category w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center\">Aceptar</button> </div> </div>";
            modalElement.innerHTML = modal;
            writeModal(modalElement);
        } else if(action == "new_option_serie"){
            let modal = "<div class=\"flex items-center justify-between p-4 md:p-5 border-b rounded-t\"> <h3 class=\"text-l font-semibold text-gray-900\">Nueva Serie</h3> <button type=\"button\" class=\"close-modal end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center\" onclick=\"closeModal()\"> <svg class=\"w-3 h-3\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 14 14\"> <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6\"/> </svg> <span class=\"sr-only\">Close modal</span> </button> </div> <div class=\"p-4 md:p-5\"> <div class=\"space-y-4\" action=\"#\"> <div> <label for=\"tagEs\" class=\"tagEs block mb-2 text-sm font-medium text-gray-900\">Serie en Español</label> <input type=\"text\" id=\"serieEs\" name=\"text\" class=\"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5\"  value=\"\" /> </div> <div> <label for=\"tagEn\" class=\"tagEn block mb-2 text-sm font-medium text-gray-900\">Serie en Inglés</label> <input type=\"text\" id=\"serieEn\" value=\"\" class=\"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5\"/> </div> <button onclick=\"setNewSerie()\" class=\"set-category w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center\">Aceptar</button> </div> </div>";
            modalElement.innerHTML = modal;
            writeModal(modalElement);
        } else {
            let tags = JSON.parse(localStorage.getItem('tags'));
            let tagId = tags[action];
            console.log(tags);
            console.log(tagId.es);
            console.log(tagId.en);
            let modal = "<div class=\"flex items-center justify-between p-4 md:p-5 border-b rounded-t\"> <h3 class=\"text-l font-semibold text-gray-900\">" + titleModal() + "</h3> <button type=\"button\" class=\"close-modal end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center\" onclick=\"closeModal()\"> <svg class=\"w-3 h-3\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 14 14\"> <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6\"/> </svg> <span class=\"sr-only\">Close modal</span> </button> </div> <div class=\"p-4 md:p-5\"> <div class=\"space-y-4\" action=\"#\"> <div> <label for=\"tagEs\" class=\"tagEs block mb-2 text-sm font-medium text-gray-900\">Categoría en Español</label> <input type=\"text\" id=\"tagEs\" name=\"text\" class=\"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5\"  value=\""+ tagId.es +"\" /> </div> <div> <label for=\"tagEn\" class=\"tagEn block mb-2 text-sm font-medium text-gray-900\">Categoría en Inglés</label> <input type=\"text\" id=\"tagEn\" value=\""+ tagId.en +"\" class=\"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5\"/> </div> <button onclick=\"stateCategory(\'" + action + "\')\" class=\"set-category w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center\">Aceptar</button> </div> </div>";
            modalElement.innerHTML = modal;
            writeModal(modalElement);
        }
}
function writeModal(modalElement){document.body.appendChild(modalElement)}
function closeModal() {
    let modal = document.getElementById('modal');
    let body = document.body;
    body.removeChild(modal);
}
function stateCategory(action) {
    let tags = JSON.parse(localStorage.getItem('tags'));
    console.log(action);
    let tagEs = document.getElementById('tagEs'),
          tagEn = document.getElementById('tagEn');
          tagEs = tagEs.value;
          tagEn = tagEn.value;
    if(action == "new_tag"){
        let nameProperty = minusculasGuionesAcentos(tagEs);
        Object.assign(tags, {
            [nameProperty]: {
            es: tagEs,
            en: tagEn
            }
        });
        delete tags.cero; // Elimina tag sobrante 'cero'
        let tagsCache = JSON.stringify(tags);
        localStorage.setItem('tags', tagsCache);
        writeTags(tags, action);
        closeModal();
    } else { // edit
        let tags = JSON.parse(localStorage.getItem('tags'));
        Object.assign(tags, {
            [action]: {
            es: tagEs,
            en: tagEn
            }
        });
        let tagsCache = JSON.stringify(tags);
        localStorage.setItem('tags', tagsCache);
        tags = JSON.parse(localStorage.getItem('tags'));
        writeTags(tags, action);
        closeModal();
    }


}

function writeTags(tags){
    let tagsContent = document.getElementById("tagsContent");
    tagsContent.innerHTML = "";
    
  // delete tags['cero'];
    if(tags !== null){
        for (let property in tags) {
            if (tags.hasOwnProperty(property) && property !== "cero") { 
                let tagContent = document.createElement("span");
                let tagElement = document.createElement("a");
                let tagClickEvent = "openModal('" + property + "')"; // Contenido del onclick
                tagElement.setAttribute("onclick", tagClickEvent); // Seteado de atributo onclick
                let tagClass = tagContent.classList;
                tagClass.add("tag", "inline-flex", "items-center", "px-2", "py-1", "me-2", "mb-2","text-sm", "font-medium", "text-blue-800", "bg-blue-100", "rounded"); // Clases
                let tagText = document.createTextNode(tags[property].es);
                tagElement.appendChild(tagText); // Texto del tag
                //console.log(typeof property);
                let removeBtn = "<button type=\"button\" onclick=\"remove('"+ property +"')\" class=\"inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900\" data-dismiss-target=\"#badge-dismiss-default\" aria-label=\"Remove\"><svg class=\"w-2 h-2\" aria-hidden=\"true\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" fill=\"none\" viewBox=\"0 0 14 14\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6\"/></svg> <span class=\"sr-only\">Remove</span> </button>"; // Boton de eliminar
                tagContent.appendChild(tagElement);
                tagContent.innerHTML += removeBtn;
                tagsContent.appendChild(tagContent);
            }
        }
    }

}
function remove(property) {
    let tags = JSON.parse(localStorage.getItem('tags'));
    delete tags[property];
    tags = JSON.stringify(tags);
    localStorage.setItem('tags', tags);
    let tagsUpdated = localStorage.getItem('tags');
    tagsUpdated = JSON.parse(tagsUpdated);
    writeTags(tagsUpdated);
}

function capitalizar(str){return str.replace(/\w\S*/g, function(txt){ return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});}
function minusculasGuionesAcentos(str) {const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u','Á': 'a', 'É': 'e', 'Í': 'i', 'Ó': 'o', 'Ú': 'u','ñ': 'n', 'Ñ': 'n'};str = str.replace(/[áéíóúÁÉÍÓÚñÑ]/g, match => acentos[match]);return str.replace(/\s+/g, '_').toLowerCase();}

async function writeImg(imgName) {
    $contentInput.innerHTML = "";
    let img = document.createElement("img");
    img.setAttribute("id", "img");
    img.setAttribute("src", "../../../uploads/" + imgName);
    img.setAttribute("class", "max-w-40 w-auto h-40 mr-3 w-40");
    return img;
}
async function setValues(data) {
    $contentInput.innerHTML = loading;
    let results = data[0];
    console.log(results.vendido);
    $titulo.value = results.titulo;
    $medidas.value = results.medidas;
    $anio.value = results.anio;
    if(results.vendido === "1"){vendido.checked = true; }else {vendido.checked = false;};
    
    //tecnica.value = minusculasGuionesAcentos(results.categoria);
    
    let getTecnicas = {action: "getTecnicas", languague: "es"}
    await fillSelect(getTecnicas, tecnica, results);
    let getSeries = {action: "getSeries", languague: "es"}
    await fillSelect(getSeries, series, results);

    
    //tecnica.options[tecnica.selectedIndex].text = results.categoria;
    let optionsTecnicas = tecnica.options;
    console.log(optionsTecnicas.length);
    for (let i = 0; i < optionsTecnicas.length; i++) {
        let option = optionsTecnicas[i];
        if(results.tecnica == optionsTecnicas[i].text){
            optionsTecnicas[i].setAttribute("selected", "selected");
        }
    }
    let optionsSeries = series.options
    console.log(optionsSeries.length);
    for (let i = 0; i < optionsSeries.length; i++) {
        let option = optionsSeries[i];
        if(results.serie == optionsSeries[i].text){
            optionsSeries[i].setAttribute("selected", "selected");
        }
    }

    const img = await writeImg(results.imagen);
    $contentInput.appendChild(img);
    /*
    localStorage.setItem("img", results.imagen);
    console.log(localStorage.getItem("img"));*/
    let tagsObject = {};
    Object.assign(tagsObject, results.etiquetas);
    let tagsinit = JSON.stringify(tagsObject);
    localStorage.setItem('tags', tagsinit);
    console.log(localStorage.getItem("tags"));
    writeTags(tagsObject);
}
async function get(datos){
        let datosJSON = JSON.stringify(datos);
        try {
            const response = await fetch("../../../api/get.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: datosJSON
        })
        if (!response.ok) {
            throw new Error('Error en la solicitud');
          }
          const result = await response.json();
          return result;
        } catch (error) {
          console.error('Hubo un problema con la solicitud fetch:', error);
        }
}


async function fillSelect(datos, parent, results = null) {
    try {
        let response = await get(datos);
        for(let i = 0; i < response.length; i++) {
            let option = document.createElement("option");
            option.setAttribute("value", response[i].id);
            if(results !== null && response[i].es == results.tecnica){option.setAttribute("selected", "selected")}
            option.textContent = response[i].es;
            parent.appendChild(option);
        }
        let optionNew = document.createElement("option");
        optionNew.setAttribute("value", "new");
        optionNew.textContent = "Nueva...";
        parent.appendChild(optionNew);
    } catch (error) {
        console.error('Hubo un problema al obtener los resultados:', error);
    }
}

function setSelected(){

}
series.addEventListener("change", () => {
    if(series.options[series.selectedIndex].value == "new") {
        openModal("new_option_serie");
    }
});
tecnica.addEventListener("change", () => {
    if(tecnica.options[tecnica.selectedIndex].value == "new") {
        openModal("new_option_tecnica");
    }
});

function setNewTecnica(){
    let tecnicaEs = document.getElementById("tecnicaEs");
    let tecnicaEn = document.getElementById("tecnicaEn");
    let tecnicaEsValue = tecnicaEs.value;
    let tecnicaEnValue = tecnicaEn.value;

    const datos = {
        action: "newTecnica",
        languague: "es",
        param: {
            es: tecnicaEsValue,
            en: tecnicaEnValue
        }
    }
    put(datos);
    while(tecnica.firstChild){
        tecnica.removeChild(tecnica.firstChild);
    }
    let getTecnicas = {action: "getTecnicas", languague: "es"}
    fillSelect(getTecnicas, tecnica);
    closeModal();

}
function setNewSerie(){
    let serieEs = document.getElementById("serieEs");
    let serieEn = document.getElementById("serieEn");
    let serieEsValue = serieEs.value;
    let serieEnValue = serieEn.value;

    const datos = {
        action: "newSerie",
        languague: "es",
        param: {
            es: serieEsValue,
            en: serieEnValue
        }
    }
    put(datos);
    while(series.firstChild){
        series.removeChild(series.firstChild);
    }
    let getSeries = {action: "getSeries", languague: "es"}
    fillSelect(getSeries, series);
    closeModal();
}
async function put(datos){
    let datosJSON = JSON.stringify(datos);
    fetch("../../app.php", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: datosJSON,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Obtén la respuesta como JSON
    })
    .then(data => {
        console.log(data); // Imprime la respuesta en formato JSON
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}