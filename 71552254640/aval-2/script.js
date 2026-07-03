const curiosidades = [

"A maior parte da água da Terra está nos oceanos.",

"A água salgada possui aproximadamente 35 gramas de sal por litro.",

"Os oceanos produzem cerca de metade do oxigênio do planeta.",

"Existem mais de 230 mil espécies conhecidas vivendo nos oceanos.",

"Os oceanos absorvem grande parte do dióxido de carbono da atmosfera."

];

function mostrarCuriosidade(){

let numero = Math.floor(Math.random() * curiosidades.length);

document.getElementById("textoCuriosidade").innerHTML = curiosidades[numero];

}