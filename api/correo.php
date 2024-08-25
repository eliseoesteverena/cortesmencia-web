<?php

header('Content-Type: application/json');


// Obtén el contenido JSON de la solicitud
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Asegúrate de que no haya errores al decodificar el JSON
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(array('status' => 'error', 'message' => 'Invalid JSON input'));
    exit;
}
error_log("Datos decodificados: " . print_r($data, true));

echo sendMail($data);
function sendMail($data) {

    $asunto = "Nuevo mensaje desde tu sitio web";

    $nombre = $data['data_message']['name'];
    $correo = $data['data_message']['email'];
    $mensaje = $data['data_message']['message'];
    $destinatario = "cortesmencia@cortesmencia.art"; # aquí la persona que recibirá los mensajes
    $encabezados = "Sender: correo@cortesmencia.art\r\n"; # El remitente, debe ser un correo de tu dominio de servidor
    $encabezados .= "From: $nombre <" . $correo . ">\r\n";
    $encabezados .= "Reply-To: $nombre <$correo>\r\n";
    $resultado = mail($destinatario, $asunto, $mensaje, $encabezados);
    if ($resultado) {
        echo json_encode("Mensaje enviado, Gracias por contactarme", JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode("Tu mensaje no se ha enviado. Intenta de nuevo.", JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT);
    }
}
?>