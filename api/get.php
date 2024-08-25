<?php

header('Content-Type: application/json');

require 'conexion.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$content_dir = "../cortesmencia/content/";

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(array('status' => 'error', 'message' => 'Invalid JSON input'));
    exit;
}
error_log("Datos decodificados: " . print_r($data, true));

$action = isset($data['action']) ? $data['action'] : '';
$languague = isset($data['languague']) ? $data['languague'] : '';

if ($action == "byId") {
    $tecnica = "tecnica_es";
    $serie = "serie_es";
    if($languague == "en") {
        $tecnica = "tecnica_en";
        $serie = "serie_en";
        $query = "SELECT a.id, a.titulo, a.medidas, a.anio, a.imagen, a.vendido, b.{$tecnica}, c.{$serie} FROM imagenes a LEFT JOIN tecnicas b ON a.tecnica = b.id LEFT JOIN series c ON a.serie = c.id WHERE a.id = {$data['param']['id']}";
        echo buscar($conn, $query, $tecnica, $serie, $filtro);
    } else {
        $query = "SELECT a.id, a.titulo, a.medidas, a.anio, a.imagen, a.vendido, b.{$tecnica}, c.{$serie} FROM imagenes a LEFT JOIN tecnicas b ON a.tecnica = b.id LEFT JOIN series c ON a.serie = c.id WHERE a.id = {$data['param']['id']}";
        echo buscar($conn, $query, $tecnica, $serie, $filtro);
    }

} else if ($action == "getTecnicas") {
    $column = "tecnica_es";
    if($languague == "en") {
        $column = "tecnica_en";
        $query = "SELECT id,". $column ." FROM tecnicas";
        echo selectAllOfColumn($conn, $query, $column);
    } else {
        //$query = "SELECT id,". $column ." FROM tecnicas";
        $query = "SELECT * FROM tecnicas";
        echo selectAllOfColumn($conn, $query, $column);
    }
}
else if ($action == "getSeries") {
    $column = "serie_es";
    if($languague == "en") {
        $column = "serie_en";
        $query = "SELECT id,". $column ." FROM series";
        echo selectAllOfColumn($conn, $query, $column);
    } else {
        $query = "SELECT * FROM series";
        echo selectAllOfColumn($conn, $query, $column);
    }
}
else if ($action == "bySerie") {
    $tecnica = "tecnica_es";
    $serie = "serie_es";
    if($languague == "en") {
        $tecnica = "tecnica_en";
        $serie = "serie_en";
        $query = "SELECT a.id, a.titulo, a.medidas, a.anio, a.imagen, a.vendido, b.{$tecnica}, c.{$serie} FROM imagenes a LEFT JOIN tecnicas b ON a.tecnica = b.id LEFT JOIN series c ON a.serie = c.id WHERE c.id = {$data['param']['serie']}";
        
        echo all_cuadros($conn, $query, $tecnica, $serie);
    } else {
        $query = "SELECT a.id, a.titulo, a.medidas, a.anio, a.imagen, a.vendido, b.{$tecnica}, c.{$serie} FROM imagenes a LEFT JOIN tecnicas b ON a.tecnica = b.id LEFT JOIN series c ON a.serie = c.id WHERE c.id = {$data['param']['serie']}";
        echo all_cuadros($conn, $query, $tecnica, $serie);
    }
}
else if ($action == "byTecnica") {
    $tecnica = "tecnica_es";
    $serie = "serie_es";
    if($languague == "en") {
        $tecnica = "tecnica_en";
        $serie = "serie_en";
        $query = "SELECT a.id, a.titulo, a.medidas, a.anio, a.imagen, a.vendido, b.{$tecnica}, c.{$serie} FROM imagenes a LEFT JOIN tecnicas b ON a.tecnica = b.id LEFT JOIN series c ON a.serie = c.id WHERE b.id = {$data['param']['tecnica']}";
        
        echo all_cuadros($conn, $query, $tecnica, $serie);
    } else {
        $query = "SELECT a.id, a.titulo, a.medidas, a.anio, a.imagen, a.vendido, b.{$tecnica}, c.{$serie} FROM imagenes a LEFT JOIN tecnicas b ON a.tecnica = b.id LEFT JOIN series c ON a.serie = c.id WHERE b.id = {$data['param']['tecnica']}";
        
        echo all_cuadros($conn, $query, $tecnica, $serie);
    }
} else if ($action == "all") {
    $tecnica = "tecnica_es";
    $serie = "serie_es";
    if($languague == "en") {
        $tecnica = "tecnica_en";
        $serie = "serie_en";
        $query = "SELECT a.id, a.titulo, a.medidas, a.anio, a.imagen, a.vendido, b.{$tecnica}, c.{$serie} FROM imagenes a LEFT JOIN tecnicas b ON a.tecnica = b.id LEFT JOIN series c ON a.serie = c.id";
        
        echo all_cuadros($conn, $query, $tecnica, $serie);
    } else {
        $query = "SELECT a.id, a.titulo, a.medidas, a.anio, a.imagen, a.vendido, b.{$tecnica}, c.{$serie} FROM imagenes a LEFT JOIN tecnicas b ON a.tecnica = b.id LEFT JOIN series c ON a.serie = c.id";
        
        echo all_cuadros($conn, $query, $tecnica, $serie);
    }
} else if ($action == "readProfile") {
    $ruta = $content_dir . "perfil-" . $data["lang"] . ".html";
    readContent($data, $ruta);
} else if($action == "readThoughts") {
    $ruta = $content_dir . "pensamientos-" . $data["lang"] . ".html";
    readContent($data, $ruta);

} else if($action == "readExhibitions") {
    $ruta = $content_dir . "exhibiciones-" . $data["lang"] . ".html";
    readContent($data, $ruta);

} else if($action == "readStudio") {
    $ruta = $content_dir . "taller-" . $data["lang"] . ".html";
    readContent($data, $ruta);

} else if($action == "readReviews") {
    $ruta = $content_dir . "entrevistas-" . $data["lang"] . ".html";
    readContent($data, $ruta);

} else if($action == "getResums") {
    readResums($data, $content_dir);
}
else {
    echo json_encode($action);
    echo json_encode("Accion no reconocida.");
}

// Functions ####

function selectAllOfColumn($conn, $query, $column) {
    try {
        // Preparar la consulta SQL
        $stmt = $conn->prepare($query);
        if (!$stmt) {
            // Si la preparación de la consulta falla, lanzar una excepción con información del error
            throw new Exception("Error al preparar la consulta SQL.");
        }
        // Especificamos el fetch mode antes de llamar a fetch()
        $stmt->setFetchMode(PDO::FETCH_NUM);
        
        // Ejecutamos
        $stmt->execute();
        
        // Mostramos los resultados
        $results = array();
        while ($row = $stmt->fetch()) {
            $result = array(
                'id' => $row[0], 
                'es' => $row[1], 
                'en' => $row[2]
            );
            $results[] = $result;
        }
        $conn = null;
       echo json_encode($results, JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT);
        
    } catch (Exception $e) {
        // Manejo de errores
        echo "Error: " . $e->getMessage();
    }

}
function all_cuadros($conn, $query, $tecnica = null, $serie = null) {
    try {
        // Preparar la consulta SQL
        $stmt = $conn->prepare($query);
        if (!$stmt) {
            // Si la preparación de la consulta falla, lanzar una excepción con información del error
            throw new Exception("Error al preparar la consulta SQL.");
        }
        // Especificamos el fetch mode antes de llamar a fetch()
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        
        // Ejecutamos
        $stmt->execute();
        
        // Mostramos los resultados
        $results = array();
        while ($row = $stmt->fetch()) {
            $result = array(
                'id' => $row["id"], 
                'titulo' => $row["titulo"], 
                'medidas' => $row["medidas"], 
                'anio' => $row["anio"], 
                'imagen' => $row["imagen"], 
                'tecnica' => $row[$tecnica],
                'serie' => $row[$serie], 
                'vendido' => $row["vendido"]
            );
            $results[] = $result;
        }
     
       return json_encode($results, JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT);
        
    } catch (Exception $e) {
        // Manejo de errores
        return json_encode(array('status' => 'error', 'message' => $e->getMessage()));
    }
}
function buscar($conn, $query, $tecnica = null, $serie = null) {
    try {
        // Preparar la consulta SQL
        $stmt = $conn->prepare($query);
        if (!$stmt) {
            // Si la preparación de la consulta falla, lanzar una excepción con información del error
            throw new Exception("Error al preparar la consulta SQL.");
        }
        
        
        // Especificamos el fetch mode antes de llamar a fetch()
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        
        // Ejecutamos
        $stmt->execute();
        // Mostramos los resultados
        $results = array();
        while ($row = $stmt->fetch()) {
            $result = array(
                'id' => $row["id"], 
                'titulo' => $row["titulo"], 
                'medidas' => $row["medidas"], 
                'anio' => $row["anio"], 
                'imagen' => $row["imagen"], 
                'tecnica' => $row[$tecnica],
                'serie' => $row[$serie], 
                'vendido' => $row["vendido"]
            );
            $results[] = $result;
        }
     
       echo json_encode($results, JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT);
        
    } catch (Exception $e) {
        // Manejo de errores
        echo "Error: " . $e->getMessage();
    }

}

function readContent($data, $ruta){
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

function readResums($data, $content_dir) {
    $rutaProfile = $content_dir . "resume-profile-" . $data["lang"] . ".html";
    $rutaThoughts = $content_dir . "resume-thoughts-" . $data["lang"] . ".html";
    $rutaReviews = $content_dir . "resume-reviews-" . $data["lang"] . ".html";
    $results = array(
        'profile' => returnContentFile($rutaProfile),
        'thoughts' => returnContentFile($rutaThoughts),
        'reviews' => returnContentFile($rutaReviews)
    );
    echo json_encode($results, JSON_UNESCAPED_SLASHES);
}

function returnContentFile($ruta) {
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
        
        return $contenido;
    } catch (Exception $e) {
        // Manejo de errores y excepciones
        return json_encode("Error: " . $e->getMessage());
    }
}
?>