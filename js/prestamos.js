let slctLibro = document.querySelector("#selectLibro");
letinpt


let librosDisponibles = JSON.parse(localStorage.getItem("librosDisponibles")) || [];

function mostrarLibrosDisponibles() {
    slctLibro.innerHTML = "";
    
    let librosDisponiblesFiltrado = librosDisponibles.filter(libro => libro.estado === "disponible");
    librosDisponiblesFiltrado.forEach(elmt => {
    slctLibro.innerHTML += `<option value="${elmt.isbn}">${elmt.titulo} - ${elmt.autor}</option>`;
    })

}

btnPrestar.addEventListener("click", () => {

let libroseleccionado = slctLibro.value;
let personaAdquiere = inptPersona.value.trim();
let indxLibroLocalStorage = librosDisponibles.findIndex(elemnt => elemnt.titulo === libroseleccionado);

librosDisponibles[indxLibroLocalStorage].estado = "prestado";

localStorage.setItem("librosDisponibles", JSON.stringify(librosDisponibles));

mostrarLibrosDisponibles();

inptPersona.value = "";

let LibroPrestado = {
    titulo: libroseleccionado,
    persona: personaAdquiere,
    fecha: new Date().toLocaleDateString()
}

librosPrestados.push(LibroPrestado);

localStorage.setItem("librosPrestados", JSON.stringify(librosPrestados));

alert(`Prestamoo exitoso`)

})

mostrarLibrosDisponibles();