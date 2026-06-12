function dark(){
    document.body.classList.toggle("dark-mode");

}
function calcularArea(){
    let inputBase = document.getElementById("base");
    let inputAltura = document.getElementById("altura");
    let resultado = document.getElementById("resultado");
    let base = Number(inputBase.value);
    let altura = Number(inputBase.value);
    if (isNaN(base) || isNaN(altura)){
        resultado.innerText = "Digite valor válidos";
        return;
 
    }
    let area = base*altura;
    resultado.innerText = "A área do retângulo é:"+area+"m²";
    // inputBase.value = "";
    // inputBase.value = "";
}