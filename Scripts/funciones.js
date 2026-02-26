function calcularSubtotal(peso, distancia) { 
    const costoPeso = peso * 2.0; 
    const costoDistancia = distancia * 0.05; 
    return costoPeso + costoDistancia;
}

function calcularDescuento(subtotal, descuento) { 
    if (descuento === "WEB10") { return subtotal * 0.10; } 
    else if (descuento === "WEB20") { return subtotal * 0.20; } 
    else { return 0; } }

function calcularTotalconDescuento(subtotal, descuentoCalculado) { 
    return subtotal - descuentoCalculado; }

function calcularTotalConImpuesto(totalConDescuento) { 
    const impuesto = totalConDescuento * 0.08;
     return totalConDescuento + impuesto; }

export { calcularSubtotal, calcularDescuento, calcularTotalconDescuento, calcularTotalConImpuesto };