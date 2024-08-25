localStorage.clear();
const $btnLinkNewCuadro = document.querySelector("#linkNewCuadro"),
      $linkPrueba = document.querySelector("#linkPrueba"),
      $cuadrosResults = document.querySelector("#cuadrosResults"),
      tecnicas = document.getElementById("tecnica"),
      series = document.getElementById("series"),
      mainDashboard = document.getElementById("mainDashboard"),
      editLinkCategorias = document.getElementById("editCategoriasLink"),
      saveNewCategory = document.getElementById("saveNewCategory");
const loading = "<div class=\"w-full\" role=\"status\"> <svg aria-hidden=\"true\" class=\"w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600\" viewBox=\"0 0 100 101\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z\" fill=\"currentColor\"/><path d=\"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z\" fill=\"currentFill\"/></svg> <span class=\"sr-only\">Loading...</span> </div>";

let languague = "es";
    let getTecnicas = {action: "getTecnicas", languague: "es"}
    fillSelect(getTecnicas, tecnicas);
    let getSeries = {action: "getSeries", languague: "es"}
    fillSelect(getSeries, series);

on();

$btnLinkNewCuadro.addEventListener("click", () =>{
    window.location.href = "https://cortesmencia.art/administracion/cuadros/editar-cuadro";
});
editLinkCategorias.addEventListener("click", () =>{
    writeDashboardCategorias();
});

function on() {
    $cuadrosResults.innerHTML = loading;

    const datos = {
        action: "all",
        languague: "es",
        param: {
            id: null
        }
   };
    let datosJSON = JSON.stringify(datos);
    let url = '../../../api/get.php';
    fetch(url, {
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
        readCuadros(data); 
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
};

function readCuadros(data) {
    const record = Object.values(data);
    $cuadrosResults.innerHTML = "";
    record.forEach(value => {
      writeCuadro(value);
    });
}
function writeCuadro(record) {
    console.log(record.vendido);
    let row = document.createElement("tr");
    let rowClass = row.classList;
    let vendidoElement = "";
    let serie ="";

    if(record.vendido === "1"){vendidoElement = "Vendido"}else{vendidoElement = "Disponible"};
    if(record.serie !== null){serie = record.serie};

    rowClass.add("border-b", "hover:bg-gray-100");
    
    let rowFirstContent = "<td class=\"flex flex-col px-4 py-2 font-medium text-gray-900 whitespace-nowrap\"><span class=\"title-image\" name=\"" + record.id + "\">" + record.titulo + "</span><img src=\"../../uploads/" + record.imagen + "\" alt=\"\" class=\"max-w-40 w-auto h-40 mr-3\"></td> <td class=\"px-4 py-2\"> <span class=\"bg-primary-100 text-primary-800 font-medium px-2 py-0.5 rounded \">"+ record.tecnica +"</span></td> <td class=\"px-4 py-2 font-medium text-gray-900 whitespace-nowrap\">" + record.medidas +"</td> <td class=\"px-4 py-2 font-medium text-gray-900 whitespace-nowrap\">" + record.anio + "</td> <td class=\"px-4 py-2 font-medium text-gray-900 whitespace-nowrap \">" + vendidoElement + "</td><td class=\"px-4 py-2 font-medium text-gray-900 whitespace-nowrap \">" + serie + "</td>";

    let acciones = "<!--Acciones:--> <td class=\"flex flex-col px-4 py-2 font-medium text-gray-900 whitespace-nowrap\"> <br><br><button type=\"button\" onclick=\"editar(" + record.id + ")\" class=\"text-gray-900 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2\"> <svg class=\"w-6 h-6\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"> <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z\" /> </svg> Editar </button> <button type=\"button\" onclick=\"eliminar("+record.id+")\" class=\"text-red-600 hover:text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2\"> <svg class=\"w-6 h-6 text-red\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"> <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z\" /> </svg> Eliminar </button> </td>";
    row.innerHTML = rowFirstContent;
    row.innerHTML += acciones;

    $cuadrosResults.appendChild(row);
}

function readEtiquetas(obj, parentElement) {
    const div = document.createElement('div');
    
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const span = document.createElement('span');
            const spanClass = span.classList;
            spanClass.add("tag", "inline-flex", "items-center", "m-1", "text-sm", "font-medium", "text-blue-800", "bg-blue-100", "rounded");

            if (typeof obj[key] === 'object' && obj[key] !== null) {
                //span.textContent = `${key}`;
                readEtiquetas(obj[key], span); //Activar si buscamos acceder al idioma de la etiqueta
            } else if(key === "es") {
                span.textContent = `${obj[key]}`;
            } else {
                //span.textContent = `${obj[key]}`;
            }

            div.appendChild(span);
        }
    }

    parentElement.appendChild(div);
}

function editar(id) {
    localStorage.clear();
    localStorage.setItem("id", id);
    window.location.href = "https://cortesmencia.art/administracion/cuadros/editar-cuadro/";
}

async function borrar(id) {
    const datos = {
        action: "delete",
        languague: "es",
        param: {
            id: id
        }
    };
    let datosJSON = JSON.stringify(datos);
    
    fetch("../app.php", {
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
    closeModal();
    on();
}

async function eliminar(idInMemory) {
    let titleModal = function(){if(action == "new_tag"){return "Nueva Etiqueta";}else{ tagName = capitalizar(action); return "Editar Etiqueta: " + tagName;}}
    let modalElement = document.createElement("div")
    let modalElementClass = modalElement.classList;
    modalElement.setAttribute("id", "modal")
    modalElement.setAttribute("tabindex", "-1")
    modalElementClass.add("overflow-y-auto", "overflow-x-hidden", "fixed", "top-1/3", "right-0", "left-1/3", "z-50", "justify-center", "items-center", "w-full", "max-h-full");
    
    const data = await load(idInMemory);
    
    let results = data[0];

    let modal = "<div class=\"relative p-4 w-full max-w-md max-h-full\"> <div class=\"relative bg-white rounded-lg shadow\"> <button type=\"button\"  onclick=\"closeModal()\" class=\"absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center\" data-modal-hide=\"popup-modal\"> <svg class=\"w-3 h-3\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 14 14\"> <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6\"/> </svg> <span class=\"sr-only\">Close modal</span> </button> <div class=\"p-4 md:p-5 text-center\"> <svg class=\"mx-auto mb-4 text-gray-400 w-12 h-12\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 20 20\"> <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z\"/> </svg> <h3 class=\"mb-5 text-lg font-medium text-gray-900\">¿Estás segura que deseas eliminar el cuadro \"" + results.titulo + "\"?</h3> <button data-modal-hide=\"popup-modal\" onclick=\"borrar(" + results.id + ")\" type=\"button\" class=\"text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center\"> Si, Elimiar </button> <button data-modal-hide=\"popup-modal\" type=\"button\" onclick=\"closeModal()\" class=\"py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100\">No</button> </div> </div> </div>";
    modalElement.innerHTML = modal;
    writeModal(modalElement);
}
function writeModal(modalElement){document.body.appendChild(modalElement)}

function load(idInMemory) {
    return new Promise((resolve) => {
        idInMemory = String(idInMemory);
        
        const datos = {
            action: "searchById",
            languague: "es",
            param: {
                id: idInMemory
            }
    };
        let datosJSON = JSON.stringify(datos);
        
        fetch('../app.php', {
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
            resolve(data); 
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
});
};
function closeModal() {
    let modal = document.getElementById('modal');
    let body = document.body;
    body.removeChild(modal);
}

tecnicas.addEventListener("change", async () => {
    $cuadrosResults.innerHTML = loading;
    let tecnicaValue = tecnicas.options[tecnicas.selectedIndex].value;
    let actionValue = "byTecnica";
    if(tecnicaValue == 0) {
       on();
       return;
    }
    const datos = {
        action: actionValue,
        languague: "es",
        param: {
            tecnica: tecnicaValue,
            serie: null
        }
    };
    let response = await get(datos);
    readCuadros(response);
});
 series.addEventListener("change", async () => {
    $cuadrosResults.innerHTML = loading;
     let serieValue = series.options[series.selectedIndex].value;
     let actionValue = "bySerie";
     if(serieValue == 0) {
        on();
        return;
     }
     const datos = {
         action: actionValue,
         languague: "es",
         param: {
             tecnica: null,
             serie: serieValue
         }
     };
     let response = await get(datos);
     readCuadros(response);
});

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
async function fillSelect(datos, parent) {
    try {
        let response = await get(datos);
        console.log(response);
        
        for(let i = 0; i < response.length; i++) {
            let child = document.createElement('option');
            child.setAttribute("value", response[i].id);
            child.textContent = response[i].es;
            parent.appendChild(child);
        }
    } catch (error) {
        console.error('Hubo un problema al obtener los resultados:', error);
    }
}

async function writeDashboardCategorias() {
    let getSeries = {action: "getSeries", languague: "es"}
    mainDashboard.innerHTML = loading;
    try {
        let response = await get(getSeries);
        console.log(response);
        let categoryContent = document.createElement('div');
        categoryContent.classList.add("category-content","grid", "grid-cols-4", "gap-x-3", "gap-y-3", "w-full", "content-center", "justify-center", "pt-6", "mx-auto");
        mainDashboard.innerHTML = "";
        
        let rowNew = document.createElement('div');
        rowNew.classList.add("row", "max-w-md", "min-w-64", "min-h-80", "flex-col", "p-4", "m-3", "transition", "shadow-md", "space-y-2", "flex", "content-center", "justify-center", "opacity-75", "hover:opacity-100", "rounded-xl", "outline-blue-100", "bg-white", "outline-dashed");
        rowNew.setAttribute("id", "formNewSerie")
        rowNew.setAttribute("onclick", "newSerieForm()")

        let newIconContent = document.createElement('div');
        newIconContent.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\"><path class=\"fill-indigo-800\" fill-rule=\"evenodd\" d=\"M12 4c.6 0 1 .4 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5c0-.6.4-1 1-1Z\" clip-rule=\"evenodd\"/></svg>";
        newIconContent.classList.add("w-full");
        let textNew = document.createElement('label');
        textNew.classList.add("w-full", "block", "text-center", "text-indigo-800", "font-semibold");
        textNew.textContent = "Nueva Serie";

        rowNew.appendChild(newIconContent);
        rowNew.appendChild(textNew);
        categoryContent.appendChild(rowNew);

        for(let i = 1; i < response.length; i++) {
            let row = document.createElement('div');
/*
            let idContent = document.createElement('div');
            let idElement = document.createElement('label');
            idElement.textContent = "Id: " + response[i].id;
            idContent.classList.add("cell");
            idContent.appendChild(idElement);
*/
            let nameEsContent = document.createElement('div');
            nameEsContent.classList.add("cell");
            let nameEsElement = document.createElement('label');
            nameEsElement.classList.add("block", "mb-2", "text-sm", "font-medium", "text-gray-900");
            nameEsElement.textContent = "Nombre en Español:";
            let inputEs = document.createElement("input");
            inputEs.classList.add("bg-gray-50", "border", "border-gray-300", "text-gray-900", "text-sm", "rounded-lg", "focus:ring-blue-500", "focus:border-blue-500", "block", "w-full", "p-2.5", "rounded")
            inputEs.setAttribute("type", "text");
            let idInputEs = "valueEsOf" + response[i].id;
            inputEs.setAttribute("id", idInputEs);
            inputEs.setAttribute("value", response[i].es);
            nameEsContent.appendChild(nameEsElement)
            nameEsContent.appendChild(inputEs);

            let nameEnContent = document.createElement('div');
            nameEnContent.classList.add("cell");
            let nameEnElement = document.createElement('label');
            nameEnElement.classList.add("block", "mb-2", "text-sm", "font-medium", "text-gray-900");
            nameEnElement.textContent = "Nombre en Ingles:";
            let inputEn = document.createElement("input");
            inputEn.classList.add("bg-gray-50", "border", "border-gray-300", "text-gray-900", "text-sm", "rounded-lg", "focus:ring-blue-500", "focus:border-blue-500", "block", "w-full", "p-2.5")
            inputEn.setAttribute("type", "text");
            let idInputEn = "valueEnOf" + response[i].id;
            inputEn.setAttribute("id", idInputEn);
            inputEn.setAttribute("value", response[i].en);
            nameEnContent.appendChild(nameEnElement)
            nameEnContent.appendChild(inputEn);

            let btnsContent = document.createElement('div');
            btnsContent.classList.add("btn-content", "flex", "content-center", "justify-center")

            let btnSave = document.createElement('button');
            btnSave.classList.add("text-gray-900", "w-full", "justify-center", "hover:bg-blue-700", "hover:text-white", "focus:ring-4", "focus:outline-none", "focus:ring-blue-300", "font-medium", "rounded-lg", "text-sm", "px-5", "py-2.5", "text-center", "inline-flex", "items-center", "me-2")
            let onclickSaveValues = "saveCategory(" + response[i].id + "," + idInputEs +"," + idInputEn + ")";
            btnSave.setAttribute("onclick", onclickSaveValues);
            btnSave.textContent = "Guardar";

            let btnDelete = document.createElement('button');
            btnDelete.classList.add("deleteBtn", "text-red-600", "hover:text-white", "hover:bg-red-600", "focus:ring-4", "focus:outline-none", "focus:ring-blue-300", "font-medium", "rounded-lg", "text-sm", "px-5", "py-2.5", "text-center", "inline-flex", "items-center", "me-2");
            let onclickDeleteValues = "deleteCategory(" + response[i].id + ")";
            btnDelete.setAttribute("onclick", onclickDeleteValues);
            btnDelete.innerHTML = "<svg class=\"w-6 h-6 text-red\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"> <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z\" /> </svg>";

            btnsContent.appendChild(btnSave);
            btnsContent.appendChild(btnDelete);

            //row.appendChild(idContent);
            row.appendChild(nameEsContent);
            row.appendChild(nameEnContent);
            row.appendChild(btnsContent);
            row.classList.add("row", "max-w-md", "min-w-64", "min-h-80", "flex", "flex-col", "p-4", "m-3", "transition", "shadow-md", "space-y-2", "content-center", "justify-center", "hover:shadow-blue-500/50", "rounded-xl", "border-slate-400", "bg-sky-50");
            categoryContent.appendChild(row);
            mainDashboard.appendChild(categoryContent);
        }

    } catch (error) {
        console.error('Hubo un problema al obtener los resultados:', error);
    }
}

function newSerieForm() {

    let formNewSerie = document.getElementById("formNewSerie");
    formNewSerie.removeAttribute("onclick");
    formNewSerie.classList.remove("opacity-75");
    formNewSerie.innerHTML = "";

    let nameEsContent = document.createElement('div');
    nameEsContent.classList.add("cell");
    
    let titleContent = document.createElement('div');
    let titleElement = document.createElement('label');
    titleElement.textContent = "Nueva Serie:";
    titleContent.classList.add("cell", "text-lg", "font-semibold");
    titleContent.appendChild(titleElement);

    let nameEsElement = document.createElement('label');
    nameEsElement.classList.add("block", "mb-2", "text-sm", "font-medium", "text-gray-900");
    nameEsElement.textContent = "Nombre en Español:";
    let inputEs = document.createElement("input");
    inputEs.classList.add("bg-gray-50", "border", "border-gray-300", "text-gray-900", "text-sm", "rounded-lg", "focus:ring-blue-500", "focus:border-blue-500", "block", "w-full", "p-2.5", "rounded")
    inputEs.setAttribute("type", "text");
    inputEs.setAttribute("id", "newInputEs");
    nameEsContent.appendChild(nameEsElement)
    nameEsContent.appendChild(inputEs);

    let nameEnContent = document.createElement('div');
    nameEnContent.classList.add("cell");
    let nameEnElement = document.createElement('label');
    nameEnElement.classList.add("block", "mb-2", "text-sm", "font-medium", "text-gray-900");
    nameEnElement.textContent = "Nombre en Ingles:";
    let inputEn = document.createElement("input");
    inputEn.classList.add("bg-gray-50", "border", "border-gray-300", "text-gray-900", "text-sm", "rounded-lg", "focus:ring-blue-500", "focus:border-blue-500", "block", "w-full", "p-2.5")
    inputEn.setAttribute("type", "text");
    inputEn.setAttribute("id", "newInputEn");
    nameEnContent.appendChild(nameEnElement);
    nameEnContent.appendChild(inputEn);

    let btnsContent = document.createElement('div');
    btnsContent.classList.add("btn-content", "flex", "content-center", "justify-center")

    let btnSave = document.createElement('button');
    btnSave.classList.add("bg-blue-600", "w-full", "justify-center", "hover:bg-blue-700", "text-white", "focus:ring-4", "focus:outline-none", "focus:ring-blue-300", "font-medium", "rounded-lg", "text-sm", "px-5", "py-2.5", "text-center", "inline-flex", "items-center", "me-2")
    let clickFunction = "setNewSerie()";
    btnSave.setAttribute("onclick", clickFunction);
    btnSave.setAttribute("id", "saveNewCategory");
    btnSave.textContent = "Guardar";
    btnsContent.appendChild(btnSave);

    formNewSerie.appendChild(titleContent);
    formNewSerie.appendChild(nameEsContent);
    formNewSerie.appendChild(nameEnContent);
    formNewSerie.appendChild(btnsContent);

}

async function saveCategory(idSerie, idInputEs, idInputEn){
    mainDashboard.innerHTML = loading;
    console.log(idInputEn.value, idInputEs.value);

    const datos = {
        action: "updateSerie",
        languague: "es",
        param: {
            id: idSerie,
            es: idInputEs.value,
            en: idInputEn.value
        }
    }
    await put(datos);
    
    writeDashboardCategorias();
    //setTimeout(writeDashboardCategorias, 3000);
    
}
async function deleteCategory(idSerie){
    mainDashboard.innerHTML = loading;

    const datos = {
        action: "deleteSerie",
        languague: "es",
        param: {
            id: idSerie
        }
    }
    await put(datos);
    
    writeDashboardCategorias();
    //setTimeout(writeDashboardCategorias, 3000);
    
}

async function setNewSerie(){
    let newInputEs = document.getElementById("newInputEs");
    let newInputEn = document.getElementById("newInputEn");
    let serieEsValue = newInputEs.value;
    let serieEnValue = newInputEn.value;
    console.log(serieEsValue, serieEnValue);

    const datos = {
        action: "newSerie",
        languague: "es",
        param: {
            es: serieEsValue,
            en: serieEnValue
        }
    }
    await put(datos);
    writeDashboardCategorias();
    //setTimeout(writeDashboardCategorias, 3000);
}


async function put(datos){
    let datosJSON = JSON.stringify(datos);
    fetch("../app.php", {
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