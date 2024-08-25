<?php

  session_start();

  if($_SESSION['user_id'] == null){
    header('Location: ../../login.php');
  }

?>
    <!DOCTYPE html>
    <html lang="es">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Editar Cuadro | Cortes Mencia</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="icon" type="image/x-icon" href="../../../img/cm.ico">
        <style>
            html {font-size:14px;}
            .modal {display:block;position:absolute;top:50%;left:50%;right:50%;transform: translate(-50%, -50%);}
            label#contentInput, label img{border-radius:5px;object-fit: cover;width: 10rem;min-height:10rem;margin 1rem;}
        </style>
    </head>

    <body>

        <div class="antialiased bg-gray-50">
            <nav id="nav" class="bg-white border-b border-gray-200 px-4 py-2.5 left-0 right-0 top-0 z-50">
            </nav>
            <main class="p-4 h-auto pt-20" id="main-dashboard">
                <section>
                    <div style="" class="max-w-2xl px-1 py-1 mx-auto">
                        <h2 class="mb-4 text-xl font-bold text-gray-900" id="titleForm">Editar Cuadro</h2>
                        <div id="msg" class="text-lg"></div>
                        <div id="upFileForm">
                            <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                                <div class="sm:col-span-2">
                                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900">Titulo</label>
                                    <input type="text" name="title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value="" placeholder="Titulo" required="">
                                </div>
                                <div class="w-full">
                                    <label for="medidas" class="block mb-2 text-sm font-medium text-gray-900">Medidas</label>
                                    <input type="text" name="medidas" id="medidas" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value="" placeholder="cm" required="">
                                </div>
                                <div class="w-full">
                                    <label for="anio" class="block mb-2 text-sm font-medium text-gray-900">Año</label>
                                    <input type="text" name="anio" id="anio" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value="" placeholder="Año" required="">
                                </div>
                                <div class="sm:col-span-2">
                                    <label class="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="" id="vendido" name="vendido" class="sr-only peer">
                                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        <span class="ms-3 text-sm font-medium text-gray-900 ">Vendido&#40;si&#47;no&#41;</span>
                                    </label>
                                </div>
                                <div class="w-full">
                                    <label for="tecnica" class="block mb-2 text-sm font-medium text-gray-900">Tecnica</label>
                                    <select id="tecnica" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                        <option value="0">Tecnica...</option>
                                        
                                    </select>
                                </div>
                                <div class="w-full">
                                    <label for="series" class="block mb-2 text-sm font-medium text-gray-900">Series</label>
                                    <select id="series" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                        <option value="0">Series...</option>
                                    </select>
                                </div>
                                <div class="sm:col-span-2">
                                    <div class="flex items-center justify-center w-full">
                                        <label for="inputArchivos" class="h-44 flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ">
                                            <label class="flex flex-row items-center justify-center">
                                                <label id="contentInput"></label>
                                                <span class="sr-only">Choose profile photo</span>
                                                <input type="file" id="inputArchivos" class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-800 hover:file:bg-violet-100 rounded" />
                                            </label>
                                        </label>
                                    </div>
                                </div>
                                <div class="sm:col-span-2" style="display:none;">
                                    <label class="block mb-2 text-sm font-medium text-gray-900">Tematicas&#47;Etiquetas:</label>
                                    <div class="flex items-center justify-center w-full p-0 bg-white border border-gray-200 rounded-lg shadow">
                                        <div class="flex items-center min-w-full p-2 text-gray-500 bg-white rounded-lg shadow" role="alert">
                                            <div id="tagsContent">

                                            </div>
                                            <button type="button" id="newTagBtn" class="text-blue-700 hover:border-blue-500 hover:text-purple-700 font-medium rounded-full text-sm p-0.5 text-center inline-flex items-center hover:text-white mb-2">
                                                <svg class="w-6 h-6 text-gray-800 hover:border-blue-500 hover:text-purple-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                                                </svg>
                                                <span class="sr-only">New Tag</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-4 w-full sm:col-span-2 justify-between">
                                    <button type="button" id="abortBtn" class="inline-flex items-center focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-gray-900 text-center">
                                        Cancelar
                                    </button>
                                    <button type="submit" id="subirCuadroBtn" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                                        </svg>
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </div>
                </section>
            </main>
            </div>
            <script src="../../template.js"></script>
            <script src="script.js"></script>
    </body>

    </html>