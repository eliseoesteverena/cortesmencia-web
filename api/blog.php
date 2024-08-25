<?php

//header('Content-Type: application/json');

require 'conexion.php';
/*
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$content_dir = "../cortesmencia/blog/articles/";

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(array('status' => 'error', 'message' => 'Invalid JSON input'));
    exit;
}
error_log("Datos decodificados: " . print_r($data, true));

$action = isset($data['action']) ? $data['action'] : '';
$id = isset($data['param']['id']) ? $data['param']['id'] : '';
*/
$action = "getArticleById";
$id = 6;
if($action == 'getArticles') {
    $query = 'SELECT id, title, author_name, created_at, updated_at, excerpt, article_file FROM blog_articles';
   echo get($conn, $query);
}
else if($action == 'getArticleById') {
    $query = "SELECT id, title, author_name, created_at, updated_at, excerpt, article_file FROM blog_articles WHERE id = {$id}";
    $results = get($conn, $query);
    $content = json_decode($results);
    echo $content['article_file'];
}
else if ($action == "readArticle") {
    $query = "SELECT id, article_file FROM blog_articles WHERE id = {$id}";
    
    $ruta = $content_dir . "perfil-" . $data["lang"] . ".html";
    readArticle($data, $ruta);
}

function get($conn, $query) {
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
                'title' => $row["title"], 
                'author_name' => $row["author_name"], 
                'created_at' => $row["created_at"], 
                'updated_at' => $row["updated_at"], 
                'excerpt' => $row['excerpt'],
                'article_file' => $row['article_file']
            );
            $results[] = $result;
        }
        
        return json_encode($results, JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT);
    } 
    catch (Exception $e) {
        // Manejo de errores
        echo "Error: " . $e->getMessage();
    }
    
}

function readArticle($conn) {

}
?>