const content = document.getElementById("content-int");
//let lang = "es";


const valores = window.location.search;

//Creamos la instancia
const urlParams = new URLSearchParams(valores);

//Accedemos a los valores
var serieId = urlParams.get('serie');

console.log("serie:", serieId);



getSeries(serieId);

async function getSeries(serieId) {
    try {
        const queryBySerie = {
            action: "bySerie",
            languague: lang,
            param: {
                tecnica: null,
                serie: serieId
            }
        };
        // Los Cuadros por serie, Aqui se crea un slider por cada Iteracion
        let cuadrosBySerie = await get(queryBySerie);
        if(cuadrosBySerie.length > 0) {
            console.log(cuadrosBySerie[0].serie);
            createCarousel(cuadrosBySerie);
        }
        let script = document.createElement("script");
        script.setAttribute("src", "carousel.js");
        document.body.appendChild(script);
    } catch (error) {
        console.error('Hubo un problema al obtener los resultados:', error);
    }
}


function createCarousel(data) {
    // 'data' es el listado de cuadros por serie
    let carousel = document.createElement("div"),
        titleSerie = document.createElement("span"),
        thumbWrapper = document.createElement("div"), // Contenedor Mayor miniaturas
        carouselThumb = document.createElement("div"), // Contenedor Menor miniaturas
        carouselImgs = document.createElement("div"),  // Contenedor Imagenes
        carouselDesc = document.createElement("div"), // Contenedor Descripciones
        prevBtn = document.createElement("button"),
        nextBtn = document.createElement("button"); 

    carousel.classList.add("carousel");
    titleSerie.textContent = data[0].serie;
    thumbWrapper.classList.add("carousel-thumbnails-wrapper");
    carouselThumb.classList.add("carousel-thumbnails");
    carouselImgs.classList.add("carousel-images");
    carouselDesc.classList.add("carousel-descriptions");
    prevBtn.classList.add("carousel-control", "prev");
    nextBtn.classList.add("carousel-control", "next");

    prevBtn.innerHTML = "<svg class=\"w-6 h-6 text-gray-800 dark:text-white\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"> <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m15 19-7-7 7-7\"/> </svg>";
    nextBtn.innerHTML = "<svg class=\"w-6 h-6 text-gray-800 dark:text-white\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"> <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m9 5 7 7-7 7\"/> </svg>";

    const record = Object.values(data);
    record.forEach(value => {
      writeImg(value, carouselThumb);
      writeImg(value, carouselImgs);
      writeDesc(value, carouselDesc);
    });
    carousel.appendChild(titleSerie);

    thumbWrapper.appendChild(carouselThumb);
    carouselThumb.firstElementChild.classList.add("active-thumbnail");


    carouselImgs.firstElementChild.classList.add("active");
    carousel.appendChild(carouselImgs);

    carouselDesc.firstElementChild.classList.add("active");

    carousel.appendChild(carouselDesc);
    carousel.appendChild(thumbWrapper);

    carousel.appendChild(prevBtn);
    carousel.appendChild(nextBtn);
    
    content.appendChild(carousel);
}


/*
async function getSeries() {
    let datos = {action: "getSeries", languague: lang}
    try {
        let response = await get(datos);//Listado de Series
        console.log(response);
        // NOTA: Los cuadros sin series se pueden trabajar accediendo a 'response[0]'.
        for(let i = 1; i < response.length; i++) {
            const queryBySerie = {
                action: "bySerie",
                languague: lang,
                param: {
                    tecnica: null,
                    serie: response[i].id
                }
            };
            // Los Cuadros por serie, Aqui se crea un slider por cada Iteracion
            let cuadrosBySerie = await get(queryBySerie);
            let nameSerie = ""
            if(cuadrosBySerie.length > 0) {
                
                if(lang == "es"){
                    nameSerie = response[i].es;
                } else {
                    nameSerie = response[i].en;
                }
                console.log(nameSerie);
                createCarousel(cuadrosBySerie, nameSerie);
            }
        }
        let script = document.createElement("script");
        script.setAttribute("src", "carousel.js");
        document.body.appendChild(script);
    } catch (error) {
        console.error('Hubo un problema al obtener los resultados:', error);
    }
}

function createCarousel(data, nameSerie) {
    // 'data' es el listado de cuadros por serie
    let carousel = document.createElement("div"),
        titleSerie = document.createElement("span"),
        thumbWrapper = document.createElement("div"), // Contenedor Mayor miniaturas
        carouselThumb = document.createElement("div"), // Contenedor Menor miniaturas
        carouselImgs = document.createElement("div"),  // Contenedor Imagenes
        carouselDesc = document.createElement("div"), // Contenedor Descripciones
        prevBtn = document.createElement("button"),
        nextBtn = document.createElement("button"); 

    carousel.classList.add("carousel");
    titleSerie.textContent = nameSerie;
    thumbWrapper.classList.add("carousel-thumbnails-wrapper");
    carouselThumb.classList.add("carousel-thumbnails");
    carouselImgs.classList.add("carousel-images");
    carouselDesc.classList.add("carousel-descriptions");
    prevBtn.classList.add("carousel-control", "prev");
    nextBtn.classList.add("carousel-control", "next");

    prevBtn.innerHTML = "<svg class=\"w-6 h-6 text-gray-800 dark:text-white\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"> <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m15 19-7-7 7-7\"/> </svg>";
    nextBtn.innerHTML = "<svg class=\"w-6 h-6 text-gray-800 dark:text-white\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"> <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m9 5 7 7-7 7\"/> </svg>";

    const record = Object.values(data);
    record.forEach(value => {
      writeImg(value, carouselThumb);
      writeImg(value, carouselImgs);
      writeDesc(value, carouselDesc);
    });
    carousel.appendChild(titleSerie);

    thumbWrapper.appendChild(carouselThumb);
    carouselThumb.firstElementChild.classList.add("active-thumbnail");


    carouselImgs.firstElementChild.classList.add("active");
    carousel.appendChild(carouselImgs);

    carouselDesc.firstElementChild.classList.add("active");

    carousel.appendChild(thumbWrapper);
    carousel.appendChild(carouselDesc);

   // carousel.appendChild(prevBtn);
    //carousel.appendChild(nextBtn);
    
    content.appendChild(carousel);
}
*/
// Escribe el carrousel
function writeDesc(data, parent) {
    //OBRA/TECNICA/MEDIDAS/AÑO – Si es vendido aparece, sino NO.
    let div = document.createElement("div");
    let vendido = "";
    if(data.vendido == "1") {vendido = "<span>VENDIDO</span>"}
    div.innerHTML ="<p><strong>" + data.titulo + "</strong></p><p>" + data.tecnica + "</p><p>" + data.medidas + "</p><p>" + data.anio + "</p><p>" + vendido + "</p>";
    parent.appendChild(div);
}


function writeImg(data, parent) {
    let img = document.createElement("img");
    let urlImg = "/uploads/" + data.imagen;
    img.setAttribute("src", urlImg);
    parent.appendChild(img);
}


async function get(datos){
    let datosJSON = JSON.stringify(datos);
    try {
        const response = await fetch("../api/get.php", {
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
