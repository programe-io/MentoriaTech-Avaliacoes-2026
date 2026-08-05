/*==========================
    LOADER
==========================*/

window.addEventListener("load",()=>{

const loader=document.querySelector(".loader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

},1000);

}

});

/*==========================
    MENU
==========================*/

const nav=document.querySelector("nav");

window.addEventListener("scroll",()=>{

if(window.scrollY>100){

nav.classList.add("ativo");

}else{

nav.classList.remove("ativo");

}

});


/*==========================
      BOTÃO TOPO
==========================*/

const topo=document.createElement("button");

topo.innerHTML="⬆";

topo.className="topo";

document.body.appendChild(topo);

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topo.style.opacity="1";
topo.style.pointerEvents="all";

}else{

topo.style.opacity="0";
topo.style.pointerEvents="none";

}

});

topo.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

/*==========================
      TYPING EFFECT
==========================*/

const texto=document.querySelector(".typing");

if(texto){

const frase="Príncipe Daeron Targaryen";

let i=0;

function escrever(){

if(i<frase.length){

texto.innerHTML+=frase.charAt(i);

i++;

setTimeout(escrever,90);

}

}

escrever();

}

/*==========================
   ANIMAÇÃO DAS SEÇÕES
==========================*/

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("mostrar");

}

});

},

{

threshold:.2

}

);

document.querySelectorAll("section,.card,.evento,.titulo").forEach(el=>{

observer.observe(el);

});

/*==========================
      BARRAS
==========================*/

const barras=document.querySelectorAll(".valor");

window.addEventListener("scroll",()=>{

barras.forEach(bar=>{

const pos=bar.getBoundingClientRect().top;

if(pos<window.innerHeight-80){

bar.style.width=bar.dataset.width;

}

});

});

/*==========================
       CONTADORES
==========================*/

const numeros=document.querySelectorAll(".numero");

function contador(){

numeros.forEach(numero=>{

const alvo=+numero.dataset.numero;

let atual=0;

const tempo=20;

const aumento=alvo/100;

const atualizar=()=>{

atual+=aumento;

if(atual<alvo){

numero.innerHTML=Math.floor(atual);

setTimeout(atualizar,tempo);

}else{

numero.innerHTML=alvo;

}

}

atualizar();

});

}

const contadorObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

contador();

contadorObserver.disconnect();

}

});

});

const area=document.querySelector(".contador");

if(area){

contadorObserver.observe(area);

}

/*==========================
      PARALLAX
==========================*/

const hero=document.querySelector(".hero");

window.addEventListener("mousemove",(e)=>{

const x=(window.innerWidth/2-e.pageX)/60;

const y=(window.innerHeight/2-e.pageY)/60;

hero.style.transform=`translate(${x}px,${y}px)`;

});

/*==========================
      MODO ESCURO
==========================*/

const btn=document.querySelector(".modo");

if(btn){

btn.onclick=()=>{

document.body.classList.toggle("light");

localStorage.setItem("tema",

document.body.classList.contains("light")

?"light":"dark"

);

}

}

if(localStorage.getItem("tema")=="light"){

document.body.classList.add("light");

}

/*==========================
      PARTICULAS
==========================*/

for(let i=0;i<40;i++){

const p=document.createElement("span");

p.className="particula";

document.body.appendChild(p);

p.style.left=Math.random()*100+"vw";

p.style.animationDuration=(5+Math.random()*10)+"s";

p.style.animationDelay=Math.random()*5+"s";

p.style.opacity=Math.random();

p.style.width=4+Math.random()*6+"px";

p.style.height=p.style.width;

}

/*==========================
      CURSOR GLOW
==========================*/

const glow=document.createElement("div");

glow.className="cursorGlow";

document.body.appendChild(glow);

window.addEventListener("mousemove",(e)=>{

glow.style.left=e.clientX+"px";

glow.style.top=e.clientY+"px";

});

/*==========================
      REVELAR IMAGEM
==========================*/

const imagem=document.querySelector(".daeron");

window.addEventListener("scroll",()=>{

if(imagem){

const pos=imagem.getBoundingClientRect().top;

if(pos<window.innerHeight-100){

imagem.style.opacity="1";

imagem.style.transform="translateY(0px) scale(1)";

}

}

});

/*==========================
      EFEITO CARD
==========================*/

document.querySelectorAll(".card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const x=e.offsetX;

const y=e.offsetY;

card.style.background=

`radial-gradient(circle at ${x}px ${y}px,

rgba(0,255,150,.18),

rgba(16,30,20,.95))`;

});

card.addEventListener("mouseleave",()=>{

card.style.background="rgba(17,35,24,.65)";

});

});

/*==========================
      SOM AO BOTÃO
==========================*/

const botoes=document.querySelectorAll("button");

botoes.forEach(botao=>{

botao.addEventListener("click",()=>{

botao.animate([

{

transform:"scale(1)"

},

{

transform:"scale(.92)"

},

{

transform:"scale(1)"

}

],{

duration:300

});

});

});

/*==========================
      RELÓGIO
==========================*/

function atualizarHora(){

const hora=document.querySelector(".hora");

if(hora){

const data=new Date();

hora.innerHTML=data.toLocaleTimeString("pt-BR");

}

}

setInterval(atualizarHora,1000);

/*==========================
      TEXTO BRILHANDO
==========================*/

setInterval(()=>{

document.querySelectorAll("h1,h2").forEach(t=>{

t.classList.toggle("brilho");

});

},2500);