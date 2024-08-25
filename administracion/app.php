<?php

header('Content-Type: application/json');

session_start();
if($_SESSION['user_id'] == null){
    return;
}

require 'conexion.php';

// Obtén el contenido JSON de la solicitud
$json = file_get_contents('php://input');
$data = json_decode($json, true);
// Asegúrate de que no haya errores al decodificar el JSON
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(array('status' => 'error', 'message' => 'Invalid JSON input'));
    exit;
}
error_log("Datos decodificados: " . print_r($data, true));
// Procesa los datos recibidos
$action = isset($data['action']) ? $data['action'] : '';
$languague = isset($data['languague']) ? $data['languague'] : '';


if ($action == "searchById") {
    $query = "SELECT a.id, a.titulo, a.medidas, a.anio, a.imagen, b.tecnica_es
        FROM imagenes a LEFT JOIN tecnicas b
        ON a.tecnica = b.id WHERE a.id = :filtro";
    $filtro = $data['param']['id'];
    echo buscar($conn, $query, $filtro);

} else if ($action == 'update') {
    $update = "UPDATE imagenes SET titulo = :titulo, medidas = :medidas, anio = :anio, tecnica = :tecnica, serie = :serie, imagen = :imagen, vendido = :vendido WHERE id = :id";
    actualizar($conn, $data, $update);

} else if($action == 'insert') {
    $insert = "INSERT INTO imagenes (titulo, medidas, anio, tecnica, serie, imagen, vendido) VALUES (:titulo, :medidas, :anio, :tecnica, :serie, :imagen, :vendido)";
    insert($conn, $data, $insert);
} else if($action == 'newTecnica') {
    $insert = "INSERT INTO tecnicas (tecnica_es, tecnica_en) VALUES (:es, :en)";
    newTecnicaSerie($conn, $data, $insert);
} else if($action == 'newSerie') {
    $insert = "INSERT INTO series (serie_es, serie_en) VALUES (:es, :en)";
    newTecnicaSerie($conn, $data, $insert);
} else if($action == 'updateSerie') {
    $update = "UPDATE series SET serie_es = :es, serie_en = :en WHERE id = :id";
    actualizarSerie($conn, $data, $update);
}else if($action =="deleteSerie") {
    $delete = "DELETE FROM series WHERE id = :id ORDER BY serie_es LIMIT 1";
    $id = $data['param']['id'];
    eliminar($conn, $delete, $id);
} else if ($action =='search') {
    $filter = $data['param']['filter'];
    if($data['param']['filterType'] == 'etiqueta') {
        $query = "SELECT * FROM imagenes WHERE etiquetas IS NOT NULL";
        echo searchByEtiqueta($conn, $query, $languague, $filter);
    } else if($data['param']['filterType'] == 'tecnica') {
        $query = "SELECT * FROM imagenes WHERE categoria = :filtro";
        echo buscar($conn, $query, $filter);
    } else if($data['param']['filterType'] == 'list')  {
        $query = "SELECT etiquetas FROM imagenes";
        echo getEtiquetas($conn, $query, $languague);
    }

} else if($action =="delete") {
    $delete = "DELETE FROM imagenes WHERE id = :id ORDER BY titulo LIMIT 1";
    $id = $data['param']['id'];
    eliminar($conn, $delete, $id);
} else if($action === 'all') {
    try {
        $query = "SELECT a.id, a.titulo, a.medidas, a.anio, a.imagen, b.tecnica_es, c.serie_es, a.vendido
        FROM imagenes a 
        LEFT JOIN tecnicas b ON a.tecnica = b.id
        LEFT JOIN series c ON a.serie = c.id";
        
        $results = all_cuadros($conn, $query);

        // Envía la respuesta JSON
        echo $results;
    } catch (Exception $e) {
        // Manejo de errores
        echo json_encode(array('status' => 'error', 'message' => $e->getMessage()));
    }
} else {
    echo json_encode("Accion no reconocida.");
}

// FUNCIONES ########################

function all_cuadros($conn, $query) {
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
                'tecnica_es' => $row["tecnica_es"],
                'serie_es' => $row["serie_es"], 
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

function searchByEtiqueta($conn, $query, $languague, $filter) {
    try {
        $stmt = $conn->query($query);
        $results = array();
        
        while ($row = $stmt->fetch()) {
            if ($row["etiquetas"] !== null && strlen($row["etiquetas"]) > 5) {
                $etiquetasJson = json_decode($row["etiquetas"], true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    foreach ($etiquetasJson as $etiqueta) {
                        if ((isset($etiqueta["es"]) && $etiqueta["es"] === $filter) ||
                            (isset($etiqueta["en"]) && $etiqueta["en"] === $filter)) {
                            $results[] = $row;
                            break; // Si encontramos la etiqueta, no necesitamos seguir revisando este registro
                        }
                    }
                }
            }
        }
        return json_encode($results, JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT);
    } catch (PDOException $e) {
        return json_encode("Error: " . $e->getMessage());
    }
}

function getEtiquetas($conn, $query, $languague) {
    try {
        $stmt = $conn->query($query);
        $results = array();
        $uniqueValues = array();
        while ($row = $stmt->fetch()) {
            if ($row["etiquetas"] !== null && strlen($row["etiquetas"]) > 5) {
                $etiquetasJson = json_decode($row["etiquetas"], true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    foreach ($etiquetasJson as $etiqueta) {
                        if (isset($etiqueta["es"]) && $languague == "es" && !in_array($etiqueta["es"], $uniqueValues)) {
                            $uniqueValues[] = $etiqueta["es"];
                            $results[] = $etiqueta["es"];
                        }
                        else if (isset($etiqueta["en"]) && $languague == "en" && !in_array($etiqueta["en"], $uniqueValues)) {
                            $uniqueValues[] = $etiqueta["en"];
                            $results[] = $etiqueta["en"];
                        }
                    }
                }
            }
        }
    echo json_encode($results, JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT);
    } catch (PDOException $e) {
        echo json_encode("Error: " . $e->getMessage());
    }
    
}

function buscar($conn, $query, $filtro) {
        try {
            // Preparar la consulta SQL
            $stmt = $conn->prepare($query);
            if (!$stmt) {
                // Si la preparación de la consulta falla, lanzar una excepción con información del error
                throw new Exception("Error al preparar la consulta SQL.");
            }
            if(gettype($filtro) == "string") {
                $stmt->bindParam(':filtro', $filtro, PDO::PARAM_STR);
            } else {
                $stmt->bindParam(':filtro', $filtro, PDO::PARAM_INT);
            }
            // Especificamos el fetch mode antes de llamar a fetch()
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            
            // Ejecutamos
            $stmt->execute();
            
            // Mostramos los resultados
            $results = array();
            while ($row = $stmt->fetch()) {
                $etiquetasJson = json_decode($row["etiquetas"], true);
                $result = array(
                    'id' => $row["id"], 
                    'titulo' => $row["titulo"], 
                    'medidas' => $row["medidas"], 
                    'anio' => $row["anio"], 
                    'imagen' => $row["imagen"], 
                    'tecnica' => $row["tecnica_es"], 
                    'vendido' => $row["vendido"], 
                    'etiquetas' => $etiquetasJson
                );
                $results[] = $result;
            }
         
           echo json_encode($results, JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT);
            
        } catch (Exception $e) {
            // Manejo de errores
            echo "Error: " . $e->getMessage();
        }
    
}
function eliminar($conn, $delete, $id) {
    try {
        $stmt = $conn->prepare($delete);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        echo json_encode(array('status' => 'success', 'message' => 'Registro eliminado correctamente.'));
    } catch (PDOException $e) {
        error_log('Error al insertar el registro: ' . $e->getMessage());
        echo json_encode(array('status' => 'error', 'message' => 'Error al insertar el registro: ' . $e->getMessage()));
    }
}
function actualizar($conn, $data, $update){
    try {
        $stmt = $conn->prepare($update);
        
        $id = $data['param']['id'];
        $titulo =  $data['param']['titulo'];
        $medidas = $data['param']['medidas'];
        $anio = $data['param']['anio'];
        $tecnica = $data['param']['tecnica'];
        $serie = $data['param']['serie'];
        $imagen = $data['param']['imagen'];
        $vendido = $data['param']['vendido'];	

        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':titulo', $titulo, PDO::PARAM_STR);
        $stmt->bindParam(':medidas', $medidas, PDO::PARAM_STR);
        $stmt->bindParam(':anio', $anio, PDO::PARAM_INT);
        $stmt->bindParam(':tecnica', $tecnica, PDO::PARAM_INT);
        $stmt->bindParam(':serie', $serie, PDO::PARAM_INT);
        $stmt->bindParam(':imagen', $imagen, PDO::PARAM_STR);
        $stmt->bindParam(':vendido', $vendido, PDO::PARAM_BOOL);
         
        $stmt->execute();

        echo json_encode(array('status' => 'success', 'message' => 'Registro actualizado correctamente.'));
    } catch (PDOException $e) {
        error_log('Error al actualizar el registro: ' . $e->getMessage());
        echo json_encode(array('status' => 'error', 'message' => 'Error al actualizar el registro: ' . $e->getMessage()));
    }

}

function actualizarSerie($conn, $data, $update) {
    try {
        $stmt = $conn->prepare($update);
        
        $id = $data['param']['id'];
        $es =  $data['param']['es'];
        $en = $data['param']['en'];

        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':es', $es, PDO::PARAM_STR);
        $stmt->bindParam(':en', $en, PDO::PARAM_STR);
         
        $stmt->execute();

        echo json_encode(array('status' => 'success', 'message' => 'Registro actualizado correctamente.'));
    } catch (PDOException $e) {
        error_log('Error al actualizar el registro: ' . $e->getMessage());
        echo json_encode(array('status' => 'error', 'message' => 'Error al actualizar el registro: ' . $e->getMessage()));
    }
}

function insert($conn, $data, $insert) {
    echo json_encode("Iniciando insert...");
    try {
        $stmt = $conn->prepare($insert);

        echo json_encode("conn preparada");
        //$etiquetas = $data['param']['etiquetas'];
       
        $titulo = $data['param']['titulo'];
        $medidas = $data['param']['medidas'];
        $anio = $data['param']['anio'];
        $tecnica = $data['param']['tecnica']; 
        $serie = $data['param']['serie']; 
        $imagen = $data['param']['imagen'];
        $vendido = $data['param']['vendido'];

        /*/$etiquetas = processEtiquetas($data);
        $etiquetas = mb_convert_encoding(json_encode($data['param']['etiquetas'],  JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT), "UTF-8", "auto");
        echo json_encode("variables: ");
        echo json_encode("Accion: " . $action . ", Titulo: " . $titulo . ", Medidas: " . $medidas . ", Categoria: " . $categoria . ", Año: " . $anio . ", Imagen Location: " . $imagen . ", Vendido: " . $vendido . ", etiq: ". $etiquetas);*/

        $stmt->bindParam(':titulo', $titulo, PDO::PARAM_STR);
        $stmt->bindParam(':medidas', $medidas, PDO::PARAM_STR);
        $stmt->bindParam(':anio', $anio, PDO::PARAM_INT);
        $stmt->bindParam(':tecnica', $tecnica, PDO::PARAM_INT);
        $stmt->bindParam(':serie', $serie, PDO::PARAM_INT);
        $stmt->bindParam(':imagen', $imagen, PDO::PARAM_STR);
        $stmt->bindParam(':vendido', $vendido, PDO::PARAM_BOOL);
        //$stmt->bindParam(':etiquetas', $etiquetas, PDO::PARAM_STR);

        $stmt->execute();

        echo json_encode(array('status' => 'success', 'message' => 'Registro insertado correctamente.'));
    } catch (PDOException $e) {
        error_log('Error al insertar el registro: ' . $e->getMessage());
        echo json_encode(array('status' => 'error', 'message' => 'Error al insertar el registro: ' . $e->getMessage()));
    }
}
function newTecnicaSerie($conn, $data, $insert){
    try {
        $stmt = $conn->prepare($insert);

        $es = $data['param']['es'];
        $en = $data['param']['en'];

        $stmt->bindParam(':es', $es, PDO::PARAM_STR);
        $stmt->bindParam(':en', $en, PDO::PARAM_STR);

        $stmt->execute();

        echo json_encode(array('status' => 'success', 'message' => 'Registro insertado correctamente.'));
    } catch (PDOException $e) {
        error_log('Error al insertar el registro: ' . $e->getMessage());
        echo json_encode(array('status' => 'error', 'message' => 'Error al insertar el registro: ' . $e->getMessage()));
    }

}
function utf8_converter($array){
    array_walk_recursive($array, function(&$item){
        $item = utf8_encode( $item ); 
    });
    return json_encode( $array );
}
function processEtiquetas($etiquetas) {
    $etiquetaKey = array_keys($etiquetas);
    $etiquetaValues = array_values($etiquetas);
    $arr = [];
    foreach ($etiquetaValues as $key => $cat) {
        if (mb_detect_encoding($etiquetaValues[$key]) !== "UTF-8") {
            $etiquetaValues[$key] = mb_convert_encoding($etiquetaValues[$key], "UTF-8", "auto");
        };
        $arr[] = $etiquetaValues[$key];
    }
    $etiqueta = json_encode(array_combine($etiquetaKey, $arr), JSON_UNESCAPED_UNICODE);
    return $etiqueta;
}
function eliminar_acentos($cadena){		    
    //Reemplazamos la A y a    
    $cadena = str_replace(array('Á', 'À', 'Â', 'Ä', 'á', 'à', 'ä', 'â', 'ª'), array('A', 'A', 'A', 'A', 'a', 'a', 'a', 'a', 'a'), $cadena);    
    //Reemplazamos la E y e    
    $cadena = str_replace(array('É', 'È', 'Ê', 'Ë', 'é', 'è', 'ë', 'ê'), array('E', 'E', 'E', 'E', 'e', 'e', 'e', 'e'), $cadena);    
    //Reemplazamos la I y i    
    $cadena = str_replace(array('Í', 'Ì', 'Ï', 'Î', 'í', 'ì', 'ï', 'î'), array('I', 'I', 'I', 'I', 'i', 'i', 'i', 'i'), $cadena);    
    //Reemplazamos la O y o    
    $cadena = str_replace(array('Ó', 'Ò', 'Ö', 'Ô', 'ó', 'ò', 'ö', 'ô'), array('O', 'O', 'O', 'O', 'o', 'o', 'o', 'o'), $cadena);
    //Reemplazamos la U y u
     $cadena = str_replace(array('Ú', 'Ù', 'Û', 'Ü', 'ú', 'ù', 'ü', 'û'), array('U', 'U', 'U', 'U', 'u', 'u', 'u', 'u'), $cadena);
     //Reemplazamos la N, n, C y c
     $cadena = str_replace(array('Ñ', 'ñ', 'Ç', 'ç'), array('N', 'n', 'C', 'c'), $cadena);
     return $cadena;
    }
?>