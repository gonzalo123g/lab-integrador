/* 01. Capturar los elementos  y crear variables*/ 
let inptTituloLibro = document.querySelector("#tituloLibro");
let inptAutorLibro = document.querySelector("#autorLibro");
let inptIsbnLibro = document.querySelector("#isbnLibro");
let tbBodyLibros = document.querySelector("#TablaLibros");

let btnAgregarLibro = document.querySelector("#btnAgregarLibro");

let librosDisponibles = JSON.parse(localStorage.getItem("librosDisponibles")) || [];
/* 02. Manipulacion de Eventos */

btnAgregarLibro.addEventListener("click", agregarLibro )

/* 03. Funciones */
function agregarLibro() {
   let titulo = inptTituloLibro.value.trim();
   let autor = inptAutorLibro.value.trim();
   let isbn = inptIsbnLibro.value.trim();

   /* Validacion de campos obligatorios */
   if ( titulo == "" || autor == "" || isbn == "" ) {
      alert("Por favor, completa todos los campos");
      return;
   }

   let libroNuevo = {
      isbn: isbn,
      titulo: titulo,
      autor: autor,
      estado: "disponible"
   }

   librosDisponibles.push(libroNuevo);

   // Guardar en el localStorage
   localStorage.setItem("librosDisponibles", JSON.stringify(librosDisponibles));

   console.log(librosDisponibles);

   // Limpiar los campos del formulario
   inptTituloLibro.value = "";
   inptAutorLibro.value = "";
   inptIsbnLibro.value = "";

   alert("Libro agregado exitosamente")

   mostrarLibros();
}

function mostrarLibros() {
   tbBodyLibros.innerHTML = "";
   librosDisponibles.forEach( libro => {
     tbBodyLibros.innerHTML += `
       <tr>
         <td class="border p-2">${libro.titulo}</td>
          <td class="border p-2">${libro.autor}</td>
          <td class="border p-2">${libro.isbn}</td>
          <td class="border p-2">${libro.estado}</td>
          <td class="border p-2">
            <button class="bg-red-500 text-white px-2" onclick="eliminarLibro(${index})">Eliminar</button>
          </td>
       </tr>
     `;
   });
}

function eliminarLibro(index) {
   if (librosDisponibles[index].estado === "prestado") {
      alert("No se puede eliminar un libro prestado");
      return;
   }

   alert(`libro con indice ${index} eliminado`);
   librosDisponibles.splice(index, 1);
   localStorage.setItem("librosDisponibles", JSON.stringify(librosDisponibles));
}

mostrarLibros();
