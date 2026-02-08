/*
*  archivo main.js
*  Creado por: Orlando Arboleda Molina
*
*  Descripción: 
*  Permite manipular los elementos de la pagina web y hacerla dinámica, 
*  para el curso de EDyA1 en la Universidad Autónoma de Occidente
*/

import {armarInformacion} from './funciones.js';

const btnEjecutar = document.getElementById("ejecutar");
const btnRecordar = document.getElementById("recordar");

btnEjecutar.addEventListener('click',ingresarPersona)
btnRecordar.addEventListener('click',desplegarTodos)

let info = ''

let tARespuesta = document.getElementById("laRespuesta");

function ingresarPersona(){
    let nombre = document.getElementById("elNombre").value;   
    let edad = parseInt(document.getElementById("laEdad").value);
    let peso = parseFloat(document.getElementById("elPeso").value);
    let residencia = document.getElementById("laResidencia").value;
    let res

    if (nombre.length==0 || isNaN(edad) || isNaN(peso)){
        res = 'El nombre, edad o peso, no fueron ingresados o tienen valores de entrada errados'

        document.getElementById("error").innerHTML = res;
        console.log(res);

    }else{
        document.getElementById("error").innerHTML = "";
        res = armarInformacion(nombre, edad, peso, residencia)
        info +=  res +'\n'; 
        tARespuesta.textContent = res   
    }

    
}

function desplegarTodos()
{
    tARespuesta.textContent = info;
}
