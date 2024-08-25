<?php

  session_start();

  if($_SESSION['user_id'] == null){
    header('Location: ../login');
  }

?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cuadros - Cortés Mencía</title>
    <link rel="icon" type="image/x-icon" href="../../img/cm.ico">

    <!--link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"-->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
    html {font-size:14px;}
        .title-image {font-size: 1rem;margin-bottom:.3rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 15rem;display: inline-block;}
        img{border-radius:5px;object-fit: cover;}
        .modal {display:block;position:absolute;top:50%;left:50%;right:50%;transform: translate(-50%, -50%);}
    </style>
</head>

<body>
    <div class="antialiased bg-gray-50">
        <nav id="nav" class="bg-white border-gray-200 left-0 right-0 top-0 z-50">
        </nav>

        <main class="p-4 h-auto pt-20">
            <section class="bg-gray-50">
                <div class="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                    <button type="button" class="text-grey-800 inline-flex items-center focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm pr-3 py-2.5 text-center right-0 hover:bg-indigo-100 hover:text-grey-900" id="editCategoriasLink">
                        <svg class="w-8 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z"/>
                        </svg>

                        Editar Series
                    </button>
                    <button type="button" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center right-0" id="linkNewCuadro">
                        <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Añadir Cuadro
                    </button>
                </div>
                <div id="mainDashboard" class="overflow-x-auto margin-auto">
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead id="thead" class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="px-4 py-3">T&#237;tulo del Cuadro</th>
                                <th scope="col" class="px-4 py-3">
                                    <select id="tecnica" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                        <option value="0" selected>Todas las tecnicas</option>

                                    </select>
                                </th>
                                <th scope="col" class="px-4 py-3">Medidas</th>
                                <th scope="col" class="px-4 py-3">A&#241;o</th>
                                <th scope="col" class="px-4 py-3">Estado</th>
                                <th scope="col" class="px-4 py-3">
                                    <select id="series" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5">
                                        <option value="0" selected>Series...</option>
                                    </select>
                                </th>
                                <th scope="col" class="px-4 py-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="cuadrosResults">

                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    </div>
    <div id="tagsElement"></div>
    <script src="../template.js"></script>
    <script src="cuadros.js"></script>
</body>

</html>