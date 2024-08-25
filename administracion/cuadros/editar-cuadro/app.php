<?php
$datos = json_decode(file_get_contents("php://input"));
//echo json_encode($datos);


$action = $datos->action;
$languague = $datos->languague;
$titulo = $datos->param->titulo;
$medidas = $datos->param->medidas;
$anio = $datos->param->anio;
$imagen = $datos->param->imagen;
$tecnica = $datos->param->tecnica;
$vendido = $datos->param->vendido;
$categorias = json_encode($datos->param->categoria);

echo json_encode("Accion: " . $action . ", Idioma: " . $languague . ", Titulo: " . $titulo . ", Medidas: " . $medidas . ", Tecnica: " . $tecnica . ", Año: " . $anio . ", Imagen Location: " . $imagen . ", Vendido: " . $vendido . ", Categorias: " . $categorias);