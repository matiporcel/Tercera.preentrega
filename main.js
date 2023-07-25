// Función para calcular el IMC
function calcularIMC(peso, altura) {
  if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    throw new Error("El peso y la altura deben ser números mayores a cero.");
  }

  let imc = peso / (altura * altura);
  return imc.toFixed(2);
}

// Función para determinar el estado según el IMC
function determinarEstado(imc) {
  if (imc < 18.5) {
    return "Bajo peso";
  } else if (imc < 25) {
    return "Normal";
  } else if (imc < 30) {
    return "Sobrepeso";
  } else {
    return "Obesidad";
  }
}

// Función para mostrar los resultados
function mostrarResultados(personas) {
  const listaResultados = document.getElementById("lista-resultados");
  listaResultados.innerHTML = "";

  personas.forEach((persona) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <strong>Nombre:</strong> ${persona.nombre}<br>
      <strong>IMC:</strong> ${persona.imc}<br>
      <strong>Estado:</strong> ${persona.estado}<br>
      <hr>
    `;
    listaResultados.appendChild(listItem);
  });
}

// Función para manejar el evento submit del formulario
function handleSubmit(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);

  try {
    const imc = calcularIMC(peso, altura);
    const estado = determinarEstado(imc);

    const persona = {
      nombre: nombre,
      peso: peso,
      altura: altura,
      imc: imc,
      estado: estado,
    };

    // Agregar el objeto al array de personas
    personas.push(persona);
    // Guardar los datos en LocalStorage
    localStorage.setItem("personas", JSON.stringify(personas));

    mostrarResultados(personas);
    // Limpiar el formulario después de guardar los datos
    document.getElementById("formulario").reset();
  } catch (error) {
    console.error(error.message);
  }
}

// Array para almacenar los datos de múltiples personas
let personas = JSON.parse(localStorage.getItem("personas")) || [];

function limpiarResultados() {
  localStorage.removeItem("personas");
  personas = [];
  mostrarResultados(personas);
}

// Mostrar los resultados iniciales al cargar la página
mostrarResultados(personas);

// Agregar el evento submit al formulario
document.getElementById("formulario").addEventListener("submit", handleSubmit);

// Agregar el evento click al botón para limpiar resultados
document.getElementById("limpiar-resultados").addEventListener("click", limpiarResultados);
