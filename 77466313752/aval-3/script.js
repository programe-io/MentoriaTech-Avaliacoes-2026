// Cria botão de modo escuro

const botaoTema = document.createElement("button");
botaoTema.innerHTML = "🌙 Modo Escuro";

document.querySelector("header").appendChild(botaoTema);

// Alternar tema

botaoTema.addEventListener("click", function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        botaoTema.innerHTML = "☀️ Modo Claro";
    }else{
        botaoTema.innerHTML = "🌙 Modo Escuro";
    }

});

// Curtidas

const artigo = document.querySelector("article");

const btnCurtir = document.createElement("button");
btnCurtir.innerHTML = "❤️ Curtir";

const contador = document.createElement("p");
contador.innerHTML = "Curtidas: 0";

artigo.appendChild(document.createElement("br"));
artigo.appendChild(btnCurtir);
artigo.appendChild(contador);

let curtidas = 0;

btnCurtir.addEventListener("click", function(){

    curtidas++;

    contador.innerHTML = "Curtidas: " + curtidas;

});