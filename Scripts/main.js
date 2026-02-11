import {
    calcularCuota,
    sumatoriasCuotas,
    cuotasMayores300000,
    pagosMenosDeUnAnio,
    prestamoMayorA5M,
    interesInferiorA2,
    incrementarCuotas,
    decrementarPrestamos,
    obtenerSoloCuotas,
    calcularTotalAPagar,
    sumatoriaTotalesAPagar,
    formatearObjeto,
    formatearArregloObjetos
} from './funciones.js';

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("generar").addEventListener("click", ejecutarAccion);
});

let historial = [];

function ejecutarAccion() {
    const accion = document.getElementById("accionSeleccionada").value;
    
    switch(accion) {
        case "calcular":
            calcularYGuardar();
            break;
        case "historial":
            verHistorial();
            break;
        case "reportes":
            generarReporte();
            break;
        default:
            document.getElementById("error").textContent = "Seleccione una acción válida";
    }
}

function calcularYGuardar() {
    // Limpiar mensaje de error
    document.getElementById("error").textContent = "";
    
    // Obtener valores de los inputs
    const nombre = document.getElementById("elNombre").value.trim();
    const prestamo = parseFloat(document.getElementById("prestamo").value);
    const meses = parseInt(document.getElementById("meses").value);
    const interes = parseFloat(document.getElementById("intereses").value);

    // Validaciones
    if (!nombre) {
        document.getElementById("error").textContent = "Por favor ingrese un nombre";
        return;
    }
    if (!prestamo || prestamo <= 0) {
        document.getElementById("error").textContent = "Por favor ingrese un préstamo válido";
        return;
    }
    if (!meses || meses <= 0) {
        document.getElementById("error").textContent = "Por favor ingrese meses válidos";
        return;
    }
    if (interes === null || interes === undefined || interes < 0) {
        document.getElementById("error").textContent = "Por favor ingrese un interés válido";
        return;
    }

    // Calcular la cuota usando la fórmula
    const cuota = calcularCuota(prestamo, meses, interes);

    // Crear objeto con todas las propiedades
    const objetoPrestamo = {
        nombre: nombre,
        prestamo: prestamo,
        meses: meses,
        interes: interes,
        cuota: cuota
    };

    // Guardar en el historial
    historial.push(objetoPrestamo);

    // Mostrar resultado con el formato requerido
    const resultado = `${nombre} debe pagar $${cuota.toFixed(2)} cada mes por el préstamo de $${prestamo.toFixed(2)} a ${meses} meses con el interés del ${(interes * 100).toFixed(2)}%`;
    
    document.getElementById("laRespuesta").value = resultado;
    
    // Limpiar formulario
    document.getElementById("elNombre").value = "";
    document.getElementById("prestamo").value = "";
    document.getElementById("meses").value = "";
    document.getElementById("intereses").value = "";
}

function verHistorial() {
    if (historial.length === 0) {
        document.getElementById("laRespuesta").value = "No existen datos guardados";
        return;
    }

    // Calcular la sumatoria total de todas las cuotas
    const sumatoriaTotalCuotas = sumatoriasCuotas(historial);

    // Mostrar todos los objetos del historial
    const textoHistorial = formatearArregloObjetos(historial);
    
    // Agregar información de sumatoria al final
    const resumen = `\n\n${'='.repeat(50)}\n📊 RESUMEN TOTAL\n${'='.repeat(50)}\nTotal de préstamos: ${historial.length}\nSUMATORIA TOTAL DE CUOTAS MENSUAL: $${sumatoriaTotalCuotas.toFixed(2)}\n(Monto mensual que pagarán los clientes con intereses)`;
    
    document.getElementById("laRespuesta").value = `=== HISTORIAL DE PRÉSTAMOS ===\n\n${textoHistorial}${resumen}`;
}

function generarReporte() {
    if (historial.length === 0) {
        document.getElementById("laRespuesta").value = "No hay datos para generar reportes";
        return;
    }

    let reporte = "=== REPORTES ===\n\n";

    // Sumatoria de cada cuota
    const sumatoria = sumatoriasCuotas(historial);
    reporte += `a) SUMATORIA DE CUOTAS: $${sumatoria.toFixed(2)}\n\n`;

    // Cuotas mayores a 300000
    const cuotasMayores = cuotasMayores300000(historial);
    reporte += `b) CUOTAS MAYORES A $300,000 (${cuotasMayores.length} encontrados):\n`;
    if (cuotasMayores.length > 0) {
        reporte += formatearArregloObjetos(cuotasMayores) + "\n\n";
    } else {
        reporte += "No hay cuotas mayores a $300,000\n\n";
    }

    // Pagos en menos de un año
    const pagosMenores12 = pagosMenosDeUnAnio(historial);
    reporte += `c) PRÉSTAMOS A MENOS DE 12 MESES (${pagosMenores12.length} encontrados):\n`;
    if (pagosMenores12.length > 0) {
        reporte += formatearArregloObjetos(pagosMenores12) + "\n\n";
    } else {
        reporte += "No hay préstamos a menos de 12 meses\n\n";
    }

    // Primer préstamo mayor a 5000000
    const prestamoMayor5M = prestamoMayorA5M(historial);
    reporte += `d) PRIMER PRÉSTAMO MAYOR A $5,000,000:\n`;
    if (prestamoMayor5M) {
        reporte += formatearObjeto(prestamoMayor5M) + "\n\n";
    } else {
        reporte += "No hay préstamos mayores a $5,000,000\n\n";
    }

    // Primer interés inferior a 2%
    const interesInferior = interesInferiorA2(historial);
    reporte += `e) PRIMER INTERÉS INFERIOR A 2%:\n`;
    if (interesInferior) {
        reporte += formatearObjeto(interesInferior) + "\n\n";
    } else {
        reporte += "No hay intereses inferiores a 2%\n\n";
    }

    // Incrementar cuotas en $90000
    const cuotasIncrementadas = incrementarCuotas(historial);
    reporte += `f) CUOTAS INCREMENTADAS EN $90,000:\n`;
    reporte += formatearArregloObjetos(cuotasIncrementadas) + "\n\n";

    // Decrementar préstamos en $90000
    const prestamosDecrementados = decrementarPrestamos(historial);
    reporte += `g) PRÉSTAMOS DECREMENTADOS EN $90,000 (Solo préstamos >= $90,000):\n`;
    reporte += `(${prestamosDecrementados.length} de ${historial.length} préstamos cumplen la condición)\n`;
    if (prestamosDecrementados.length > 0) {
        reporte += formatearArregloObjetos(prestamosDecrementados) + "\n\n";
    } else {
        reporte += "No hay préstamos >= $90,000 para decrementar\n\n";
    }

    // Arreglo solo con cuotas
    const soloCuotas = obtenerSoloCuotas(historial);
    reporte += `h) SOLO CUOTAS:\n`;
    reporte += soloCuotas.map(c => `$${c.toFixed(2)}`).join(', ');
    
    reporte += '\n\n';
    
    // Total a pagar por cada préstamo (cuota * meses)
    const totalesAPagar = calcularTotalAPagar(historial);
    const sumatoriaTotal = sumatoriaTotalesAPagar(historial);
    reporte += `i) TOTAL A PAGAR POR CADA PRÉSTAMO (Cuota × Meses):\n`;
    totalesAPagar.forEach(obj => {
        reporte += `\n${obj.nombre}: $${obj.cuota.toFixed(2)} × ${obj.meses} meses = $${obj.totalAPagar.toFixed(2)}`;
    });
    reporte += `\n\n${'='.repeat(50)}`;
    reporte += `\nSUMATORIA TOTAL A PAGAR (Todos los préstamos): $${sumatoriaTotal.toFixed(2)}`;
    reporte += `\n${'='.repeat(50)}`;

    document.getElementById("laRespuesta").value = reporte;
}