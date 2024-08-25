<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(array('status' => 'error', 'message' => 'Invalid JSON input'));
    exit;
}
error_log("Datos decodificados: " . print_r($data, true));

$action = isset($data['action']) ? $data['action'] : '';

if ($action == "read") {
    read($data);
} else if ($action == 'save') {
    save($data);
} else {
    echo json_encode("Accion no reconocida");
}


function save($data) {
    $ruta = "../../cortesmencia/content/resume-" . $data["type"] . "-" . $data["lang"] . ".html";
    $handle = fopen($ruta, 'w');
    $contenido = mb_convert_encoding($data["cuerpo"], "UTF-8", "auto");
    if ($handle) {
        // Escribe el contenido en el archivo
        if (fwrite($handle, $data["cuerpo"]) === false) {
            echo json_encode("Error al escribir en el archivo.");
        } else {
            echo json_encode("Escritura en el archivo exitosa.");
        }
        // Cierra el archivo
        fclose($handle);
    } else {
        // Manejo de errores si el archivo no se puede abrir
        echo json_encode("No se puede abrir el archivo.");
    }
    
}

function read($data) {
    $ruta = "../../cortesmencia/content/resume-" . $data["type"] . "-" . $data["lang"] . ".html";
    
    try {
        if (!file_exists($ruta)) {
            throw new Exception("El archivo no existe.");
        }
        if (!is_readable($ruta)) {
            throw new Exception("El archivo no es legible.");
        }
    
        $contenido = file_get_contents($ruta);
    
        if ($contenido === false) {
            throw new Exception("Error al leer el archivo.");
        }
        
        echo json_encode($contenido);
    } catch (Exception $e) {
        // Manejo de errores y excepciones
        echo json_encode("Error: " . $e->getMessage());
    }
}
?>