// Curtidas

function curtir(botao){

let span = botao.querySelector("span");

let numero = Number(span.innerHTML);

numero++;

span.innerHTML = numero;

}

// Pesquisa

const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("keyup",function(){

let texto = pesquisa.value.toLowerCase();

let cards = document.querySelectorAll(".card");

cards.forEach(card=>{

let titulo = card.querySelector("h2").innerHTML.toLowerCase();

if(titulo.indexOf(texto)>-1){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

// Tema escuro

const modo = document.getElementById("modo");

modo.onclick=function(){

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

modo.innerHTML="☀️ Modo Claro";

}else{

modo.innerHTML="🌙 Modo Escuro";

}

}

// Adicionar livro

function adicionarLivro(){

let titulo=document.getElementById("titulo").value;

let autor=document.getElementById("autor").value;

let descricao=document.getElementById("descricao").value;

if(titulo==""||autor==""||descricao==""){

alert("Preencha todos os campos!");

return;

}

let card=document.createElement("div");

card.className="card";

card.innerHTML=`

<h2>${titulo}</h2>

<h4>${autor}</h4>

<p>${descricao}</p>

<button onclick="curtir(this)">❤️ Curtir <span>0</span></button>

`;

document.getElementById("lista").appendChild(card);

document.getElementById("titulo").value="";

document.getElementById("autor").value="";

document.getElementById("descricao").value="";

alert("Livro adicionado com sucesso!");

}