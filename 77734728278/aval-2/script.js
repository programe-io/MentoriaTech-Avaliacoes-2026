// Botão de modo escuro

const botaoTema = document.createElement("button");
botaoTema.innerHTML = "🌙 Modo Escuro";

document.querySelector("header").appendChild(botaoTema);

botaoTema.addEventListener("click", function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        botaoTema.innerHTML = "☀️ Modo Claro";
    }else{
        botaoTema.innerHTML = "🌙 Modo Escuro";
    }

});

// Curtidas para cada artigo

const artigos = document.querySelectorAll("article");

artigos.forEach(function(artigo){

    let curtidas = 0;

    const botao = document.createElement("button");
    botao.innerHTML = "❤️ Curtir";

    const texto = document.createElement("p");
    texto.innerHTML = "Curtidas: 0";

    artigo.appendChild(botao);
    artigo.appendChild(texto);

    botao.addEventListener("click", function(){

        curtidas++;
        texto.innerHTML = "Curtidas: " + curtidas;

    });

});

// Mensagem de boas-vindas

window.onload = function(){

    alert("Bem-vindo ao Blog da Copa do Mundo! 🏆⚽");

};