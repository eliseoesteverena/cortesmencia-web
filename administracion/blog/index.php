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
<title>Editar Blog - Cortés Mencía</title>
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
        <main class="p-4 h-auto pt-20" id="main-blog">
            <div class="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                <button type="button" class="text-grey-800 inline-flex items-center focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm pr-3 py-2.5 text-center right-0 hover:bg-indigo-100 hover:text-grey-900" style="display:none;" id="">
                    <svg class="w-8 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z"/>
                    </svg>

                    Editar Series
                </button>
                <button type="button" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center right-0" id="">
                    <svg class="w-5 h-5 mr-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z" clip-rule="evenodd"></path>
                    </svg>
                    Escribir artículo
                </button>
            </div>
        </main>
    </div>
    <script src="../template.js"></script>
</body>
</html>