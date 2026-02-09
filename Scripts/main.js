/*
*  archivo main.js
*  Creado por: Orlando Arboleda Molina
*
*  Descripción: 
*  Permite manipular los elementos de la pagina web y hacerla dinámica, 
*  para el curso de EDyA1 en la Universidad Autónoma de Occidente
*/

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("calcular").addEventListener("click", calcularYGuardar);
    document.getElementById("historial").addEventListener("click", verHistorial);
    document.getElementById("reportes").addEventListener("click", generarReporte);

});

let historial = [];

function calcularYGuardar() {
    const nombre = document.getElementById("elNombre").value;
    const prestamo = document.getElementById("prestamo").value;
    const meses = document.getElementById("meses").value;
    const interes = document.getElementById("intereses").value;

    const resultado =
`Nombre: ${nombre}
Préstamo: ${prestamo}
Meses: ${meses}
Interés: ${interes}`;

    historial.push(resultado);
    document.getElementById("laRespuesta").value = resultado;
}

function verHistorial() {
    document.getElementById("laRespuesta").value =
        historial.length > 0 ? historial.join("\n\n") : "no existen datos guardados";
}

function generarReporte() {
    document.getElementById("laRespuesta").value =
        "Reporte generado correctamente";
}


