const botao = document.getElementById("botao");

const texto = document.getElementById("texto");

const fatos = [

"Draco pertence à tradicional família Malfoy.",

"Seu patrono nunca foi revelado oficialmente.",

"Ele estudou em Hogwarts entre 1991 e 1998.",

"Tom Felton interpretou Draco nos oito filmes.",

"Apesar da rivalidade, Draco não era totalmente mau.",

"Seu uniforme verde representa a Sonserina."

];

botao.addEventListener("click",()=>{

let numero = Math.floor(Math.random()*fatos.length);

texto.innerHTML = fatos[numero];

});