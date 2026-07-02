// Tema escuro

const tema = document.getElementById("tema");

tema.onclick = () => {

document.body.classList.toggle("dark");

tema.textContent =
document.body.classList.contains("dark") ? "☀️" : "🌙";

};

// Pesquisa

const busca = document.getElementById("buscar");

busca.addEventListener("keyup", () => {

const texto = busca.value.toLowerCase();

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

const titulo = card.querySelector("h2").textContent.toLowerCase();

card.style.display = titulo.includes(texto)
? "block"
: "none";

});

});

// Curtidas

const botoes = document.querySelectorAll(".curtir");

botoes.forEach(botao=>{

let curtido=false;

botao.onclick=()=>{

curtido=!curtido;

if(curtido){

botao.innerHTML="💚 Curtido";

botao.style.background="#16a085";

}else{

botao.innerHTML="❤️ Curtir";

botao.style.background="#27ae60";

}

}

});