async function loadProfile(lang) {
    let datos = {
        action: "readProfile",
        lang: lang
    }
    let response = await get(datos);
    
    let content = document.getElementById("content-int");
    let msg = document.getElementById("msg");
    msg.style.display = "none";
    content.innerHTML = response;
    
}

async function loadThoughts(lang) {
    let datos = {
        action: "readThoughts",
        lang: lang
    }
    let response = await get(datos);
    
    let content = document.getElementById("content-int");
    let msg = document.getElementById("msg");
    msg.style.display = "none";
    content.innerHTML = response;
    
}
async function loadReviews(lang) {
    let datos = {
        action: "readReviews",
        lang: lang
    }
    let response = await get(datos);
    
    let content = document.getElementById("content-int");
    let msg = document.getElementById("msg");
    msg.style.display = "none";
    content.innerHTML = response;
    
}
async function loadExhibitions(lang) {
    let datos = {
        action: "readExhibitions",
        lang: lang
    }
    let response = await get(datos);
    
    let content = document.getElementById("content-int");
    let msg = document.getElementById("msg");
    msg.style.display = "none";
    content.innerHTML = response;
    
}
async function loadStudio(lang) {
    let datos = {
        action: "readStudio",
        lang: lang
    }
    let response = await get(datos);
    
    let content = document.getElementById("content-int");
    let msg = document.getElementById("msg");
    msg.style.display = "none";
    content.innerHTML = response;
    
}

async function loadResums(lang) {
    const resumeProfile = document.getElementById("resumeProfile"),
          resumeThoughts = document.getElementById("resumeThoughts"),
          resumeReviews = document.getElementById("resumeReviews");
    
    let datos = {
        action: "getResums",
        lang: lang
    }
    
    let response = await get(datos);
    
    resumeProfile.innerHTML = response.profile;
    resumeThoughts.innerHTML = response.thoughts
    resumeReviews.innerHTML = response.reviews;
    
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