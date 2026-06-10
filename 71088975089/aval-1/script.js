function darck(){
    document.body.classList.toggle("dark-mode");
}
function calcularArea(){
    let inputBase= document.getElementById("base");
    let inputAltura= document.getElementById("altura");
    let resultado= document.getElementById("resultado");

let base=Number(inputBase.value);
let altura =Number (inputAltura.value);
if(isNaN(base)||isNaN(altura)){
    resultado.innerText="digite valores válidos ";
    return
}
let area=base*altura; 
resultado.innerText="area do retamgulo é:"+area+"m²"

}