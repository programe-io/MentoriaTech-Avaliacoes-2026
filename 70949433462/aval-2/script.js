// =========================
// PROJETO NISSAN GT-R
// Desenvolvido por
// Emerson de Souza
// Rafael Alves
// =========================

// LOADER

window.addEventListener("load", () => {

setTimeout(() => {

const loader = document.getElementById("loader");

if(loader){
loader.style.display = "none";
}

}, 2000);

});

// MENU MOBILE

function abrirMenu(){

const menu = document.getElementById("menu");

menu.classList.toggle("active");

}

// BOTÃO VOLTAR AO TOPO

const topo = document.getElementById("topo");

window.addEventListener("scroll", () => {

if(window.scrollY > 300){

topo.style.display = "block";

}else{

topo.style.display = "none";

}

});

function voltarTopo(){

window.scrollTo({
top:0,
behavior:"smooth"
});

}

// =========================
// FOR
// R34
// =========================

const dadosR34 = [

"Motor RB26DETT",
"280 CV",
"Tração Integral AWD",
"2.6 Litros",
"Biturbo",
"0-100 km/h em 4,9 segundos"

];

const listaR34 = document.getElementById("listaR34");

if(listaR34){

for(let i = 0; i < dadosR34.length; i++){

const li = document.createElement("li");

li.textContent = dadosR34[i];

listaR34.appendChild(li);

}

}

// =========================
// WHILE
// R35
// =========================

const dadosR35 = [

"Motor VR38DETT",
"570 CV",
"Tração Integral AWD",
"3.8 Litros",
"Biturbo",
"0-100 km/h em 2,7 segundos"

];

const listaR35 = document.getElementById("listaR35");

let contador = 0;

if(listaR35){

while(contador < dadosR35.length){

const li = document.createElement("li");

li.textContent = dadosR35[contador];

listaR35.appendChild(li);

contador++;

}

}

// =========================
// DO WHILE
// GALERIA
// =========================

const imagens = [

"https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200",

"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200",

"https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200",

"https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=1200",

"https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=1200",

"https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200"

];

const galeria = document.getElementById("galeriaContainer");

let indice = 0;

if(galeria){

do{

const img = document.createElement("img");

img.src = imagens[indice];

img.alt = "Nissan GT-R";

galeria.appendChild(img);

indice++;

}while(indice < imagens.length);

}

// =========================
// IF / ELSE
// QUIZ
// =========================

function escolher(modelo){

const resultado = document.getElementById("resultado");

if(modelo === "R34"){

resultado.innerHTML =
"Você escolheu o lendário Skyline GT-R R34, um verdadeiro ícone JDM.";

}else{

resultado.innerHTML =
"Você escolheu o moderno GT-R R35, tecnologia e potência extrema.";

}

}

// =========================
// SWITCH
// =========================

const favorito = "R34";

switch(favorito){

case "R34":

console.log("Modelo clássico selecionado.");

break;

case "R35":

console.log("Modelo moderno selecionado.");

break;

default:

console.log("Modelo não identificado.");

}

// =========================
// CONTADORES
// =========================

function animarNumero(id, final){

let atual = 0;

const elemento = document.getElementById(id);

if(!elemento) return;

const intervalo = setInterval(() => {

atual += Math.ceil(final / 100);

if(atual >= final){

atual = final;

clearInterval(intervalo);

}

elemento.textContent = atual;

},20);

}

animarNumero("potencia",570);
animarNumero("velocidade",315);
animarNumero("torque",637);

// =========================
// MODO ESCURO
// =========================

const tema = document.createElement("button");

tema.innerHTML = "🌙";

tema.style.position = "fixed";
tema.style.left = "20px";
tema.style.bottom = "20px";
tema.style.width = "60px";
tema.style.height = "60px";
tema.style.borderRadius = "50%";
tema.style.border = "none";
tema.style.cursor = "pointer";
tema.style.fontSize = "22px";
tema.style.zIndex = "9999";
tema.style.background = "#00ffff";

document.body.appendChild(tema);

tema.addEventListener("click", () => {

document.body.classList.toggle("dark");

});

// =========================
// ANIMAÇÃO AO ROLAR
// =========================

const elementos = document.querySelectorAll(
".card,.contador-card,.box,.quiz-box,article,aside"
);

function revelar(){

elementos.forEach((item)=>{

const topoElemento =
item.getBoundingClientRect().top;

if(topoElemento < window.innerHeight - 100){

item.style.opacity = "1";
item.style.transform = "translateY(0)";

}

});

}

elementos.forEach((item)=>{

item.style.opacity = "0";
item.style.transform = "translateY(50px)";
item.style.transition = "1s";

});

window.addEventListener("scroll", revelar);

revelar();

// =========================
// RELÓGIO DIGITAL
// =========================

const relogio = document.createElement("div");

relogio.style.position = "fixed";
relogio.style.top = "90px";
relogio.style.right = "20px";
relogio.style.padding = "10px 20px";
relogio.style.background = "#000";
relogio.style.color = "#00ffff";
relogio.style.borderRadius = "10px";
relogio.style.fontWeight = "bold";
relogio.style.zIndex = "999";

document.body.appendChild(relogio);

setInterval(() => {

const agora = new Date();

relogio.innerHTML =
agora.toLocaleTimeString("pt-BR");

},1000);

// =========================
// MENSAGEM FINAL
// =========================

console.log(
"Projeto Nissan Skyline GT-R carregado com sucesso. Desenvolvido por Emerson de Souza e Rafael Alves."
);