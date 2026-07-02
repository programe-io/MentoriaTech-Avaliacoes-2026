// Mensagem ao carregar o site

window.onload = function(){

    alert("Bem-vindo ao Blog Tech!");

}

// Botões

const botoes = document.querySelectorAll(".btn");

botoes.forEach(botao=>{

    botao.addEventListener("click",()=>{

        botao.innerHTML="✔ Lido";

        botao.style.background="green";

    });

});

// Animação ao passar o mouse no título

const titulo = document.querySelector("h1");

titulo.addEventListener("mouseover",()=>{

    titulo.style.transform="scale(1.1)";
    titulo.style.transition="0.5s";

});

titulo.addEventListener("mouseout",()=>{

    titulo.style.transform="scale(1)";

});

// Mudança de cor do rodapé ao clicar

const rodape = document.querySelector("footer");

rodape.addEventListener("click",()=>{

    rodape.style.background="#111";

});