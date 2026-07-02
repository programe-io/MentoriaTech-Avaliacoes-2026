const botao = document.getElementById("explorar");

botao.addEventListener("click",()=>{

window.scrollTo({

top:700,

behavior:"smooth"

});

});

let numero=0;

const contador=document.getElementById("contador");

setInterval(()=>{

numero++;

contador.innerHTML=numero.toLocaleString();

},40);

const cards=document.querySelectorAll(".card");

cards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.boxShadow="0 0 30px cyan";

});

card.addEventListener("mouseleave",()=>{

card.style.boxShadow="none";

});

});

const menu=document.querySelector(".menu-mobile");

const nav=document.querySelector("nav");

menu.addEventListener("click",()=>{

if(nav.style.display=="flex"){

nav.style.display="none";

}else{

nav.style.display="flex";
nav.style.flexDirection="column";
nav.style.position="absolute";
nav.style.top="80px";
nav.style.right="20px";
nav.style.background="#1b1e28";
nav.style.padding="20px";
nav.style.borderRadius="10px";

}

});