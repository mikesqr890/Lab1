// Función para calcular la cuota mensual usando la fórmula del préstamo
function calcularCuota(prestamo, meses, interes) {
    // Fórmula: cuota = prestamo * ((1+i)^n * i) / ((1+i)^n - 1)
    const i = interes;
    const n = meses;
    const numerador = Math.pow(1 + i, n) * i;
    const denominador = Math.pow(1 + i, n) - 1;
    const cuota = prestamo * (numerador / denominador);
    return cuota;
}

// a) Sumatoria de cada cuota
function sumatoriasCuotas(historial) {
    return historial.reduce((suma, obj) => suma + obj.cuota, 0);
}

// b) Extraer objetos cuya cuota es mayor a 300000
function cuotasMayores300000(historial) {
    return historial.filter(obj => obj.cuota > 300000);
}

// c) Extraer objetos que se pagan en menos de un año (< 12 meses)
function pagosMenosDeUnAnio(historial) {
    return historial.filter(obj => obj.meses < 12);
}

// d) Encontrar primer objeto cuyo préstamo es superior a $5000000
function prestamoMayorA5M(historial) {
    return historial.find(obj => obj.prestamo > 5000000);
}

// e) Encontrar primer objeto cuyo interés es inferior a 2% (0.02)
function interesInferiorA2(historial) {
    return historial.find(obj => obj.interes < 0.02);
}

// f) Incrementar cada cuota en $90000
function incrementarCuotas(historial) {
    return historial.map(obj => ({
        ...obj,
        cuota: obj.cuota + 90000
    }));
}

// g) Decrementar préstamos en $90000 (solo préstamos >= $90,000)
function decrementarPrestamos(historial) {
    return historial
        .filter(obj => obj.prestamo >= 90000)  
        .map(obj => ({
            ...obj,
            prestamo: obj.prestamo - 90000
        }));
}

// h) Obtener arreglo solo con las cuotas
function obtenerSoloCuotas(historial) {
    return historial.map(obj => obj.cuota);
}

// i) Calcular el total a pagar por cada préstamo (cuota * meses)
function calcularTotalAPagar(historial) {
    return historial.map(obj => ({
        ...obj,
        totalAPagar: obj.cuota * obj.meses
    }));
}

// Función para calcular la sumatoria de todos los totales a pagar
function sumatoriaTotalesAPagar(historial) {
    return historial.reduce((suma, obj) => suma + (obj.cuota * obj.meses), 0);
}

// Función auxiliar para formatear un objeto como texto
function formatearObjeto(obj) {
    return `Nombre: ${obj.nombre}
Préstamo: $${obj.prestamo.toFixed(2)}
Meses: ${obj.meses}
Interés: ${(obj.interes * 100).toFixed(2)}%
Cuota: $${obj.cuota.toFixed(2)}`;
}

// Función auxiliar para formatear arreglo de objetos
function formatearArregloObjetos(arreglo) {
    return arreglo.map(obj => formatearObjeto(obj)).join('\n\n---\n\n');
}

export {
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
};