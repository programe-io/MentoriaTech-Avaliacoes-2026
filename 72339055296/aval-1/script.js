/*function dark(){
    document.body.classList.toggle("dark-mold");
}*/

function calcularArea(){
    let inputBase = document.getElementById("base");
    let inputAltura = document.getElementById("altura");
    let resultado = document.getElementById("resultado");

    let base = Number(inputBase.value);
    let altura = Number(inputAltura.value);

    if (isNaN(base) || isNaN(altura)){
        resultado.innerText = "Digite valores válidos";
        return;
    }

    let area = base * altura;

    resultado.innerText = "A área do retâgulo é:"+area+"m²";

}