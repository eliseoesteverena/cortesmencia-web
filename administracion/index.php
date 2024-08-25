<?php

  session_start();

  if($_SESSION['user_id'] == null){
    header('Location: login');
  }

?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dashboard - Cortés Mencía</title>
  <link rel="icon" type="image/x-icon" href="../../img/cm.ico">

  <!--link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"-->
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    html {font-size:14px;}
    .title-image {font-size: 1rem;margin-bottom:.3rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 15rem;display: inline-block;}
    img{border-radius:5px;}
  </style>
</head>
<body>
    <div class="antialiased bg-gray-50">
        <nav id="nav" class="bg-white border-gray-200 left-0 right-0 top-0 z-50">
        </nav>
        <main class="p-4 h-auto pt-20" id="main-dashboard">
          
        </main>
    </div>
    <script src="template.js"></script>
</body>
</html>