import { calcularSubtotal,
    calcularDescuento,
    calcularTotalconDescuento,
    calcularTotalConImpuesto
} from "./funciones.js";

function calcularYGuardar() {
    document.getElementById("error").textContent = "";

    const nombre = document.getElementById("elNombre").value.trim();
    const peso = parseFloat(document.getElementById("peso").value);
    const distancia = parseFloat(document.getElementById("distancia").value);
    const descuento = document.getElementById("descuento").value.trim();

    if (!nombre) {
        document.getElementById("error").textContent = "Por favor ingrese un nombre";
        return;
    }
    if (!peso || peso <= 0) {
        document.getElementById("error").textContent = "Por favor ingrese un peso válido";
        return;
    }
    if (!distancia || distancia <= 0) {
        document.getElementById("error").textContent = "Por favor ingrese una distancia válida";
        return;
    }

    const subtotal = calcularSubtotal(peso, distancia);
    const descuentoCalculado = calcularDescuento(subtotal, descuento);
    const totalConDescuento = calcularTotalconDescuento(subtotal, descuentoCalculado);
    const totalConImpuesto = calcularTotalConImpuesto(totalConDescuento);
    const impuesto=  totalConImpuesto - totalConDescuento;

    const resultado = `${nombre} debe pagar $${totalConImpuesto.toFixed(2)} por el envío de ${peso}kg a ${distancia}km de $${subtotal.toFixed(2)} mas un impuesto de $${impuesto.toFixed(2)} ,con un descuento de $${descuentoCalculado.toFixed(2)}`;

    document.getElementById("laRespuesta").value = resultado;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("generar").addEventListener("click", calcularYGuardar);
});