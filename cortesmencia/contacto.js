// -- Formulario de Contacto: --
const sendMailBtn = document.getElementById("sendMail");

sendMailBtn.addEventListener("click", () => {
    sendMail("contacto");
})
function sendMail(location){
   // const location = window.location.href;
    const nameInput = document.getElementById("name"),
          emailInput = document.getElementById("mailAdress"),
          messageTextarea = document.getElementById("message"),
          msg = document.getElementById("msg");

    let name = nameInput.value;
    let email = emailInput.value;
    let message = messageTextarea.value;
    
    const datos = {
        location: location,
        data_message: {
            name: name,
            email: email,
            message: message
        }
    };
    let datosJSON = JSON.stringify(datos);
    console.log(datosJSON);
    fetch('../../api/correo.php', {
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
        msg.textContent = JSON.stringify(data);
        nameInput.value = "";
        emailInput.value = "";
        messageTextarea.value = "";
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}