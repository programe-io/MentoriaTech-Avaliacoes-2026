// Mostrar ou esconder texto
function mostrar(indice){

const textos = document.querySelectorAll(".extra");

if(textos[indice].style.display === "block"){

textos[indice].style.display = "none";

}else{

textos[indice].style.display = "block";

}

}

// Modo escuro
const botao = document.getElementById("modo");

botao.addEventListener("click", ()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

botao.innerHTML = "☀️";

}else{

botao.innerHTML = "🌙";

}

});