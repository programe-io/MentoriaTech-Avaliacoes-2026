// Tema escuro

const tema = document.getElementById("tema");

tema.onclick = function(){

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

tema.innerHTML="☀️";

}else{

tema.innerHTML="🌙";

}

}

// Pesquisa

const pesquisa = document.getElementById("pesquisa");

const cards = document.querySelectorAll(".card");

pesquisa.addEventListener("keyup",()=>{

let texto = pesquisa.value.toLowerCase();

cards.forEach(card=>{

if(card.innerText.toLowerCase().includes(texto)){

card.style.display="block";

}else{

card.style.display="none";

}

})

})

// Favoritos

const favoritos=document.querySelectorAll(".favorito");

favoritos.forEach(botao=>{

let ativo=false;

botao.onclick=function(){

ativo=!ativo;

if(ativo){

botao.innerHTML="❤️ Favoritado";

botao.style.background="#dc3545";

}else{

botao.innerHTML="🤍 Favoritar";

botao.style.background="#0d6efd";

}

}

});