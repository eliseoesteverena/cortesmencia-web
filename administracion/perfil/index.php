<?php

  session_start();

  if($_SESSION['user_id'] == null){
    header('Location: ../login.php');
  }

?>
    <!DOCTYPE html>
    <html lang="es">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Perfil - Cortés Mencía</title>
        <link rel="icon" type="image/x-icon" href="../../img/cm.ico">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="../../css/ql-style.css" rel="stylesheet" />
        <style>
            html {font-size:14px;}
            .title-image {font-size: 1rem;margin-bottom:.3rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 15rem;display: inline-block;}
            body {overflow:visible;}
            .editor-container {min-height:50rem;}
            .edit-header {align-items: baseline;justify-content: space-between;}
            .toolbar {margin:0;padding:0;width: 100%;}
            img{border-radius:5px;}
            #editor {padding-top: 3.5rem;overflow:auto;width: calc(100% - 1rem);min-height:65vh;}
            .ql-toolbar.ql-snow {border:none;border-left:1px solid rgb(229 231 235);position:fixed;z-index:10;background:#FFFFFF;}
            header {display:flex;flex-direction:row;aling-items:center;justify-content:baseline;width: 100%;}
        </style>
    </head>

    <body>
        <div class="antialiased bg-gray-50">
            <nav id="nav" class="bg-white z-50">
            </nav>
            <main class="p-4 h-auto" id="main-dashboard">
              <header class="items-center justify-center">
                <div class="w-full px-0 py-4">
                  <a class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2 cursor-pointer" href="resumenes">
                  <svg class="w-5 h-5 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z" clip-rule="evenodd"/>
                  </svg>
                  Sección "Sobre mi"
                  </a>
                  <a id="loadPerfil" class="text-white bg-blue-700 hover:bg-blue-800 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2 shadow-lg cursor-pointer">
                  <svg class="w-5 h-5 mr-2 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z" clip-rule="evenodd"/>
                  </svg>
                  Exhibiciones y CV
                  </a>
                  <a id="loadPensamientos" class="text-gray-800 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2 cursor-pointer">
                  <svg class="w-5 h-5 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z" clip-rule="evenodd"/>
                  </svg>
                  Pensamientos
                  </a>
                  <a id="loadEntrevistas" class="text-gray-800 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2 cursor-pointer">
                  <svg class="w-5 h-5 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z" clip-rule="evenodd"/>
                  </svg>
                  Criticas y Entrevistas
                  </a>
                </div>
                <button id="saveBtn" class="w-48 text-white bg-blue-700 hover:bg-blue-800 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 shadow-lg cursor-pointer justify-center h-12">
                    Guardar Cambios
                </button>
              </header>
                <section class="bg-gray-50">
                    <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50" style="width: calc(100% - 1.1rem);">
                        <div class="flex items-center justify-between px-3 py-2 border-b edit-header">
                            <h1 class="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-800" id="titleEditor">Editar Exhibiciones y CV</h1>
                            <div class="max-w-sm mx-auto">
                              <label for="typeLang" class="mb-2 text-sm font-medium text-gray-900">Seleccionar Idioma</label>
                              <select id="typeLang" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5">
                                <option value="perfil-es">Español</option>
                                <option value="perfil-en">Ingles</option>
                              </select>
                            </div>
                            <div id="msgContent" class="flex items-center p-2 mb-2 text-sm text-green-800 rounded-lg">
                            </div>
                        </div>
                        <div class="bg-white rounded-b-lg editor-container">
                          <div id="editor" class="block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:ring-0">
                            
                          </div>
                        </div>
                    </div>
        </div>
        </section>
        </main>
        </div>
        <script src="../template.js"></script>
        <!-- Include the Quill library -->
        <script src="https://cdn.jsdelivr.net/npm/quill@2.0.0-rc.5/dist/quill.js"></script>

        <script src="editor.js"></script>
        <!-- Initialize Quill editor -->
        <!--script>
            const toolbarOptions = [
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote', 'code-block'],
              ['link'],

              [{ 'header': 1 }, { 'header': 2 }],               // custom button values
              [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
              [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
              [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
              [{ 'direction': 'rtl' }],                         // text direction
              ['image'],
              
              [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

              [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
              [{ 'font': [] }],
              [{ 'align': [] }],

              ['clean']   
            ];
            const quill = new Quill('#editor', {
            modules: {
                toolbar: {
                  container: toolbarOptions,
                  handlers: {
                    image: function () {
                      selectLocalImage();
                    }
                  }
                }
            },
            theme: 'snow'
            });  
            function selectLocalImage() {
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');
              input.click();

              input.onchange = () => {
                const file = input.files[0];
                if (/^image\//.test(file.type)) {
                  saveToServer(file);
                } else {
                  console.warn('Please upload an image file.');
                }
              };
            }

            function saveToServer(file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const range = quill.getSelection();
                quill.insertEmbed(range.index, 'image', e.target.result);
              };
              reader.readAsDataURL(file);
            }
        </script-->
    </body>

    </html>