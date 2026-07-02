// Texto digitando

const frases=[

"Desenvolvedor Front-End",
"Criador de Sistemas",
"Apaixonado por Tecnologia",
"Bem-vindo ao meu Portfólio"

];

let frase=0;
let letra=0;

function escrever(){

document.getElementById("digitando").innerHTML=
frases[frase].substring(0,letra);

letra++;

if(letra<=frases[frase].length){

setTimeout(escrever,90);

}else{

setTimeout(apagar,1800);

}

}

function apagar(){

document.getElementById("digitando").innerHTML=
frases[frase].substring(0,letra);

letra--;

if(letra>=0){

setTimeout(apagar,50);

}else{

frase++;

if(frase>=frases.length){

frase=0;

}

escrever();

}

}

escrever();


// Botões

document.getElementById("btn1").onclick=()=>{

window.scrollTo({

top:700,

behavior:"smooth"

});

}

document.getElementById("btn2").onclick=()=>{

alert("Adicione aqui o link do seu GitHub.");

}


// Efeito nos cards

const cards=document.querySelectorAll(".card");

cards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const x=e.offsetX;
const y=e.offsetY;

card.style.background=
`radial-gradient(circle at ${x}px ${y}px,#38bdf8,#1e293b)`;

});

card.addEventListener("mouseleave",()=>{

card.style.background="#1e293bcc";

});

});